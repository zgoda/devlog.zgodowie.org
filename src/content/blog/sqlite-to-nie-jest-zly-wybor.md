---
title: SQLite to nie jest zły wybór
pubDate: 2020-07-02T00:10:00
tags:
    - python
    - programowanie
    - sqlite
    - orm
author: Jarek
description: Mała baza, a całkiem dobrze sobie radzi w niektórych przypadkach. Mowa oczywiście o SQLite.
imageUrl: https://i.imgur.com/HPG4qlBh.jpg
---

Powszechnie uważa się, że SQLite to jest baza która nie nadaje się do użycia w aplikacji webowej, w każdym razie nie na etapie produkcji. Rzeczywiście, w wielu przypadkach (większości?) się nie sprawdzi z powodu ograniczeń jakie narzuca w kontekście współbieżnego dostępu, ale są pewne warunki, w których to nie ma żadnego znaczenia i wtedy SQLite sprawdza się doskonale.

![Zielone winko](https://i.imgur.com/HPG4qlBh.jpg)

W skrócie chodzi o to, że jako silnik _wbudowany_ nie jest ona przystosowana do używania w trybie współdzielonym, a przynajmniej nie w pełni. Chodzi o to, że nie ma żadnego sposobu, by bezpiecznie przeprowadzić jednoczesny zapis przez więcej niż jeden proces/wątek. Wydawałoby się, że to dyskwalifikuje z wykorzystania jako zaplecza w aplikacji webowej, ale czy na pewno? Czy na pewno nie ma takich aplikacji, w których dokonywany jest niemal wyłącznie odczyt, a zapis jest albo serializowany, albo w ogóle jest tylko jeden proces który coś zapisuje?

Nie ma?

Ależ oczywiście że są. I wcale nie są jakąś rzadkością. Po prostu większość wzrusza na nie ramionami.

Weźmy na przykład taki blog osobisty. Jest jeden edytor, który dokonuje zmian w zawartości bazy danych, wszyscy pozostali użytkownicy mają dostęp tylko do odczytu. Współbieżny odczyt nie stanowi problemu, a przy niewielkiej modyfikacji parametrów połączenia również współbieżny odczyt przez wiele procesów/wątków i zapis przez jeden proces/wątek (domyślnie zapis blokuje całą tabelę na wyłączność). Czy są jeszcze jakieś inne przypadki? Pewnie są, trzeba się tylko rozejrzeć.

Tym, co z zapyziałej _bazy trybu developerskiego_ zrobi produkcyjne zaplecze aplikacji webowej są polecenia `PRAGMA`. Kompletny opis wszystkich poleceń `PRAGMA` znajduje się [na stronie dokumentacji SQLite](https://www.sqlite.org/pragma.html), ja zaś skupię się na tych kilku interesujących w kontekście aplikacji webowej.

-   `journal_mode = WAL` - to polecenie włącza tryb _write-ahead log_ dziennika zapisu, który pozwala na jednoczesny odczyt i zapis bez blokowania na wyłączność;
-   `foreign_keys = 1` - to polecenie włącza obsługę kluczy obcych;
-   `ignore_check_constraints = 0` - to polecenie wyłącza ignorowanie ograniczeń `CHECK` w definicji kolumn, od niedawna jest to ustawienie domyślne;
-   `cache_size = -64000` - to polecenie ustawia rozmiar pamięci podręcznej stron, jest ono podawane w formacie `-1 * rozmiar w KiB`, przykładowa wartość oznacza 64 MiB pamięci podręcznej (wartość dodatnia oznacza ilość stron do przechowywania w pamięci, nie ich rozmiar);
-   `synchronous = 0` - tutaj rekomendacja jest co najmniej kontrowersyjna, opcja ta daje znaczne przyspieszenie operacji zapisu za cenę zmniejszonej odporności na uszkodzenia samej bazy w przypadku utraty zasilania, ale warto ją rozważyć w niektórych przypadkach;

Z tymi ustawieniami SQLite jest wyjątkowo wydajne, ma wyższy stopień zgodności ze standardem SQL (co ułatwia życie w przypadku używania ORM) - oraz może być jednocześnie używane w trybie zapisu i odczytu.

### Wsparcie w ORM

Najlepiej wygląda to w Peewee - jest to [dokładnie omówione](http://docs.peewee-orm.com/en/latest/peewee/database.html#recommended-settings), wraz z opisem zalecanych opcji. Autor Peewee [w wielu artykułach na swoim blogu](https://charlesleifer.com/blog/tags/sqlite/) opisuje różne zagadnienia związane ze SQLite, w tym również _funkcje, o których się głośno nie mówi_ i widać że się tym dość mocno interesuje. Spoglądając na inicjalizator obiektu bazy danych widać, że wsparcie dla pragm jest pierwszorzędne - podaje się je jako słownik.

```python
db = SqliteDatabase(
    'my_app.db',
    pragmas={
        'journal_mode': 'wal',
        'cache_size': -1 * 64000,  # 64MB
        'foreign_keys': 1,
        'ignore_check_constraints': 0,
        'synchronous': 0
    }
)
```

W Pony zastosowano rozwiązanie _close to the metal_. Ponieważ faktycznie pragmy podaje się przy każdym otwieraniu bazy danych SQLite jako zwykłe polecenia (tak jak SQL), to tak też je trzeba do bazy przesłać wpinając się w momencie gdy połączenie zostanie otwarte i to właśnie przedstawia [przykład w dokumentacji](https://docs.ponyorm.org/api_reference.html?highlight=pragma#Database.on_connect).

```python
db = Database()

# entities declaration

@db.on_connect(provider='sqlite')
def sqlite_pragmas(db, connection):
    cursor = connection.cursor()
    cursor.execute('PRAGMA journal_mode = WAL')
    cursor.execute('PRAGMA ignore_check_constraints = 0')
    cursor.execute('PRAGMA cache_size = -64000')

db.bind(**options)
db.generate_mapping(create_tables=True)
```

Powyższy przykład pomija ustawienie pragmy `foreign_keys` ponieważ od dłuższego czasu jest ona ustawiana automatycznie przez Pony.

W podobny sposób można to wykonać [w SQLAlchemy](https://docs.sqlalchemy.org/en/13/core/events.html#sqlalchemy.events.ConnectionEvents.engine_connect), tutaj używając zdarzenia `engine_connect`.

```python
from sqlalchemy import event

@event.listens_for(MyEngine, 'engine_connect')
def engine_connected(conn, branch):
    conn.execute('PRAGMA journal_mode = WAL')
    conn.execute('PRAGMA foreign_keys = 1')
    conn.execute('PRAGMA ignore_check_constraints = 0')
    conn.execute('PRAGMA cache_size = -64000')
```

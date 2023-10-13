---
title: Peewee, dodanie unikalnej kolumny
author: Jarek
pubDate: 2021-02-18T22:19:00
tags:
    - python
    - peewee
    - sqlite
description: Modyfikacja istniejącej struktury jest szczególnie trudna wtedy, gdy trzeba dodać kolumnę, która podlega ograniczeniom. Czsem trzeba naprawdę dużo kombinować.
---

Potrzebowałem dodać do jednej tabelki kolumnę, która byłaby nie dość że niepusta, to jeszcze unikalna. Piorunująca mieszanka, szczególnie gdy obiektem operacji jest SQLite, którego zasób DDL jest bardziej niż skromny. No ale od czego _kiepełe_.

![Wiśniaczek na rumie, a co!](https://i.imgur.com/LHaFk4Dh.jpg)

PeeWee ORM dostarcza [takiego narzędzia małego](http://docs.peewee-orm.com/en/latest/peewee/playhouse.html#migrate), które upraszcza nieco pisanie _migracji_ struktur bazy. Nie jest to taki wypas jak [Alembic](https://alembic.sqlalchemy.org/) do SQLAlchemy, ale parę rzeczy ułatwia. Do funkcji `migrate()` przekazuje się obiekty symbolizujące operacje do wykonania - dodanie kolumny czy inne zmiany struktury. W szczególnym przypadku dodawania kolumny tworzy się instancję reprezentującą tę kolumnę ze wszystkimi docelowymi atrybutami i przekazuje ją do metody `add_column()`.

Tu niestety okazuje się, że jest pewna drobna bolączka. Argument `default` nawet przekazany w postaci obiektu wykonywalnego, nie jest uruchamiany dla każdego istniejącego wiersza, a tylko raz - dla całej tabeli. Co psuje cały zamysł dodania unikalnej kolumny, bo wszystkie wiersze dostaną tę samą wartość. I co teraz?

### SQL to the rescue

Czyli trzeba będzie to zrobić tak, najpierw dodać _zwykłą_ niepustą kolumnę ze statyczną wartoscią domyślną, potem przeiterować po wszystkich wierszach i zapisać tam wartości unikalne z generatora, a potem dodać ograniczenie na unikalność. Wróć, w SQLite nie da się dodać ograniczenia unikalności dla kolumny, ale _wewnętrznie_ to wygląda tak, jakby tam był unikalny indeks, więc trzeba na tym polu założyć unikalny indeks. Mało prawdopodobne, żeby kiedyś ktoś po tym polu czegoś szukał (jest surogatowy klucz główny), no ale jak nie da się inaczej...

```python
migrator = SqliteMigrator(db)

def add_quip_permalink():
    field = CharField(max_length=20, default='permalink')
    migrate(
        migrator.add_column('quip', 'permalink', field)
    )
    cursor = db.execute_sql('select pk from quip')
    for row in cursor:
        pk = row[0]
        permalink = gen_permalink()
        db.execute_sql(
            'update quip set permalink = ? where pk = ?', params=(permalink, pk)
        )
    migrate(
        migrator.add_index('quip', ['permalink'], unique=True)
    )
```

Jest głupie? Jest. Działa? Działa. Czyli nie jest takie do końca głupie.

[Zgłosiłem to jako błąd](https://github.com/coleifer/peewee/issues/2351), ale patrząc na kod to nie będzie to wcale proste do poprawienia. Zasadniczo trzeba by było zrobić dokładnie to samo, co ja zrobiłem powyżej.

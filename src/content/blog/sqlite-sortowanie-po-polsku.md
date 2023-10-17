---
title: Sortowanie w SQLite po polsku, Pytąg Edycjon
author: Jarek
pubDate: 2020-10-19T21:25:00
tags:
    - python
    - sqlite
    - polski
description: Większe bazy mają lepiej, ale ta mała wymaga specjalnego traktowania by "ą" posortowało się przed "b"
imageUrl: https://i.imgur.com/ZapY7cDh.jpg
---

O tym że język polski daje nam Polakom w kość wie każdy, kto spróbował skończyć szkołę podstawową. Niestety, potem, w dorosłym życiu zbieramy baty, o których się lingwistom nie śniło. A wszystko przez te nasze krzaczki.

![Burn, baby, burn](https://i.imgur.com/ZapY7cDh.jpg)

Jedną z najpopularniejszych obecnie używanych baz danych jest [SQLite](https://www.sqlite.org/). Właściwie używają jej wszyscy, na desktopach, tabletach i telefonach. Możnaby to uznać za wiekopomny triumf SQL, gdyby nie to, że tak naprawdę _w domyślnej konfiguracji_ użyteczność tej bazy w przypadku języków innych niż angielski jest bardzo dyskusyjna.

Chodzi o sortowanie danych znakowych.

```console
sqlite> PRAGMA collation_list;
0|RTRIM
1|NOCASE
2|BINARY
sqlite>
```

Lol, wut?

Ano tak, domyślnie SQLite dostarcza tylko 3 porządków sortowania: usuwający białe znaki z prawej strony tekstu, usuwający rozróżnianie wielkości znaków (jednak jakby nie do końca, ale o tem potem) i wreszcie `BINARY`, który oznacza po prostu że znaki są sortowane wg ich kodu numerycznego w tabeli Unicode, co oznacza że `b` jest przed `ą`, bo ma niższy numerek. Jest to zaszłość z zamierzchłych czasów, gdy wszystkich numerków było 255 i w tych górnych 127 musiało się zmieścić wszystko, greckie, hebrajskie, polskie, czeskie, norweskie czy tam inne. W tamtych zamierzchłych czasach nie było właściwie wiadomo jakiemu znakowi odpowiada jakiś numerek, bo to się zmieniało w zależności od języka.

I tu się pojawia przypadek `NOCASE`, który ujednolica wielkość znaków... ale tylko dla tego dolnego zakresu 127 znaków ASCII, bo tylko tam na 100% wiadomo jaka mała literka odpowiada numerkowi znaku.

Dziś mamy 2020, Unicode na prawo i na lewo, ale w SQLite te wszystkie zamierzchłe czasy żyją i mają się dobrze. W efekcie nic w języku innym niż angielski nie sortuje się dobrze. Oczywiście, chodzi o domyślną dystrybucję SQLite. Na Androidzie obeszli to tak, że dla każdego języka instalują porządek sortowania zgodny z ustawieniami lokalizacji, jakie użytkownik ma ustawione na telefonie. A co my pytągowe rzuczki możemy z tym zrobić?

Możemy zrobić dokładnie to samo, ustawić lokalizację aplikacji i zainstalować porządek sortowania zgodny z ustawieniami lokalnymi. Tylko że ustawianie lokalizacji aplikacji nie zawsze jest takim całkiem dobrym pomysłem (żre masę zasobów na literalnie nic), a już całkowicie złym w kodzie bibliotecznym, ponieważ zmiana ustawień lokalnych **jest operacją globalną dla procesu** i zmienia naprawdę dużo rzeczy, od nazw miesięcy po separator tysięcy. Bum szaka laka.

Co teraz, co teraz?!

A teraz to trzeba się rozejrzeć za metodą _lokalizowanego_ sortowania danych tekstowych, która jest niezależna od bieżących ustawień lokalnych. Co zasadniczo w Pythonie dostarcza jedynie biblioteka [PyICU](https://pypi.org/project/PyICU/). ICU, czyli _International Components for Unicode_ to jedna z głównych bibliotek systemowych dostarczających obsługi i18n i l10n, w tym również parametryzowanych obiektów dostarczających metod porównywania ciągów znaków i określania który z nich jest _mniejszy_ (czyli ma zostać posortowany wcześniej).

Teraz już wiemy _co_, ale pozostaje jeszcze kwestia **jak**. I wbrew pozorom tu się zaczynają największe schody, o ile nie używa się *łysego* SQLite, tylko jakiegoś ORM.

W [Pony](https://ponyorm.org/) **w ogóle się nie da**. Nie ma sposobu, żeby a) przekazać ekstra parametr w definicji pola lub b) przekazać ekstra `COLLATE` w parametrach zapytania (inaczej niż w _żywym SQL_, ale chyba nie po to się używa ORM). Tak że na potrzeby języka polskiego w użyciu ze SQLite Pony ORM można zasadniczo skreślić, a stan projektu nie wygląda, żeby kiedykolwiek mieli to zaimplementować.

W SQLAlchemy da się zrobić i [jedno](https://docs.sqlalchemy.org/en/13/core/type_basics.html#sqlalchemy.types.String.params.collation), i [drugie](https://docs.sqlalchemy.org/en/13/core/sqlelement.html#sqlalchemy.sql.expression.collate). To co pozostaje problematyczne to instalacja porządku sortowania, którą wykonuje się przy użyciu funkcji `create_collation()`, dostarczanej przez oryginalny sterownik obsługi bazy DBAPI-2.0, przed dostępem do którego SQLAlchemy dość skutecznie nas chroni, ale przecież dla chcącego nic trudnego. Da się i to najważniejsze.

W [Peewee](http://docs.peewee-orm.com/) jest w ogóle luksusowo. Obiekt reprezentujący bazę danych SQLite dostarcza [dekorator](http://docs.peewee-orm.com/en/latest/peewee/api.html#SqliteDatabase.collation) do zarejestrowania funkcji jako porządku sortowania. Mało tego, ta funkcja po zarejestrowaniu ma atrybut metody, która dodaje odpowiednią deklarację porządku sortowania do zapytań. A [definicja pola](http://docs.peewee-orm.com/en/latest/peewee/models.html?highlight=collation#field-initialization-arguments) przyjmuje argument `collation`, który specyfikuje porządek sortowania po stronie bazy (zapewne jest to ignorowane dla pól innych niż tekstowe). Tak że jak sobota to do Lidla, ale jak SQLite to Peewee.

I wtedy wjeżdża ICU całe na biało.

```python
import icu

collator = icu.Collator.createInstance(icu.Locale('pl_PL.utf-8'))

db = peewee.SqliteDatabase(None)


@db.collation('PL')
def collate_pl(s1, s2):
    return collator.compare(s1, s2)
```

Później w definicji pola w modelu wystarczy podać `collation='PL'` i już, będzie działało, dane w tym polu zostaną posortowane po polsku, np

```python
class User(Model):
    email = CharField(max_length=200, primary_key=True)
    name = CharField(max_length=100, null=True, collation='PL')
    password = TextField()
    is_active = BooleanField(default=True)
    reg_date = DateTimeField(default=datetime.utcnow, index=True)
```

Mała uwaga, trzeba to zrobić **przed** utworzeniem pola w tabeli. Jeżeli tabela już istnieje, to gdy nie można jej sobie zdropować i utworzyć na nowo, pozostaje używanie tej metody `collation()`, tak jak to widać [w przykładzie](http://docs.peewee-orm.com/en/latest/peewee/api.html#SqliteDatabase.collation).

Ha!

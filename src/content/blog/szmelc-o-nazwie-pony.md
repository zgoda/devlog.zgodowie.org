---
title: Szmelc o nazwie Pony
pubDate: 2019-12-29
tags:
    - python
    - rant
author: Jarek
description: 'Jak się okazuje może się wysypać wszystko i na bardzo wiele sposobów.'
imageUrl: https://i.imgur.com/nOuH9Wyh.jpg
---

Czasem do różnych małych projektów w Pythonie typu demo czy w ogóle do nauki potrzebuję małego ORM, który jest stosunkowo prosty do ustawienia i nie wchodzi zbytnio w drogę. To znaczy nie wymaga pisania setek linii kodu tylko po to, żeby połączyć się do bazy. Jak zobaczyłem [Pony](https://ponyorm.org/) to mi się oczy zaświeciły, bo to mogło być właśnie to.

Po czym zaraz przygasły. Kolejny szmelc.

![Nu, zajec](https://i.imgur.com/nOuH9Wyh.jpg)

Co czyni Pony unikalnym jest język zapytań - pisze się je używając lambd i generatorów, przez co wygląda on bardzo czytelnie i już na pierwszy rzut oka widać co ten kod robi. Zainicjowanie biblioteki również jest proste, trzeba utworzyć obiekt swego rodzaju proxy, zainicjować połączenie z silnikiem bazy danych i w końcu podłączyć zadeklarowane encje do tabel w bazie danych - i to już. Operacje wykonuje się w sesji, która jednocześnie jest transakcją, wszystko ładnie-pięknie, niestety, tylko wtedy gdy działa.

A zdecydowanie za szybko przestaje działać. I wtedy niestety okazuje się, że znikąd pomocy, a zgłoszone błędy są po prostu ignorowane. Mało kto tego używa, więc przepływ wiedzy jest właściwie żaden. Dokumentacja opisuje tylko _szczęśliwe zakończenia_, a zupełnie pomija przypadki tragiczne. Zdecydowanie również nie pomaga mocno dynamiczny charakter kodu samego Pony - podpowiedzi i pomoc dotycząca obiektów zasadniczo nie istnieją. Trudno powiedzieć jak coś działa i co się może wysypać. A jak się okazuje może się wysypać wszystko i na bardzo wiele sposobów.

Po znalezieniu szukanego obiektu jego [obiekty powiązane kluczem obcym są zwracane w losowej kolejności](https://stackoverflow.com/q/59127205/12138). Dlaczego? Czy można coś z tym zrobić?

W przypadku naruszenia reguł integralności kod [podnosi jeden z kilku wyjątków](https://stackoverflow.com/q/59270459/12138), nie wiadomo który kiedy. Dlaczego? Czy można coś z tym zrobić?

Po zintegrowaniu z ramówką Flask czasem generyczny nieobsłużony błąd w kodzie aplikacji skutkuje tym, że [podnoszona jest asercja i aplikację trzeba uruchomić ponownie](https://github.com/ponyorm/pony/issues/481). Dlaczego? Czy można coś z tym zrobić?

Ta wspaniale czytelna składnia zapytań w zależności od sposobu jej wykorzystania [daje różne wyniki](https://github.com/ponyorm/pony/issues/199). Dlaczego? Czy można coś z tym zrobić?

I tak to się kręci, a najstarsze otwarte zgłoszenia w repozytorium Pony na Githubie pochodzą z 2013 roku, to jest ponad 6 lat (w momencie pisania tego artykułu). To naprawdę bardzo długi okres. Dlatego z żalem muszę niestety zrezygnować z używania Pony, a żal tym większy, że składnia jest naprawdę bardzo fajna i przyjemnie się tej biblioteki używa. Najgorsze jest to, że podobnych bibliotek nie ma wiele, jest mega dokładne i poprawne SQLAlchemy, które jednak wymaga sporo _boilerplate_ (z racji istnienia rozszerzenia [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/) to najczęściej pierwszy wybór gdy aplikacja korzysta z Flaska, ale nie zawsze jest to wybór najlepszy, o czym zapewne wkrótce też napiszę), jest SQLObject, którego składnia mnie odpycha, no i jest [Peewee](http://docs.peewee-orm.com/) które ma [toksycznego właściciela](http://publ.beesbuzz.biz/blog/1080-Goodbye-peewee-hello-PonyORM) oraz składnię do której pierwszym moim skojarzeniem jest słowo _zabawkowy_, choć generalnie wygląda jak ORM z Django. Co samo w sobie nie jest może niczym złym, ani nie działa na mnie odpychająco, ale jest takie... _zabawkowe_. Ale jak sądzę będę się musiał przemóc i jednak tego Peewee używać. Na szybko znalazłem jeszcze kilka innych opcji ([Orator](https://orator-orm.com/), [DAL z web2py](https://github.com/web2py/pydal), coś tam asynchronicznego jeszcze), ale to będzie ostateczna ostateczność. Na razie z bólem serca żegnam się z Pony.

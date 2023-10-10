---
title: Próbuję odejść od SQLAlchemy - Peewee
date: 2020-01-30T23:20:00
author: jarek
draft: false
tags:
  - python
  - orm
vssue: false
---

Nie jest to łatwe. I już nie chodzi o przyzwyczajenie, czy o cokolwiek innego. Mając aplikację we Flasku po prostu nie ma do czego odejść, a przynajmniej nie będzie łatwo.

<!-- more -->

->![Malbec, meh](https://i.imgur.com/sMEknSVh.jpg)<-

Mam małą aplikacyjkę we Flasku, na wczesnym etapie rozwoju. Warstwa danych jest już dobrze zdefiniowana i wszystkie modele są. Napisałem początek używając Flask-SQLAlchemy, ale w związku z tym że mogę się _pobawić_, to postanowiłem dać poszaleć konkurencji. Na robotę tym razem wziąłem [Peewee](http://docs.peewee-orm.com/en/latest/). Do przerobienia były definicje modeli i _warstwa serwisowa_. Czemu Peewee miałoby być dobrym rozwiązaniem w **tym** przypadku?

* jednym z celów jest minimalizacja użycia zasobów (Peewee ma najmniejsze zapotrzebowanie na RAM)
* ze wszystkich ORM w Pythonie Peewee ma najlepsze wsparcie dla SQLite, które w przypadku tej aplikacji jest całkowicie wystarczające jako _zaplecze bazodanowe_

Czy to wystarczy żeby zdecydować się na zmianę kluczowego elementu aplikacji _w połowie wyścigu_? Ha!

Na moje niewprawne oko Peewee jest takim _miszungiem_ ORM Django z ORM SQLAlchemy. Definicja modeli bardzo przypomina Django, natomiast operacje już są bliższe temu, co mamy w SQLA, a więc budowanie rzeczywistego SQL opeiera się na przeciążaniu operatorów. Nie powiem żeby mi się to podobało. Kod który powstaje w wyniku tego nie jest strawny dla żadnego statycznego analizatora kodu, edytor co chwilę podświetla jego zdaniem nieprawidłowe konstrukcje językowe, innymi słowy - trzeba się narobić. Bez kilku czujnych `noqa` się nie obejdzie w paru miejscach.

Zmiany w kodzie aplikacji były stosunkowo niewielkie, choć trzeba było parę rzeczy dostosować, a niektóre po prostu na początek skopiować z Flask-SQLAlchemy, jak np. definicję klasy `Pagination`, która ma parę _extrasów_ względem tego, co Peewee zwraca z funkcji `.paginate()` (a zwraca zwykłe `query`). Pomijając oczywiście definicję modeli, która jest diametralnie różna i trzeba ją napisać całkowicie od nowa, ale to się okazało najmniejszą i w sumie najprzyjemniejszą rzeczą.

Większe schody zaczęły się, gdy przyszło odpalić testy. I tu się okazało, że Peewee ma jeden wielki, ogromny minus jak stąd do Łowicza - według zalecanej procedury połączenie trwa dokładnie tyle, ile obsługa żądania HTTP, co oznacza że trzymana w pamięci baza (np. w przypadku SQLite `:memory`) pojawia się gdy aplikacja zaczyna obsługiwać żądanie HTTP i zaraz po jego obsłużeniu znika. Wniosek z tego jest taki, że do testów trzeba używać jednak _trwałej_ bazy (np w katalogu tymczasowym) i dopisać dodatkowy kod, który czyści zawartość bazy pomiędzy testami, utrzymując jednak przez cały czas połączenie z obiektem bazy danych.

Tu się pojawiła pewna refleksja dotycząca wydajności aplikacji używającej Peewee. Peewee na pewno będzie się fantastycznie sprawować w aplikacjach, które są _read heavy_, a do tego używają SQLite. Wszelkie blogi, microblogi, wszystko to co głównie pokazuje dane - warto spróbować postawić na Peewee + SQLite, będzie szybko i wydajnie. W każdym innym przypadku lepiej przejrzeć dokumentację Peewee czy dla wybranej bazy będzie możliwa implementacją puli połączeń, bo otwieranie i zamykanie połączenia przy każdym żądaniu... No, to nie jest najlepsze rozwiązanie, delikatnie mówiąc. Powinna być, ale może nie być. _Watch out_.

Trzy _commity_ później wciąż mam niedziałający kod który się _failuje_ w każdym teście, ale się nie poddaję. Na tym właśnie polega zabawa. Czy warto było się z tym babrać, to będę mógł powiedzieć jak zaczną przechodzić testy. ;)

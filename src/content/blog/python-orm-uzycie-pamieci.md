---
title: Python ORM - pomiar użycia pamięci
pubDate: 2020-01-13T10:59:00.000+01:00
tags:
    - python
    - orm
author: Jarek
description: Wszyscy jarają się prędkością (i to normalne), w tym również który ORM w Pythonie jest najszybszy, ale ja postanowiłem spojrzeć na co innego. Jak pożerają pamięć różne biblioteki ORM w Pythonie?
imageUrl: https://i.imgur.com/vLanTTNh.jpg
---

Wszyscy jarają się prędkością (i to normalne), w tym również który ORM w Pythonie jest najszybszy, ale ja postanowiłem spojrzeć na co innego. Jak pożerają pamięć różne biblioteki ORM w Pythonie?

![Chleba naszego powszedniego](https://i.imgur.com/vLanTTNh.jpg)

Zrobiłem sobie [repo na Githubie](https://github.com/zgoda/ormbench) żeby każdy mógł sobie odpalić te testy i zobaczyć jak to u niego wygląda. Na dzień pierwszy mam test dodawania _umiarkowanej_ ilości prostych obiektów (łącznie 7200 powiązanych użytkownik+post).

Testowane biblioteki to tradycyjne ORM (synchroniczne): [Peewee](https://pypi.org/project/peewee/), [Pony](https://pypi.org/project/pony/) i [SQLAlchemy](https://pypi.org/project/SQLAlchemy/), to ostatnie z użyciem ORM jak i bez. Postanowiłem nie testować Django, ponieważ ORM jest nieodłączny od całej ramówki i nie da się go użyć oddzielnie (wiedzieliście, że Peewee w pierwszej inkarnacji było _wyekstrahowanym_ ORM z Django?). Jak również postanowiłem nie testować Tortoise, ponieważ jest biblioteką asynchroniczną i jej używanie w tradycyjnym modelu wykonywania aplikacji webowej (WSGI) mija się z celem. SQLAlchemy Core jest testowane jako _baseline_.

Założeniem testów jest to by jak najbardziej przypominały one kod jaki znajduje się w większości _moich_ projektów, a więc wykonujący stosunkowo proste operacje na umiarkowanej ilości danych, a przy tym sama warstwa dostępu do danych aplikacji jest stosunkowo niewielka, ot około 10-15 modeli, najczęściej powiązanych ze sobą. Dlatego postanowiłem nie robić żadnych optymalizacji specyficznych dla biblioteki, tylko ogólne, jakie się robi przy zwykłym kodzie w Pythonie oraz takie, jakie są możliwe do zaimplementowania w każdej z nich (czyli najczęściej są _generyczną optymalizacją procesu_). Jestem pewien, że da się z każdej z tych bibliotek wycisnąć więcej, ale ja tego zwykle **nie** robię.

Wnioski po pierwszym kompletnym teście?

Właściwie to nie ma zaskoczenia, w każdym razie nie ma szoku. Jak się spodziewałem, SQLAlchemy ORM jest najwolniejsze i najbardziej _pamięciożerne_, SQLAlchemy Core jest najszybsze (a Pony tuż za nim), Peewee żre najmniej pamięci. Do pewnego stopnia natomiast zaskakująca może być skala różnic.

Pierwsze testy jakie odpaliłem na moim desktopie i na lapku wskazują, że do zrobienia tego samego względem Peewee Pony zużywa 25% więcej RAM, a SQLAlchemy ORM 100% (!). O ile większe zużycie pamięci można w przypadku Pony usprawiedliwić rzeczywiście wyższą wydajnością, to tyle trwanie przy SQLAlchemy w stosunkowo prostych projektach, które używają tylko funkcjonalności ORM zdaje się być mało uzasadnione. Pozostałe biblioteki dostarczają to samo będąc jednocześnie szybsze i mniej pazerne na RAM, a jedyna rzecz której nie dostarczają to publiczna warstwa która jest _pod ORM_ czyli Core i _expression engine_. Mnie się zdarzyło używać tego tylko do robienia naprawdę skomplikowanych operacji, które prościej byłoby wykonać używając _żywego SQL_, ale jednak chcieliśmy mieć to zrobione w Pythonie.

Uzyskane wyniki nie są miarodajne, a służą jedynie porównaniu między bibliotekami, bo przyjęta procedura testowa jest dość uproszczona, ale to wynika z tego _co chciałem mierzyć_ (użycie pamięci, nie szybkość).

Jest jeszcze jedna rzecz która może być zastanawiająca, ale to przede wszystkim dla nieco starszych czytelników, którzy pamiętają komputery wyposażone w ilość pamięci rzędu _dziesiątków megabajtów_ (a ja się do nich zaliczam). Jest to ilość pamięci jakiej wymaga ORM do załadowania całej swoje _maszynerii_, wynosząca od prawie 30 do prawie 60 MB. Mój pierwszy komputer PC miał 16 MB RAM, a pierwszy który sam sobie złożyłem 64 MB. 20 lat temu Python nie miałby szans zdobyć takiej popularności i trzeba było poczekać na epokę _gigabajtów ramu_.

Na konkluzje jeszcze jest za wcześnie, bo mam dopiero jeden test (i to raczej najmniej miarodajny, stosunkowo rzadko wykonuje się _batch insert_). Na pewno nie będę przepisywał moich istniejących projektów na Peewee, ale zapewne wezmę je pod uwagę dokonując w przyszłości wyboru biblioteki ORM.

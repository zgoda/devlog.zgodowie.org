---
title: 'Resurrection: SQLAlchemy'
pubDate: 2017-05-31T11:54:00.000+02:00
tags:
    - programowanie
    - python
description: Po kilku miesiącach dłubania w drobnicy przyszedł czas powrotu do Flaska i SQLAlchemy.
---

Nie, nie zapomniałem, że robię głównie w Pythonie i nie zapomniałem że moją główną dziedziną działalności są internety. Po kilku miesiącach dłubania w drobnicy przyszedł czas powrotu do Flaska i SQLAlchemy. Z przytupem.

## Hybrid property

Sytuacja wyglądała tak, że potrzebowałem posortować `query` po kolumnie wyliczeniowej, która dodatkowo jest w dowiązanej tabeli. Prościzna w żywym SQL-u, nie aż taka w SQLAlchemy. Szczęśliwie nie ma sytuacji bez wyjścia, można użyć `column_property`, ale jest i nowoczesność w domu i zagrodzie pod postacią `hybrid_property`. W skrócie chodzi o to, że taki atrybut inaczej się wylicza, gdy jest pobierany z instancji a inaczej z obiektu klasy (np. przy budowaniu `query`). Jak to wygląda?

Atrybut dostępny z instancji jest zwykłą sumą robioną w Pythonie. Atrybut dostępny z obiektu klasy jest wyliczany przez podzapytanie po stronie SQL. Działa jak złoto, można zwrócić wynik posortowany po tym atrybucie.

---
title: Koniec i18n w Brewlogu v3
author: Jarek
pubDate: 2020-07-27T20:53:00
description: Wsześniejsze wersje Brewlogu miały w pełni działające i18n (i w dużej mierze również l10n) oparte na bibliotece Babel. W Brewlogu v3 zdecydowałem się jednak z tego zrezygnować.
tags:
    - python
    - programowanie
    - projekty
    - pcp
    - flask
imageUrl: https://i.imgur.com/hFTqgoHh.jpg
isTechRelated: true
---

W Brewlogu v3 zrezygnowałem z obsługi wielu języków. Działała ona dobrze, ale zwiększający się udział Javascriptu w aplikacji postawił pod znakiem zapytania integralność rozwiązania opartego na biliotece [Babel](https://github.com/python-babel/babel), dostosowanej tylko dla Pythona.

![Sour](https://i.imgur.com/hFTqgoHh.jpg)

Nie żeby nie istniały rozwiązania i18n dla Javascriptu. Wystarczyło kilka minut, bym znalazł ich kilkanaście. Zdecydowałem się jednak zrezygnować z obsługi i18n i l10n - przynajmniej na razie.

Bibliotek i18n dla Javascriptu jest dużo i żadna nie wydaje się być _clear winner_, przynajmniej na pierwszy rzut oka. Zanim sprawdzę te kilka najpopularniejszych to trochę czasu jeszcze minie. Tak że trzeba przyznać, że w tej chwili nie wiem jak i18n miałoby być zaimplementowane w JS. To jest raz.

A dwa wynika z tego, co zobaczyłem w danych dotyczących użytkowników. Nie mam ani jednego, który by używał innego _locale_ niż `pl_PL`, więc wydaje mi się, że nie ma co przesadzać.

Brewlog, jak wszystkie pozostałe moje projekty, służył mi również do nauki. Między innymi dlatego jest (lub było) w nim kilka nieoczywistych rozwiązań, jak np użycie _raw_ SQLAlchemy w aplikacji, a nie przez rozszerzenie Flask-SQLAlchemy. Dlatego również we wcześniejszych wersjach zaimplementowałem w nim pełne i18n. Dopóki wszystkie napisy dało się kontrolować przy użyciu Babel, to i nie było się czym przejmować - jedno źródło skutkowało jednym napisem podczas wyświetlenia. Teraz byłoby to trochę utrudnione.

Dlatego Brewlog v3 jest na razie tylko po polsku. Możliwe że w pewnym momencie rozwoju pojawi się potrzeba, żeby zrobić go aplikacją wielojęzyczną/wielokulturową, ale to wtedy będę się tym martwił. A na razie cieszmy się tym co mamy - usunięcie mechanizmu tłumaczeń zmniejszyło zapotrzebowanie na pamięć procesu serwera o jakieś 10%.

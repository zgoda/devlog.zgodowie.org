---
title: Brewlog v3
pubDate: 2020-07-10T23:26:00
author: Jarek
tags:
    - python
    - programowanie
    - flask
    - opensource
    - projekty
    - pcp
description: Lata mijają, a jeden projekt cały czas u mnie wisi
imageUrl: https://i.imgur.com/XdKY5Uph.jpg
---

Dziś poszedł pierwszy commit do gałęzi `v3` najstarszego mojego projektu. Długa droga do kolejnego kamienia milowego właśnie się rozpoczęła.

![Greens](https://i.imgur.com/XdKY5Uph.jpg)

[Projekt Brewlog](https://github.com/zgoda/brewlog) odpaliłem w 2012 roku, gdy poczułem potrzebę posiadania serwisu, w którym w _nieco bardziej ustrukturyzowany sposób_ niż na [forum piwo.org](https://www.piwo.org/forums/) mógłbym zapisywać swoje dokonania piwowarskie. Nie żaden serwis z projektowaniem receptur, tylko zapiski piwowarskie. Przez ponad 2 lata prowadziłem je na papierze, ale okazało się to całkowicie nieprzenośne - wymagało mozolnego przepisywania na forum, żeby mieć link do dokumentu który można byłoby komuś udostępnić.

Projekt zyskał [status _live_ w 2013 roku](https://brewlog.zgodowie.org/) i od tamtej pory okazjonalnie coś w nim dłubałem, a to coś zaktualizowałem, a to wymieniłem przestarzały kod na nieco bardziej współczesny, a to dostosowałem do ewoluującego krajobrazu narzędzi. Największym skokiem była aktualizacja _frontendu_ do Bootstrap 4, ale ogólnie aplikacja wiele się nie zmieniła. Kilka mało używanych funkcji poszło w pioch, nic jednak nie przybyło. _Stack_ również zasadniczo się nie zmienił: Flask, SQLAlchemy, WTForms na backendzie, Bootstrap na froncie. I tak dobrnęliśmy do wersji 2.0, która przynosi jedną znaczącą zmianę.

Początkowo nie za bardzo przejmowałem się *prywatnymi danymi użytkowników*. Nie były oczywiście nikomu udostępniane, ale aplikacja miała (i jeszcze jakiś czas będzie mieć) jedno _nasty feature_ - identyfikacja użytkownika odbywała się przez logowanie w serwisach społecznościowych oraz OAuth2. Oznaczało to, że osoby _niepokorne_, którym serwis społecznościowy np. zawiesi konto na jakiś czas za _nieprawomyślne_ wypowiedzi, mogą utracić dostęp do swoich danych. Przynajmniej na jakiś czas, jeżeli akurat wtedy wypadnie czas wygaśnięcia sesji. I nie da się go odzyskać, jeżeli jednocześnie dwaj członkowie tego oligopolu postanowią jednocześnie odesłać człowieka _na kwarantannę_.

![Fuggedaboudit](https://i.imgur.com/mW20Q6Ah.jpg)

Z tego właśnie powodu w Brewlog v2 identyfikacja użytkownika jest _lokalna_. Jest tradycyjne hasło (spokojnie, zapisane jako całkiem bezpieczny skrót `PBKDF2_SHA256`), jest potwierdzanie własności adresu email. Bez tego ostatniego można żyć - do momentu kiedy zapodzieje się hasło, bo wtedy dostęp do konta będzie niemożliwy do odzyskania. Ale jak ktoś używa dobrego managera haseł, to powinno być do przejścia. To znaczy, _co mogłoby pójść źle_?

I z takim bagażem wkraczam na ścieżkę prowadzącą do `v3`. Cele są ambitne:

-   wyłączenie logowania przez sieci społecznościowe w grudniu 2020
-   pozbycie się Bootstrapa i jQuery
-   _reaktywny_ formularz wprawadzania i modyfikacji danych warki
-   _reaktywny_ formularz wprowadzania i modyfikacji metadanych warki (notatki z degustacji, operacje przy wyszynku, itp)

Między innymi oznacza to, że aplikacja przestanie być dostępna dla użytkowników przeglądarki Internet Explorer, ale kto by się nimi w ogóle przejmował w 2020 roku.

Kiedy? Mamy 10 lipca 2020, więc ostrożnie zakładam połowę września 2021. Pośpiech jest wskazany tylko przy łapaniu pcheł.

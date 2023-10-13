---
title: 'Python, Preact, HTM - prolog'
pubDate: 2019-12-01T14:26:00.000+01:00
tags:
    - python
    - preact
author: Jarek
---

To jest część 0, czyli wstęp do właściwego przewodnika tworzenia aplikacji wykorzystującej Pythona, Preact i HTM.

Zacznę od zdefiniowania tego, czego oczekuję od finalnej aplikacji.

-   backend w Pythonie
-   routing w Pythonie
-   frontend w HTML5 pregenerowany w Pythonie
-   wszystkie zasoby (CSS, JS) hostowane lokalnie
-   elementy dynamiczne interfejsu użytkownika w Javascripcie
-   żadnego specjalnego toolingu dla Javascriptu, tylko importowane moduły
-   nowoczesny Javascript

Dwa ostatnie wymagania powodują, że Javascript będzie w wersji specyfikacji ES6, co daje mi [nieco ponad 88% pokrycia](https://caniuse.com/#feat=es6-module) zarejestrowanych przeglądarek (stan na początek grudnia 2019).

![Mmm, beer!](https://1.bp.blogspot.com/-McmxL6iYrOs/XePAfW8wtMI/AAAAAAAAHHU/FyIVxUaBAFEZnWlDCmQL_P1AvlWZQnLJACKgBGAsYHg/s800/IMG_0212.JPG)

Z kolei wymaganie by HTML był pregenerowany przez kod zaplecza wymaga użycia ramówki aplikacyjnej która potrafi generować HTML. Z racji tego że piszę przewodnik, a dobrze znam [Flask](https://flask.palletsprojects.com/), to zdecydowałem się użyć właśnie tego. Na potrzeby przewodnika bazą danych zaplecza będzie SQLite, a dostęp do niej z aplikacji będzie realizowany przy użyciu [ORM Pony](https://docs.ponyorm.org/). A jako że pierwszą moją ramówką webową w Pythonie było Django, to przewodnik zostanie zrealizowany jako aplikacja do głosowania w ankietach, gdzie taki właśnie temat ma wprowadzenie.

Z popularnych ramówek zarówno React jak i Vue zapowiadają, że da się je używać osadzone bezpośrednio w HTML, ale jakby to powiedzieć... **nie do końca**. Kod używający Vue nie daje się łatwo zamknąć w oddzielny moduł Javascriptu, który może zostać załadowany na statycznej stronie - nie twierdzę że nie jest to możliwe, ale że wymaga pewnej gimnastyki, której chciałem uniknąć. Z kolei React jest tak ściśle związany z JSX, że decyzja o nie używaniu JSX pociąga za sobą konieczność ręcznego generowania elementów DOM, co jest zwyczajnie upierdliwe. Albo trudno, albo niewygodnie - to ja jednak podziękuję.

Zupełnym przypadkiem trafiłem na [Preact](https://preactjs.com/), który już na samym początku wprowadzenia proponuje użycie [właśnie takiego podejścia](https://preactjs.com/guide/v10/getting-started#alternatives-to-jsx). Dobra nasza!

Jeszcze jedną dobrą stroną użycia Preact jest jego bardzo mały rozmiar, co w sytuacji wymagania lokalnego hostowania wszystkich zasobów przełoży się na niższe rachunki za transfer sieciowy lub zmniejszy efektywny rozmiar aplikacji.

Skąd to wymaganie? Zakładam, że docelowa aplikacja, która powstanie po nabyciu przeze mnie dostatecznej wprawy w posługiwaniu się Preactem, będzie uruchomiona w warunkach bez dostępu do internetu, na niewielkiej płytce ze słabym procesorem MIPS i niewielkim zasobem _storage_, np. [Onion Omega](https://docs.onion.io/omega2-docs/omega2p.html#omega2p) lub niewiele większej. Płytka będzie miała uruchomione WiFi w trybie AP+STA, ale nie będzie miała połączenia z internetem. Być może to nieco utrudnia sprawę, ale wg mnie nieprzesadnie, natomiast dzięki temu mam pełną kontrolę nad zasobami aplikacji.

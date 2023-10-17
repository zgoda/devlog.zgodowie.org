---
title: 'Javascript dla niechętnych'
pubDate: 2019-12-01T14:03:00.002+01:00
tags:
    - programowanie
    - projekty
    - javascript
    - python
    - preact
author: Jarek
description: 'Nie da się w dzisiejszych czasach robić w Pytongu i nie dotknąć się do Javascriptu.'
---

Nie da się w dzisiejszych czasach _robić w Pytongu_ i nie dotknąć się do Javascriptu. Jest to wszędzie i nawet przy największym wysiłku czasem nie da się tego ominąć. A jeszcze teraz namnożyło się tych _famenwerków do frontendu_, tak że nie da się obrócić żeby na jakiś nie wleźć. Nie mówiąc o politowaniu z jakim na człowieka patrzą _bomble_.

![Ale super](https://1.bp.blogspot.com/-SpZJNx6kzzU/XeOe549_lHI/AAAAAAAAHHI/Lt8IXqKnve0UR5xB9X5jLqNfZkddhXScQCKgBGAsYHg/s800/IMG_0229.JPG)

Pełen niechęci zacząłem poszukiwania sposobu na pożenienie tych dwóch światów, tzn Pythona z _jakimś_ Javascriptem frontendowym. Z rosnącą niechęcią przedzierałem się przez kolejne tutoriale dotyczące Reacta, Angulara czy Vue i z coraz większym obrzydzeniem je odrzucałem. W końcu zebrałem moje oczekiwania co do docelowej architektury i wzorca aplikacji.

-   żadnego webpacka i podobnych narzędzi, framework ma być osadzony w HTML
-   żadnego _transpilingu_
-   stronę wygeneruje Python i tam też będzie zrobiony routing

Nie było łatwo, ale w końcu znalazłem. Nazywa się to [Preact](https://preactjs.com/) i działa na tej samej zasadzie co React (oraz implementuje dużą część API), ale w połączeniu z [HTM](https://github.com/developit/htm) spełnia wszystkie wymagania, a więc da się go osadzić w kodzie HTML i nie ma potrzeby _transpilowania_ żadnego dziwnego języka do Javascriptu. Wiąże się to z pewnymi ograniczeniami, ale [walić IE](https://caniuse.com/#feat=es6-module), działa we _współczesnych przeglądarkach_.

Ilość czasu jaki musiałem poświęcić na znalezienie czegoś co działa w ten sposób i jednocześnie nie jest bolesne przekonuje mnie, że nie jest to często spotykany sposób użycia, dlatego w kilku artykułach spróbuję opisać to dokładniej.

-   [Prolog](/python-preact-htm-prolog/), czyli czego szukamy, co się nie nadaje a co tak
-   [Struktura aplikacji](/preact-python-htm-struktura-aplikacji/) i przykładowa organizacja kodu
-   Komponenty aplikacji w Preact
-   Zusammen do kupy - Python, Preact, HTM
-   Epilog i kilka przemyśleń dot. Javascriptu

Kod związany z tym wprowadzeniem jest dostępny na [githubie](https://github.com/zgoda/polls). Najlepiej jest założyć, że jest to wersja rozwojowa. Jeżeli ktoś z czytelników ma jakieś uwagi to bardzo proszę się nie krygować i wskazać co można poprawić - sam się uczę tego wszystkiego.

Zapewne to nie koniec.

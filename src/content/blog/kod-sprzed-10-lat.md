---
title: Kod sprzed 10 lat
pubDate: 2019-12-23T23:13:00.000+01:00
author: Jarek
tags:
    - python
description: Framework webowy w Pythonie? Mieliśmy kiedyś tego bardzo dużo. Co się z nimi stało?
---

Zniesmaczony stanem ramówek do robienia API w Pythonie postanowiłem spróbować sklecić coś, co miałoby szansę zaspokoić moje potrzeby. Kod nie jest jeszcze publicznie dostępny (ale będzie), za to wybrana podstawa na której buduję moją _niby-ramówkę_ od razu skojarzyła mi się z jednym z pierwszych dostępnych moich _kodów_. I niejako historia zatoczyła koło, chichocząc przy tym jak dzika.

![Bez jaj](https://i.imgur.com/2mzFN4Oh.jpg)

[Kod ten](https://github.com/zgoda/pyconpl09) to przykład do mojej prelekcji wygłoszonej podczas PyconPL w październiku 2009 roku w Ustroniu. Kiedyś gdzieś była jeszcze do tego prezentacja, ale chyba zaginęła - w każdym razie chodziło o odarcie z magii Django i pokazanie, czym tak na prawdę wewnątrz jest _ramówka WSGI_. Kod przykładowy napisałem przy użyciu biblioteki [Werkzeug](https://werkzeug.palletsprojects.com/), szablony renderował silnik [Jinja2](https://jinja.palletsprojects.com/), dane pochodziły z MongoDB, a niektóre nazwy bardzo mocno przypominały nazwy, które można znaleźć we Flasku - tyle że Flask (jako [żart pod tytułem Denied](https://web.archive.org/web/20180514202042/http://lucumr.pocoo.org/2010/4/3/april-1st-post-mortem/)) pojawił się dopiero 1 kwietnia następnego roku, a formułę zbliżoną do obecnej miał jeszcze trochę później.

Prezentacja wzbudziła swego czasu dość duże zainteresowanie, ale chyba raczej z powodu kolokwialnego języka niż dla wartości merytorycznych, w każdym razie nie przeżyliśmy jakoś wielkiego wysypu ramówek napisanych _na własne potrzeby_ w jej wyniku. Co mnie teraz po 10 latach nie przeszkadza powrócić do idei zmontowania sobie czegoś podobnego. Właściwie Werkzeug dostarcza niemal wszystko co jest potrzebne do realizacji tego zadania, tylko trzeba wiedzieć dokąd się zmierza.

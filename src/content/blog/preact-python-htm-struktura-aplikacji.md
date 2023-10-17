---
title: 'Python, Preact, HTM - struktura aplikacji'
pubDate: 2019-12-05T23:09:00.000+01:00
tags:
    - python
    - preact
author: Jarek
description: Próbuję pożenić Pythona z Preactem.
---

Czas zabrać się do roboty.

![Do roboty](https://1.bp.blogspot.com/-ygrOJYZ3SVg/XeT2K8ylsaI/AAAAAAAAHHk/N9d2heJbUgca2eaZDPF8zUNsDZsyTpZFQCKgBGAsYHg/s800/IMG_0180.JPG)

Po zebraniu do kupy wymagań co do aplikacji przyszedł czas na strukturę. Ponieważ jest to Javascript osadzony w HTML, to nie będzie oddzielnego katalogu na frontend, a wszystko będzie umieszczone w katalogu statycznych (hehe) zasobów aplikacji. Tak mniej-więcej to wygląda:

![Tree](https://1.bp.blogspot.com/-8Hr07crdHJc/XeT2VQSzB9I/AAAAAAAAHHo/oZReUA30H0QA0-ecRy4lGe_OOcMavaJjACLcBGAsYHQ/s800/Zrzut%2Bekranu%2Bz%2B2019-12-02%2B12-30-48.png)

Dość typowa aplikacja we Flasku z dwoma blueprintami, `main` który generuje HTML i `api` z którym komunikuje się Javascript, który z kolei umieszczony jest w katalogu `static`. Preact i HTM są jako jeden plik, który dla niepoznaki nazwałem `preact.min.js`, ale tak naprawdę jest to składanka obu bibliotek. Kod Javascript który działa na konkretnej stronie jest w katalogu `static/js`, po jednym pliku na każdą stronę. Pliki te są dołączane do strony jako moduły (dzięks, ES6!):

```jinja-html
{% block pagejs %}
<script type="module" src="{{ url_for('static', filename='js/poll.js') }}"></script>
{% endblock %}
```

Dzieje się to pod koniec sekcji `<body />` natomiast główny komponent Preacta jest montowany we wcześniejszym bloku:

```jinja-html
{% block content %}
<h1>Poll {{ poll.title }}</h1>
<p class="subtitle">{{ poll.description }}</p>
<div id="app">
</div>
{% endblock %}
```

Prosto? Bardzo prosto.

Do tego zwyczajowe _boilerplate_ aplikacji we Flasku, ale to idzie migiem. A najciekawsze rzeczy dopiero się zaczynają, bo na razie nie ma tu niczego interesującego.

Nie żebym uważał Javascript za cokolwiek interesującego.

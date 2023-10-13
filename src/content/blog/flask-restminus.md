---
title: Dlaczego nie będzie Flask-RESTMinus
pubDate: 2020-01-17T23:49:00
tags:
    - flask
    - rest
    - python
author: Jarek
---

Zrobiwszy właściwie wszystko co potrzebne w moim _nano-frameworku WSGI_ postanowiłem spojrzeć na kod popularnej konkurencji. Jedną z najpopularniejszych bibliotek do robienia REST API jest Flask-RESTful i na początek spojrzałem właśnie tam.

![Wspomnienie lata](https://i.imgur.com/Uo3KRfdh.jpg)

Używałem tej biblioteki jakiś czas temu i była całkiem znośna. Pomijając to, że są tam nie działające rzeczy których istnienie wywołuje zdziwienie samych developerów, jak również rzeczy, które są _od zawsze_, ale tak trochę bez sensu, bo inni zrobili to lepiej, to jest to w sumie w porządku biblioteka. Stąd też zaświtał mi w głowie pomysł, by wywalić z Flask-RESTful wszystko co niepotrzebne i zrobić z tego _aktywny fork_ pod nazwą Flask-RESTMinus, podobnie jak istnieje Flask-RESTPlus.

Zrobiłem sobie tego forka i już byłem gotów zasuwać z kodem, gdy przy którymś module przeglądanym w celu podjęcia decyzji co zostawić a co wywalić po raz kolejny wyszło mi, że właściwie niewiele można zostawić, a to co może zostać to należałoby też przepisać od nowa.

A potem spojrzałem na mój _nano-framework_ mieszczący się w 3 modułach i w < 300 linijkach kodu i zrozumiałem, że to bez sensu. Tylko się umęczę, a efektu z tego żadnego nie będzie. Lepiej skupić się na tym, co daje pewne perspektywy na przyszłość.

I dlatego nie będę robił Flask-RESTMinus.

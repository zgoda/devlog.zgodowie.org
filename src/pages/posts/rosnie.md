---
title: Rośnie
date: 2020-07-04T23:10:00
author: jarek
tags:
  - python
  - django
  - flask
---

Gdy w 2007 roku odpalaliśmy produkcyjnie sporą aplikację w [Django 0.95](https://www.djangoproject.com/weblog/2006/jul/29/095/) (i wkrótce potem migrowaliśmy do [0.96](https://www.djangoproject.com/weblog/2007/mar/23/096/)), pojedynczy proces pod FastCGI zajmował w pamięci 36 MB resident set i było *ooo, ale dużo!*, ale niewiele dało się z tym zrobić.

W 2020 roku po wielkiej gimnastyce udało mi się w małej aplikacyjce typu blog we Flasku z 4 widokami na krzyż zejść do 38 MB resident set. I tak poczytuję to za sukces, bo na ustawieniach domyślnych oraz używając *no-brainers* jak np. Flask-SQLAlchemy było to około 65 MB RSS. Trudno powiedzieć ile by to wyszło w obecnym Django 3.0 ale nie wydaje mi się że dużo mniej.

To się nazywa cena postępu.

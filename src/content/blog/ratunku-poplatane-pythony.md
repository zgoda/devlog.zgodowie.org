---
title: Ratunku, Pythony mi się poplątały!
pubDate: 2020-05-24
tags:
    - python
    - ubuntu
author: Jarek
description: Czasem chwila nieuwagi może kosztować sporo nerwów. W szczególności nieuwagi podczas aktualizacji systemu do nowszej wersji.
imageUrl: https://i.imgur.com/5pLkcKOh.jpg
isTechRelated: true
---

Czasem chwila nieuwagi może kosztować sporo nerwów. W szczególności nieuwagi podczas aktualizacji systemu do nowszej wersji.

![Mmm, beer!](https://i.imgur.com/5pLkcKOh.jpg)

Podczas aktualizacji Ubuntu 18.04 do 20.04 na lapcioku zapomniałem usunąć PPA i pakiety, w szczególności Pythona 3.8 z deadsnakes. Aktualizacja przebiegła gładko, po czym po reboocie okazało się że w dystrybucji jest starsza wersja niż w PPA i zostałem z 3.8.3 z Bionic zamiast 3.8.2 z Focal. Przypadkiem działało, ale gryzło mnie to cały czas. Próbowałem różnych `install --reinstall` a to tak, a to inaczej, ale za każdym raziem `apt` wypisywał mi tak straszne rzeczy, że odpuszczałem.

Ale w końcu znalazłem opis podobnego problemu (z innym pakietem) i jak koleżka go rozwiązał. Powiem od razu, nic przyjemnego, w pytę pisania, ale do rzeczy. Jak komuś się to jeszcze kiedyś przydarzy, to trzeba zainstalować od nowa **wszystkie** pakiety od Pythona.

```shell
sudo apt install \
    libpython3.8-minimal=3.8.2-1ubuntu1.1 \
    python3.8-minimal=3.8.2-1ubuntu1.1 \
    libpython3.8-stdlib=3.8.2-1ubuntu1.1 \
    libpython3.8=3.8.2-1ubuntu1.1 \
    python3.8=3.8.2-1ubuntu1.1 \
    python3.8-dev=3.8.2-1ubuntu1.1 \
    python3.8-venv=3.8.2-1ubuntu1.1 \
    libpython3.8-dev=3.8.2-1ubuntu1.1
```

Tak że, uch, może następnym razem zastanowię się chwilę zanim pacnę `do-release-upgrade`.

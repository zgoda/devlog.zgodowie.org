---
title: 'Neat idea'
pubDate: 2019-04-06T11:03:00.002+02:00
tags:
    - programowanie
    - projekty
    - python
author: Jarek
description: 'Ping!'
---

W Pythonie jest obyczaj, że informacja o wersji jest dostępna pod zmienną `__version__` na najwyższym poziomie pakietu. Informacja ta powinna być zawarta również w skrypcie instalacji setup.py, jednakowoż zwykle złym pomysłem jest importowanie w nim własnego pakietu. Ludzie mają różne sposoby aby to obejść - parsują pliki jako tekst i szukają tam umówionego ciągu wyrażeniami regularnymi, albo trzymają tę informację gdzieś na boku.

A gdyby tak sparsować ten plik do [AST](https://greentreesnakes.readthedocs.io/en/latest/) i rekurencyjnie badając zmienną `__version__` dotrzeć w końcu do tej jednej stałej, która ustala wersję raz dla wszystkich?

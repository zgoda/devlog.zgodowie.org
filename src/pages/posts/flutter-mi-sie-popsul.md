---
title: Flutter mi sie popsuł i co ja teraz zrobię?!
author: jarek
date: 2021-02-05T15:15:00
tags:
  - flutter
  - troubleshooting
description: My Flutter broke and I am broken too! Czyli jak naprawić zepsute środowisko programistyczne i uruchomieniowe Fluttera.
---

Coś się... Coś się popsuło i mi Flutter przestał działać. Sypie jakimiś błędami i w ogóle nie wiadomo o co chodzi.

Kolejny artykuł, który będzie aktualizowany na bieżąco.

<!-- more -->

## Upgrade z `1.25.0-x.y.pre` do `1.26.0-x.y.pre`

**Channel**: beta

Wersja `1.26` generalnie włącza `null-safety`, co jest *łamiącą zmianą*. Spora część bibliotek nie obsługuje jeszcze tego i padają jak muchy jedna po drugiej.

Palnąłem w terminalu `flutter upgrade --verify-only`, a że zmiana nie wyglądała na wielką, to zaraz poszedł *wet run*. I jebło.

Winowajcą okazał się *plugin* do renderowania HTML na canvasie widgetu [flutter_html](https://pub.dev/packages/flutter_html). Znaczy, nawet nie on sam, tylko jego 2 zależne biblioteki do renderowania audio i SVG. A że te używają wycofanego API SDK lub nie są zgodne z `null-safety`, to przyszło mi się pożegnać z tym widgetem. Alternatywą byłoby cofnięcie się do `1.25`, ale nie po to przełączałem się na strumień *beta*, żeby w jego ramach zachowywać się jakby aplikacja była na produkcji.

Słabe okazało się to, że w przypadku zależności przechodnich w sumie nie ma jak łatwo sprawdzić **czyje** są to zależności. W przypadku tych dwóch nie było wielkiego problemu z wytropieniem winowajcy, ale raz, że były dość specyficzne, a dwa, że zależności bezpośrednich mam teraz w sumie może 6 i nie ma za wiele sprawdzania.

## Nie da się przełączyć strumienia

```shell-session
$ flutter channel beta
Switching to flutter channel 'beta'...
git: fatal: 'origin/beta' is not a commit and a branch 'beta' cannot be created from it
Switching channels failed with error code 128.
```

Pojawia się to na linuksie (może też gdzie indziej, nie mam jak sprawdzić), jeżeli instalację ręczną przeprowadziło się [zgodnie z instrukcją instalacji](https://flutter.dev/docs/get-started/install/linux#install-flutter-manually). Podaje ona, żeby w ramach `git checkout` wybrać sobie strumień do linii poleceń gita dodając `-b stable --depth 1`. Efekt jest taki, że po pobraniu kodu git widzi tylko tagi i ten jeden branch, więc nie ma jak przełączyć się na inny, np `origin/beta` który odpowiada strumieniowi wydania `beta`. Trzeba ściągnąć źródła jeszcze raz bez przełącznika `--depth 1` i ponowić całą instalację.

Zdecydowanie nie polecam instalowania ze snapa, robi się większy pierdolnik, w szczególności ze ścieżkami do SDK, które trzeba podawać w kilku miejscach, a przy instalacji ze snapa jest to w jakimś dziwnym miejscu. Instalacja ręczna zajmuje trochę więcej czasu, ale poźniej jest prościej.

## Co, mam instalować Android Studio

Tak czysto w teorii to niekoniecznie, bo do developerki na Androida Flutter potrzebuje tylko paru rzeczy:

* SDK
* platform tools
* emulator
* build toolchain

W praktyce bez pełnej instalacji Android Studio trudno jest to zgrać, w szczególności ostatni punkt. Kiedyś, dawno temu wraz z SDK był dostarczany również program sdk-manager, który dawał możliwość wygodnego zarządzania artefaktami bez potrzeby instalowania pełnego Android Studio, ale od jakiegoś czasu pod tą nazwą wraz z platform-tools dostarczany jest tylko programik z wiersza poleceń, który służy do instalowania pojedynczych komponentów. Podobnie jest z avd-manager (narzędzie do zarządzania instancjami emulatora), który pełny interfejs ma tylko jako narzędzie wbudowane Android Studio.

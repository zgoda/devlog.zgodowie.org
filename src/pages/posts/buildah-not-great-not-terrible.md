---
title: Buildah - not great, not terrible
author: jarek
date: 2020-12-04T10:21:00
tags:
  - kontenery
  - programowanie
  - podman
description: Buildah jest fajnym narzędziem, ale jeszcze trochę mu brakuje, żeby używać go do wszystkiego.
---

Z mojego niedawnego tekstu o [Buildah](https://github.com/containers/buildah) można odnieść wrażenie, że jest to cudowne narzędzie, które uwolni ludzkość od wszelkich trosk i rozwiąże najbardziej palące problemy współczesnego świata. Tak oczywiście nie jest, Buildah jest stosunkowo nowym wynalazkiem i do dojrzałości jest jeszcze przed nim długa droga. Krytycznym okiem spróbuję spojrzeć na to, czego brakuje.

->![Kiełben](https://i.imgur.com/Z1RUvuEh.jpg)<-

<!-- more -->

Moje doświadczenie z Buildah (Podmanem, Skopeo i tak dalej) rośnie z dnia na dzień, a im więcej tych narzędzi używam, tym więcej wychodzi *kwiatków*, więc ten artykuł to będzie *WIP*, aktualizacje będą się pojawiały w miarę napotykania na *idiosynkrazje*.

## Buforowanie warstw

Na dobry początek, natknąłem się na to wczoraj po raz 20-ty uruchamiając trwający 10 minut proces budowania [obrazu kontenera](https://quay.io/repository/zgoda/bip) z [moją aplikacją BIP](https://github.com/zgoda/bip) (to [ten skrypt](https://github.com/zgoda/bip/blob/master/build_image.sh)).

Docker budując obraz kontenera każde polecenie z Dockerfile zapisuje sobie lokalnie w postaci *warstwy*. Przy kolejnych uruchomieniach budowania te zapisane warstwy mogą zostać ponownie wykorzystane bez konieczności budowania ich od nowa, co znacząco przyspiesza cały proces. O ile Buildah ma to zaimplementowane w przypadku budowania z Dockerfile (używając `buildah bud`), to takiej możliwości nie ma gdy buduje się kontener [interaktywnie lub ze skryptu powłoki](https://github.com/containers/buildah/issues/1292). Pojawiają się różne [propozycje](https://github.com/containers/buildah/issues/2383) rozwiązania tego problemu, ale prace jeszcze się nie rozpoczęły.

Efekt braku buforowania warstw podczas budowania kontenera jest taki, że za każdym razem cały proces odbywa się od początku do końca, co w niektórych przypadkach może trwać naprawdę długo. Praktycznie przekreśla to użycie procesu budowania ze skryptu jako narzędzia używanego przez developerów aplikacji, a chyba właśnie im ta zmiana DSL Dockerfile na znany i lubiany skrypt powłoki podobałaby się najbardziej.

Rozwiązanie tymczasowe: używać Dockerfile i `buildah bud`.

## Niezbyt wygodne unshare

Jeżeli chcemy wykonać jakąś operację w kontekście użytkownika wewnątrz kontenera (a nie jest to root), to niestety trzeba skorzystać z `unshare`, by wykonać coś w specyficznej przestrzeni nazw. Gdy jest to jedna czynność typu skopiowanie pliku do zamontowanego systemu plików kontenera, to może pół biedy (choć wtedy prościej jest chyba zrobić `buildah copy`), ale przy większej liczbie operacji to zaczyna być męczące.

W Pythonie możnaby użyć managera kontekstu, w skrypcie shella raczej nie ma takiej możliwości. Działa `unshare` całego skryptu budującego obraz, choć trzeba o tym pamiętać.

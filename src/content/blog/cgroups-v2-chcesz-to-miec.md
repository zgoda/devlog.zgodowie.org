---
title: cgroups V2, przyszłość już tu jest
author: Jarek
pubDate: 2020-12-08T17:03:00
tags:
    - kontenery
    - linux
    - podman
description: Jak wiadomo, "wersja 2" jest zawsze lepsza od "wersji 1", tak też jest z control groups w linuksie. A co konkretnie jest lepsze?
---

Jeżeli używasz Fedory 31 lub nowszej, to bardzo możliwe, że cgroups V2 są twoją codziennością. F31 to była pierwsza dystrybucja Linuksa, w której cgroups domyślnie są w wersji 2, a nie 1. O ile nic nie zmuszało cię do używania Dockera, to raczej nadal masz cgroups V2, ale jak ktoś jest ciekawy co to takiego, to nie zaszkodzi przeczytać.

![Ribeye](https://i.imgur.com/qBHFvDrh.jpg)

Control groups, w skrócie _cgroups_, są ficzerem jądra Linuksa, który umożliwia kontrolę przydzielonych zasobów dla poszczególnych procesów - cykli procesora, ilości pamięci, przepustowości podsystemu we/wy. Wersja 1 w głównej linii jądra pojawiła się pod koniec roku 2007, a wydana została wraz jądrem 2.6.24 w styczniu 2008. Prace nad wersją 2 rozpoczęły się w roku 2013 (ładnie opisane [powody przepisania tego systemu](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html#issues-with-v1-and-rationales-for-v2)), a wydana została w roku 2014 wraz z wersją 3.16. Po 5 latach prac developerzy Fedory w wydaniu 31 ustawili cgroups V2 jako domyślne i od tamtej pory nic nie jest takie samo. Pierwszym symptomem, że coś _jest inaczej_ było to, że nie uruchamiał się demon Dockera:

```text
dockerd[10141]: Error starting daemon: Devices cgroup isn’t mounted
```

Od wydania F31 minął rok, Docker jeszcze nie obsługuje cgroups V2 (planowane jest to w wersji 20.10). Możliwe że zapowiadane [wycofanie wsparcia dla Dockera w Kubernetes](https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/) coś przyspieszy, ale koniec Dockera tak czy inaczej nadchodzi wielkimi krokami. Żartuję oczywiście.

## V1 i V2, widzialne różnice

Różnic między V1 a V2 jest dużo, ale wiekszość z nich nie będzie widoczna dla programisty używającego kontenerów (tym mniej dla _zwykłego power usera_), ale dla porządku wspomnę co się zmienia:

-   jedna hierarchia kontrolna dla procesu - nie da się dołączyć do jednej grupy pod kontrolę CPU i do innej grupy pod kontrolę przydziału pamięci
-   jedna hierarchia dla wszystkich wątków procesu - nie da się dołączyć części wątków do jednej grupy, a części do innej
-   bezpieczna kontrola nad przydziałem zasobów z poziomu zwykłego użytkownika (nie roota)

Widać że system został znacząco uproszczony, ale to co będzie widoczne, to tylko mozliwość przydzielenia określonych zasobów procesowi uruchamianemu z konta zwykłego użytkownika (np w kontenerze _rootless_). Teoretycznie można to było zrobić i w V1, ale dla bezpieczeństwa najczęściej było to wyłączane na poziomie kompilacji jądra systemu, ponieważ mogło mieć katastrofalne skutki uboczne - łącznie z zawieszeniem systemu, dlatego w przypadku V1 było to ograniczone do procesów uruchamianych przez administratora. Jakkolwiek Podman miał tę możliwość (tak samo jak Docker), to jednak była ona ograniczona do uruchamiania kontenerów z uprawnieniami administracyjnymi - tak samo jak w Dockerze. Od strony _zwykłego power usera_ będzie dawało to możliwość np uruchomienia aplikacji i określenia jej przydziału mocy obliczeniowej przy użyciu `--cpus=2 --memory=2g`, a przy tym kontener będzie uruchomiony z uprawnieniami zwykłego użytkownika. I będzie to dostępne nie tylko dla procesów uruchomionych w kontenerach, ale dla **wszystkich** procesów - da się powiedzieć np Chrome, że nie dostanie więcej niż 2 procesory i 2 GB RAM.

Będzie również możliwe użycie programu [crun](https://github.com/containers/crun) do uruchamiania kontenerów zamiast popularnego `runc`. Jako że jest napisany w C, można się spodziewać mniejszego obciążenia systemu hosta.

No i oczywiście nie będzie działał Docker. Ale czy naprawdę jest po czym płakać?

**Aktualizacja dzień później**: Docker 20.10 został wydany i znowu działa.

## Jak włączyć cgroups V2

Użytkownicy Fedory 31 (lub nowszej) nie muszą robić nic. A reszta?

Najpierw warto sprawdzić zalecane wersje pakietów systemowych:

-   jądro Linuksa w wersji 5.2 lub nowszej (jeden bardzo ważny kontroler cgroups został dodany w tej wersji)
-   `systemd` w wersji 226 lub nowszej

Wymagania te spełnia już Ubuntu 18.04.4 z jądrem HWE (5.3 z wydania 19.10, wymaga to sprawdzenia i [ewentualnej aktualizacji](https://wiki.ubuntu.com/Kernel/LTSEnablementStack#Ubuntu_18.04_LTS_-_Bionic_Beaver)). Od wydania 19.10 wszystkie pakiety systemowe w Ubuntu są w wymaganych wersjach.

Przełączenie na cgroups V2 dokonuje się przez podanie parametru uruchamiania jądra, który jest przekazywany do `systemd`. W Ubuntu robi się to przez dopisanie go w pliku `/etc/default/grub` i zaktualizowanie bootloadera poleceniem `update-grub`.

```ini
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash systemd.unified_cgroup_hierarchy=1"
```

Jeżeli mamy uruchomiony demon Dockera, to można go wyłączyć, żeby nie brudził w logach (bo i tak się nie uruchomi dopóki nie wyjdzie 20.10): `sudo systemctl stop docker && sudo systemctl disable docker`. W tym momencie pozostaje tylko `sudo update-grub && sudo reboot`. Po ponownym uruchomieniu będziemy już mieli cgroups V2.

```shell-session
$ podman info --debug
host:
  arch: amd64
  buildahVersion: 1.18.0
  cgroupManager: systemd
  cgroupVersion: v2
  conmon:
    package: 'conmon: /usr/libexec/podman/conmon'
    path: /usr/libexec/podman/conmon
    version: 'conmon version 2.0.20, commit: '
  cpus: 8
  distribution:
    distribution: ubuntu
    version: "20.04"
  eventLogger: journald
```

Żeby jako domyślny program uruchamiający kontenery użyć `crun`, to najlepiej jest skonfigurować to sobie na koncie użytkownika.

```shell-session
$ cp -v /etc/containers/containers.conf .config/containers/
'/etc/containers/containers.conf' -> '.config/containers/containers.conf'
```

W tymże pliku trzeba w sekcji "Default OCI runtime" odkomentować linijkę `runtime` i zmienić jej wartość na `"crun"`, a następnie w tabeli `engine.runtimes` poniżej odkomentować listę ścieżek dla `crun`. I gotowe.

I to jest dopiero XXI wiek.

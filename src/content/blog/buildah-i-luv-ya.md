---
title: Buildah, I luv ya
author: Jarek
pubDate: 2020-12-03T14:04:00
tags:
    - kontenery
    - programowanie
    - podman
description: Buildah może dziwnie się nazywa, ale jest bardzo wygodnym narzędziem do budowania obrazów kontenerów na Linuksie.
---

Niedawno napisałem parę ciepłych słów o programie [Podman](https://github.com/containers/podman) wyrażając nadzieję, że zyska na popularności. Dziś będzie o towarzyszącym mu programie [Buildah](https://github.com/containers/buildah), który służy do budowania obrazów kontenerów. Jest on wykorzystywany wewnętrznie w poleceniu `podman build`, ale jego samodzielne użycie bardzo się różni od tego, do czego przyzwyczaił nas Docker, a co również oferuje Podman w ramach utrzymywania zgodności z Dockerem.

![Tykocin](https://i.imgur.com/LbPDzfmh.jpg)

Docker (a za nim i Podman) do budowania obrazów kontenerów używa specjalnego języka opisu kontenera (DSL - domain specific language), w którym pisze się [Dockerfile](https://docs.docker.com/engine/reference/builder/). Nie jest on bardzo skomplikowany, ale ma różne idiosynkrazje, a jego możliwości są dość ograniczone. Część tych ograniczeń wynika z modelu uruchamiania kontenerów przez Dockera (uruchomiony na koncie roota demon który wszystko robi na zlecenie klienta). Podman ograniczenia związanego z modelem uruchamiania nie ma, ale nadal posługuje się DSL Dockerfile by zachować zgodność interfejsu użytkownika z Dockerem. _Pod spodem_ natomiast samo budowanie obrazu wykonuje Buildah.

Buildah oczywiście potrafi zbudować obraz na podstawie Dockerfile, wystarczy użyć jego polecenia `bud` (_build using dockerfile_), ale nie to jest w tym programie interesujące. Żeby zaznać _prawdziwego mięsa_ spójrzmy najpierw na dostępne polecenia:

```shellsession
$ buildah --help
A tool that facilitates building OCI images

Usage:
  buildah [flags]
  buildah [command]

Available Commands:
  add         Add content to the container
  bud         Build an image using instructions in a Dockerfile
  commit      Create an image from a working container
  config      Update image configuration settings
  containers  List working containers and their base images
  copy        Copy content into the container
  from        Create a working container based on an image
  help        Help about any command
  images      List images in local storage
  info        Display Buildah system information
  inspect     Inspect the configuration of a container or image
  login       Login to a container registry
  logout      Logout of a container registry
  manifest    Manipulate manifest lists and image indexes
  mount       Mount a working container's root filesystem
  pull        Pull an image from the specified location
  push        Push an image to a specified destination
  rename      Rename a container
  rm          Remove one or more working containers
  rmi         Remove one or more images from local storage
  run         Run a command inside of the container
  tag         Add an additional name to a local image
  umount      Unmount the root file system of the specified working containers
  unshare     Run a command in a modified user namespace
  version     Display the Buildah version information
```

Oprócz kilku poleceń do administracji artefaktami mamy też takie, które obcykanym z Dockerfile'ami wyglądają znajomo: `add`, `copy`, `from` i `run`. Robią one dokładnie to samo, co `ADD`, `COPY`, `FROM` i `RUN` w Dockerfile, jednak są wykonywane w lokalnej powłoce systemu operacyjnego. Polecenie `config` przyjmuje parametry, które odpowiadają poleceniom konfiguracyjnym w Dockerfile, np `--env` odpowiada `ENV`, `--cmd` odpowiada `CMD` i dalej podobnie. Uruchamiając poszczególne polecenia Buildah przyrostowo buduje kontener roboczy, który w dowolnej chwili można uruchomić dla sprawdzenia jego poprawnego działania, a na końcu przy użyciu polecenia `commit` jest z niego tworzony docelowy obraz.

Co więcej, używając polecenia `mount` można zamontować lokalnie wewnętrzny system plików kontenera i sprawdzić jego zawartość. Można również dowolnie na tym systemie plików operować z poziomu lokalnej powłoki, na przykład zamiast uruchamiać `buildah copy` można wykonać zwykłe `cp`, a zamiast `buildah run rm` zwykłe `rm`.

Teraz słówko o budowaniu w trybie _rootless_, czyli z konta zwykłego użytkownika. Aby w takim trybie wykonać polecenie (np. uruchomić jakiś program) w kontekście użytkownika **wewnątrz** kontenera, trzeba wykonać polecenie `buildah unshare`, które najpierw [izoluje zasoby w kontekście użytkownika](https://man7.org/linux/man-pages/man2/unshare.2.html), a dzięki temu daje możliwość ograniczenia kontekstu do [prywatnej przestrzeni zasobów użytkownika](https://man7.org/linux/man-pages/man7/user_namespaces.7.html) (_user namespace_). Dotyczy to również operacji lokalnego montowania systemu plików kontenera. Jakkolwiek jest możliwe wykonywanie tego typu operacji w trybie interaktywnym, to jeżeli zachodzi taka konieczność najlepiej będzie zapisać je w postaci zwykłego skryptu powłoki i zmienić kontekst dla całego skryptu, na przykład:

```shellsession
$ buildah unshare ./my-image.sh
<long image hash>
```

## Przykładowy skrypt budowania obrazu

Żeby nie snuć opowieści o żelaznym wilku weźmy sobie do przeanalizowania przykładowy skrypt budowania obrazu aplikacji webowej we Flasku.

Najpierw trochę administracji i przygotowanie artefaktu. Od użytkownika trzeba pobrać nazwę docelowego obrazu (z ewentualnym tagiem) oraz zbudować paczkę dystrybucyjną aplikacji.

```bash
#! /bin/bash

set -euo pipefail

# get image and tag from command line
imagetag="${1:?Usage: image name and tag required}"

# build application package
rm -rf build dist
python3 setup.py bdist_wheel
```

W tym momencie wszystko już mamy gotowe i można zacząć budować kontener. Pierwszym poleceniem w Dockerfile jest `FROM`, które określa na bazie jakiego obrazu będzie budowany nasz kontener. Nie inaczej jest i w przypadku Buildah. Na wypadek inaczej skonfigurowanego rozwiązywania nazw obrazów przez domyślny rejestr najlepiej jest podawać pełną nazwę obrazu. Polecenie `buildah from` zwraca identyfikator kontenera roboczego, będzie on nam potrzebny w dalszej części, więc dobrze jest go sobie zapisać do zmiennej.

```bash
# create working container
cnt=$(buildah from "docker.io/library/python:3.8-slim-buster")
```

(Oczywiście można zbudować kontener i obraz _od zera_ podobnie jak w Dockerze, ale tym zajmiemy się przy innej okazji.)

Jak już mamy ten identyfikator, to możemy na przykład ustawić zmienną środowiskową dla procesu uruchamianego w kontenerze.

```bash
# set environment variable for Flask
buildah config --env FLASK_ENV=production ${cnt}
```

Teraz będziemy dodawać zawartość do kontenera i uruchamiać w nim programy, więc dla uproszczenia zamontujemy sobie główny system plików kontenera. Polecenie `buildah mount` zwraca lokalną ścieżkę do punktu montowania, którą również zapiszemy sobie do zmiennej.

```bash
# mount container root directory
mnt=$(buildah mount ${cnt})
```

Od tego momentu możemy operować na zamontowanym systemie plików tak jak na lokalnym. Obydwa polecenia poniżej są wykonywane w lokalnej powłoce, ale zmieniają zawartość systemu plików kontenera.

```bash
# create directory for application assets
mkdir -p ${mnt}/opt/app
# copy build artifact to container
cp dist/simple_app*.whl ${mnt}/opt/app/
```

Odpowienikiem polecenia `RUN` z Dockerfile jest `buildah run`, jednak nie trzeba na siłę wszystkich operacji upychać w jedno polecenie.

```bash
# create virtualenv; install tools, application and gunicorn
buildah run ${cnt} /usr/local/bin/python3.8 -m venv /opt/app/venv
buildah run ${cnt} /opt/app/venv/bin/python3 -m pip install -U pip wheel Cython gunicorn
buildah run ${cnt} /opt/app/venv/bin/python3 -m pip install -U simple_app --find-links=/opt/app
```

Aplikacja zainstalowana, trzeba tylko ustawić domyślne polecenie dla uruchamianego kontenera.

```bash
# copy application entrypoint to container
cp scripts/app/entrypoint.sh ${mnt}/opt/app/entrypoint.sh
buildah config --cmd '[ "/opt/app/entrypoint.sh" ]' ${cnt}
```

I na koniec sprzątanie oraz zapisanie obrazu pod nazwą (i ewentualnie tagiem) pobraną od użytkownika na samym początku. Opcja `--rm` w `buildah commit` usuwa kontener roboczy na zakończenie pracy.

```bash
# clean up and commit image
rm -rf build dist ${mnt}/opt/app/*.whl
buildah umount ${cnt}
buildah commit --rm ${cnt} ${imagetag}
```

Obraz został zbudowany i Podman na jego podstawie będzie w stanie uruchomić kontener z aplikacją. Aby mógł go uruchomić Docker trzeba zrobić czujny `buildah push` do lokalnego demona Dockera, tego samego `push` używa się do _wypchnięcia_ obrazu do rejestru.

```shellsession
$ buildah images
REPOSITORY                      TAG               IMAGE ID       CREATED         SIZE
localhost/simpleapp-app         1.0.0             e12738e5845e   2 hours ago     166 MB
```

Powiedzmy sobie szczerze, zakochałem się od pierwszego wejrzenia.

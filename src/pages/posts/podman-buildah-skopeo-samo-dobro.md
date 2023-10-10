---
title: Podman, Buildah, Skopeo - same dobre rzeczy
author: jarek
date: 2020-12-05T19:03:00
tags:
  - kontenery
  - programowanie
  - podman
description: Im dłużej używam Podmana i Buildah tym bardziej mi się te narzędzia podobają. Co fajnego mają?
---

Mija tydzień odkąd zacząłem używać Podmana i Buildah na poważnie. Podoba mi się coraz więcej rzeczy, choć dostrzegam również pewne braki. To będzie kolejny artykuł, który będzie WIP, bo zamierzam zebrać te wszystkie fajne rzeczy, które Podman i Buildah wniosły w moje programistyczne życie. Po kolei, każda z omówieniem.

->![Armenia](https://i.imgur.com/PKhDCsuh.jpg)<-

<!-- more -->

## Podman, rootless

Dla mnie to jest właśnie najważniejsze - Podman nie wymaga uprawnień administracyjnych dla użytkownika, który będzie uruchamiał kontener. Wynika to z odmiennego modelu wykonywania (typowy `fork` procesu, a nie *klient-serwer* jak w przypadku Dockera) oraz czujnego użycia [przestrzeni nazw użytkownika](https://www.man7.org/linux/man-pages/man7/user_namespaces.7.html), co w sumie daje coś, co rozwiązuje bardzo wiele problemów, na jakie natyka się każdy, kto uruchamia kod w kontenerach.

W przypadku Dockera źródłem problemu jest `containerd`, czyli proces serwera, który jest uruchomiony *na roocie*, a klient, który komunikuje się z serwerem przez plik gniazda - również musi być uruchamiany przez roota (grupa `docker` efektywnie daje wszystkie uprawnienia administracyjne). Żaden problem na laptopie developera, ale na produkcji?

Proponuję mały teścik. Proszę sobie uruchomić kontener z Busyboxem:

```shell-session
$ podman run --rm -ti -v .:/output docker.io/library/busybox
# id
uid=0(root) gid=0(root) groups=10(wheel)
# echo "test" > /output/test.txt
```

Jak widać, w kontenerze jestem rootem. A kto jest właścicielem nowo utworzonego pliku na hoście?

```shell-session
$ ls -la test.txt
-rw-r--r-- 1 jazg jazg 5 gru  5 19:59 test.txt
```

Tadam! Czy nie o tym właśnie marzył każdy, komu kod odpalony pod Dockerem [wyprodukował pliki, których właścicielem był root](https://vsupalov.com/docker-shared-permissions/) (na przykład niedostępne artefakty testów pod Jenkinsem)? Oto właśnie problem znika *w chmurce dymu* - to co się dzieje w kontenerze pozostaje w kontenerze, a na zewnątrz właścicielem procesu jestem ja i ostatecznie to ja jestem właścicielem wszystkiego u siebie. **Tak powinno być w każdym domu**.

Zaraz, upewnijmy się jak to wygląda w kontenerze.

```shell-session
$ podman run --rm -ti -v .:/output docker.io/library/busybox
# ls -la /output/test.txt
-rw-r--r--    1 root     root             5 Dec  5 18:59 /output/test.txt
```

Wygląda dokładnie tak, jak powinno wyglądać, właśnie *o to chodziło w tych całych kontenerach* od samego początku, żeby nam nie przeciekało między środowiskami, ale dopiero teraz naprawdę nie przecieka, a nie *zwłaszcza, że prawie w ogóle nie padało*.

-><iframe width="560" height="315" src="https://www.youtube.com/embed/Arm4KHGObiI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><-

Choćby z tego tylko powodu Podman wart jest zainteresowania, a to przecież tylko wisienka na czubku tortu *rootless*. Tym, co niezauważalne, a wyjątkowo ważne - jest bezpieczeństwo. Nawet w trybie `privileged` kod w kontenerze [nie będzie mógł zrobić więcej](https://www.redhat.com/sysadmin/privileged-flag-container-engines), niż właściciel procesu uruchamiającego kontener (choć cały czas dużo, a nawet zazwyczaj za dużo). Istnieją powody aby uruchomić kontener w trybie `privileged`, ale przez lata używania kontenerów tylko raz musiałem to zrobić, a przypadek był bardzo szczególny (aplikacja uruchomiona na izolowanym urządzeniu wymagała pełnego dostępu do podsystemu USB na poziomie sprzętowym). Internet jest pełen [mrożących](https://blog.trailofbits.com/2019/07/19/understanding-docker-container-escapes/) [krew](https://capsule8.com/blog/practical-container-escape-exercise/) [w żyłach](https://www.redtimmy.com/a-tale-of-escaping-a-hardened-docker-container/) opowieści o [ucieczkach z kontenera](https://unit42.paloaltonetworks.com/breaking-docker-via-runc-explaining-cve-2019-5736/). Dlatego uruchamianie kontenerów w trybie *rootless* jest tak ważnym dodatkiem, i choć nie widać go z punktu siedzenia developera aplikacji, to ops napewno to doceni.

Czy to znaczy, że można przestać kombinować z uruchamianiem procesu z konta zwykłego użytkownika *wewnątrz kontenera*? Jak sytuacja wygląda w takim przypadku? Może to nie jest już dłużej potrzebne?

Jeżeli uruchomimy w trybie *rootless* kontener w którym proces jest uruchomiony z roota, efekt będzie taki, jak powyżej, proces będzie rootem w kontenerze, ale zwykłym użytkownikiem na hoście. A jak to zrobić, żeby proces był *mną*?

```shell-session
$ id
uid=1000(jazg) gid=1000(jazg)
$ podman run -ti --rm --userns keep-id --user $(id -u):$(id -g) docker.io/library/busybox
$ id
uid=1000(jazg) gid=1000(jazg)
```

Ma to pewne ograniczenia, na przykład system plików w kontenerze jest efektywnie tylko do odczytu, więc jedynym sposobem by zapisać jakiś artefakt jest zamontować z hosta wolumin. Zostanie on w kontenerze zamontowany z pełnymi uprawnieniami użytkownika uruchamiającego proces.

```shell-session
$ podman run -ti --rm --userns keep-id --user $(id -u):$(id -g) -v .:/opt/app docker.io/library/busybox
$ echo "test" > /opt/app/t1.txt
$ cat /opt/app/t1.txt
test
$ ls -la /opt/app/t1.txt
-rw-r--r--    1 jazg     jazg             5 Dec  6 20:06 /opt/app/t1.txt
```

A co się stanie w przypadku, gdy proces w kontenerze jest uruchomiony przez zwykłego użytkownika? Przygotowałem sobie taki obraz:

```bash
#! /bin/bash

set -euo pipefail

cnt=$(buildah from "docker.io/library/busybox")

buildah run ${cnt} addgroup -S app
buildah run ${cnt} adduser -S -H -D -G app app

buildah run ${cnt} mkdir -p "/opt/app/test"
buildah run ${cnt} chown -R app:app /opt/app

buildah config \
    --user app:app \
    --workingdir /opt/app \
    --volume "/opt/app/test" \
    ${cnt}

buildah commit --rm ${cnt} "quay.io/zgoda/test:1.0.0"
```

Efekt nie jest powalający.

```shell-session
$ podman run -ti --rm -v .:/opt/app/test quay.io/zgoda/test:1.0.0
$ ls -la
total 12
drwxr-xr-x    3 app      app           4096 Dec  6 19:36 .
drwxr-xr-x    3 root     root          4096 Dec  6 19:36 ..
drwxrwxr-x    3 root     root          4096 Dec  6 19:52 test
$ echo "test" > test/t1.txt
sh: can't create test/t1.txt: Permission denied
```

Ups, wolumin został zamontowany z rootem jako właścicielem. Proces w kontenerze może sobie pisać w swoim katalogu, ale do woluminu nie ma uprawnień. Niezbyt to przydatne. Czy coś można z tym zrobić? Podanie trybu `rw` przy montowaniu nic nie zmienia. No to teraz będzie ta skomplikowana część.

Spójrzmy najpierw kim jest nasz użytkownik w kontenerze.

```shell-session
$ podman run -ti --rm -v .:/opt/app/test quay.io/zgoda/test:1.0.0
$ id
uid=100(app) gid=101(app)
```

Na hoście mam `uid=1000` i `gid=1000` (widać to w jednym z wcześniejszych przykładów), a `uid=100` jest przypisane do użytkownika `systemd-network`, więc odpada zmiana na żywca. Trzeba zmienić właściciela na na użytkownika z tymi `uid` i `gid` w **mojej przestrzeni nazw**. Do tego używa się `unshare`, a efekt będzie zgodny z tabelą mapowania w `/proc/self/uid_map`.

```shell-session
$ podman unshare cat /proc/self/uid_map
         0       1000          1
         1     100000      65536
$ podman unshare chown 100:101 ./v1
$ ls -la ./v1
razem 8
drwxrwxr-x 2 100099 100100 4096 gru  6 21:53 .
drwxrwxr-x 3 jazg   jazg   4096 gru  6 20:52 ..
$ podman run -ti --rm -v ./v1:/opt/app/test quay.io/zgoda/test:1.0.0
$ ls -la
total 12
drwxr-xr-x    3 app      app           4096 Dec  6 19:36 .
drwxr-xr-x    3 root     root          4096 Dec  6 19:36 ..
drwxrwxr-x    2 app      app           4096 Dec  6 20:53 test
$ echo "test" > test/t1.txt
$ ls -la test/t1.txt
-rw-r--r--    1 app      app              5 Dec  6 20:57 test/t1.txt
```

Tyle przynajmniej się udało, ale zaraz, kto jest właścicielem tego artefaktu?

```shell-session
$ ls -la v1/
razem 20
drwxrwxr-x 2 100099 100100 4096 gru  6 21:57 .
drwxrwxr-x 3 jazg   jazg   4096 gru  6 20:52 ..
-rw-r--r-- 1 100099 100100    5 gru  6 21:57 t1.txt
$ rm -rf v1/t1.txt
rm: nie można usunąć 'v1/t1.txt': Brak dostępu
```

Wracamy do punktu wyjścia, a właściwie do tego samego rozwiązania, które zastosowaliśmy wcześniej uruchamiając kontener *rootfull*.

```shell-session
$ podman run -ti --rm --userns keep-id --user $(id -u):$(id -g) -v ./v1:/opt/app/test quay.io/zgoda/test:1.0.0
$ id
uid=1000(jazg) gid=1000(jazg)
$ ls -la
total 12
drwxr-xr-x    3 app      app           4096 Dec  6 19:36 .
drwxr-xr-x    3 root     root          4096 Dec  6 19:36 ..
drwxrwxr-x    2 jazg     jazg          4096 Dec  6 21:02 test
$ echo "test" > test/t1.txt
$ ls -la test/t1.txt
-rw-r--r--    1 jazg     jazg             5 Dec  6 21:03 test/t1.txt
```

Sytuacja patowa, ale chyba już mogę sobie pozwolić na konkluzję. Tak naprawdę w przypadku uruchamiania kontenerów z konta zwykłego użytkownika nie ma żadnego znaczenia, czy proces wewnątrz kontenera działa na roocie czy na zwykłym użytkowniku. Żeby mieć w miarę *naturalny* dostęp do własnych zasobów w kontenerze wygodniej jest mieć proces z roota, ale przy uruchomieniu na zwykłym użytkowniku będzie to działać tak samo.

*Rootless* to fajna rzecz, ale wymaga nieco przemyślenia, nie da się tak zmapować Dockerfile jeden do jednego. Uruchamianie kontenerów w kontekście zwykłego użytkownika jest całkowicie nową sytuacją i trzeba się do niej dostosować. Jeszcze nie jestem pewien jak to zrobić, żeby obraz był *w miarę bezpieczny* zarówno podczas uruchomienia z roota (przez Dockera) jak i z normalnego użytkownika (Podman rootless), a jednocześnie żeby *było dobrze*, ale myślę nad tym intensywnie. Będzie jeszcze klika testów.

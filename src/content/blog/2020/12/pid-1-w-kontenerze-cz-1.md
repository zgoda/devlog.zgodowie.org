---
title: PID 1 w kontenerze - cz. 1
author: Jarek
pubDate: 2020-12-11T13:42:00
tags:
    - kontenery
    - python
    - linux
description: Uruchomienie procesu w kontenerze jest proste, ale zakończenie go nie zawsze jest takie łatwe, jeżeli chce się to zrobic czysto i odpowiedzialnie.
imageUrl: https://i.imgur.com/SEklf7qh.jpg
isTechRelated: true
---

## Pan nie wiesz z kim pan mnie mylisz

Uruchomienie procesu w kontenerze tylko z grubsza przypomina to w _zwykłym systemie_, ponieważ nie ma tam jednego ważnego elementu - systemowego zarządcy procesów. Normalnie jest nim `/sbin/init`, proces z PID 1, którego potomkami są wszystkie pozostałe procesy. W kontenerze PID 1 nie należy do zarządcy tylko do uruchomionej aplikacji, a przy pewnej dozie nieuwagi będzie on należał do jakiegoś łachmyty.

![Logs](https://i.imgur.com/SEklf7qh.jpg)

W części 1 przyjrzymy się kto jest numerem 1 w naszej beczce śledzi.

Wszystkie przytoczone tutaj przykłady znajdują się w [repozytorium na Githubie](https://github.com/zgoda/pid-one). Do ich zbudowania będzie potrzebny program [Buildah](https://github.com/containers/buildah), a do uruchomienia jakiś program zarządzający kontenerami (polecam [Podman](https://github.com/containers/podman)).

Proces `init`, który ma PID 1 bo jest pierwszym uruchamianym w _userlandzie_ podczas bootowania systemu, jest bezpośrednim lub pośrednim rodzicem wszystkich innych procesów. Działa on przez cały czas dopóki system nie zostanie wyłączony, a z byciem najbardziej eksponowanym jako Numero Uno łączy się również poważnych obowiązków:

-   kontrola życia procesów potomnych
-   przejmowanie kontroli nad procesami osieroconymi
-   przekazywanie do procesów potomnych sygnałów

To wszystko dzieje się poza zasięgiem wpływu programisty aplikacji, ponieważ systemowy zarządca procesów jest dostarczany wraz z systemem, a obecnie tę rolę zazwyczaj pełni `systemd`.

Sytuacja zmienia się diametralnie w kontenerze. Kontener posiada swoją własną pulę identyfikatorów procesów, a PID 1 otrzymuje w nim proces, który w kontenerze zostanie uruchomiony jako pierwszy. W tym miejscu odrobina nieuwagi może spowodować, że proces aplikacji wcale nie będzie miał PID 1 i wszystkie wysiłki jakie włożymy w to, by być odpowiedzialnym rodzicem procesów-dzieci pójdą w pioch, bo rodzicem okaże się jakiś włóczęga.

### Idziemy _na rympał_

Aplikacja którą będziemy uruchamiać jest świadoma swojego PID i wypisze nam również linię poleceń uruchamiającą proces o PID 1. Budujemy obraz i uruchamiamy go.

```shellsession
$ images/simple.sh
cf9f286b1ae71d96713a025627921a101fd3496689cd0fb18248ade6c701b215
41be248df9eb6dd4c5461bff77e6fdeb5f88f0d7c96adb862ae9ffac01d61eda
Getting image source signatures
Copying blob f5600c6330da skipped: already exists
Copying blob f5cddeb4127d skipped: already exists
Copying blob 0c5974471779 skipped: already exists
Copying blob defb98848917 skipped: already exists
Copying blob a2518c1b07fd [--------------------------------------] 0.0b / 0.0b
Copying blob 1e277f8db083 [--------------------------------------] 0.0b / 0.0b
Copying config 4309ccb180 done
Writing manifest to image destination
Storing signatures
4309ccb180751d2c52e28f9a34d360c8ab0599e831818e7c09050e912be8b243
$ podman image ls
REPOSITORY                 TAG              IMAGE ID      CREATED         SIZE
quay.io/zgoda/test         latest           4309ccb18075  52 seconds ago  118 MB
docker.io/library/python   3.8-slim-buster  538dfc7591fb  7 days ago      118 MB
$ podman run -ti --rm quay.io/zgoda/test
I am PID 2, PID 1 is /bin/bash /entrypoint-simple.sh mypid.py
```

Ha! Rodzicem wszystkich procesów jest powłoka systemowa, która uruchomiła skrypt, będący _entrypointem_ kontenera. Taki skrypt jest to często stosowana praktyka gdy trzeba coś zrobić przed uruchomieniem zasadniczego programu, np upewnić się że zasoby są dostępne lub środowisko poprawnie skonfigurowane. Oto jak przedstawia się ten skrypt:

```bash
#! /bin/bash

set -euo pipefail

/usr/local/bin/python3 "$@"
```

Co prawda nic specjalnego nie robi - ale przecież mógłby np ustawić `locale` lub strefę czasową, przekierować wyjście programu zasadniczego lub sprawdzić czy serwer bazy danych żyje. Systemowym Pythonem uruchamiamy naszą aplikację, ale sam skrypt zostaje uruchomiony przez powłokę, która w tym momencie jest pierwszym procesem uruchomionym w kontenerze i ma PID 1. Wszelkie sygnały będą docierać do procesu powłoki, który na nie zareaguje, ale nic z nimi więcej nie zrobi. Nasza aplikacja może zostać zabita w sposób brutalny, zza węgła i w ogóle nóż w plecy.

Aby się z tego ambarasu wykaraskać wystarczy użyć w skrypcie polecenia `exec`. W skrócie proces tak uruchomiony zastępuje proces rodzica i w ten sposób aplikacja będzie już miała PID 1.

```shellsession
$ cat scripts/entrypoint-exec.sh
#! /bin/bash

set -euo pipefail

exec /usr/local/bin/python3 "$@"
$ images/simple-exec.sh
cf9f286b1ae71d96713a025627921a101fd3496689cd0fb18248ade6c701b215
1c649df0fb377f297a322fc27f7c0d8b0c8cbf588dab40751ff32099182e1cab
Getting image source signatures
Copying blob f5600c6330da skipped: already exists
Copying blob f5cddeb4127d skipped: already exists
Copying blob 0c5974471779 skipped: already exists
Copying blob defb98848917 skipped: already exists
Copying blob a2518c1b07fd skipped: already exists
Copying blob 0df52473ff99 done
Copying config af2db6defa done
Writing manifest to image destination
Storing signatures
af2db6defabd49990972dd68d9fc136224153a2a2ad4c842c0a216abbce20205
$ podman run -ti --rm quay.io/zgoda/test
I am PID 1, PID 1 is /usr/local/bin/python3 mypid.py
```

Tak się zaczyna być odpowiedzialnym rodzicem w kontenerze.

### Mały przerywnik dla użytkowników Dockera

Użytkownicy Dockera, którzy obrazy swoich kontenerów definiują przy użyciu Dockerfile, mają do wyboru [dwie formy poleceń `CMD` i `ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#cmd): formułę powłoki (`shell`) i formułę `exec`. Różnica między nimi jest taka, że polecenie w formule powłoki uruchamia się przez uruchomienie domyślnej powłoki systemu i dopiero w tym środowisku jest uruchamiane polecenie będące argumentem `CMD`. W formule `exec` argumenty są przekazywane do polecenia `exec`. Pod paroma względami przypomina to sytuację jaką mieliśmy w przykładzie skryptu uruchamiającego powyżej.

```dockerfile
CMD /usr/local/bin/python3 /mypid.py
CMD [ "/usr/local/bin/python3", "/mypid.py" ]
```

W katalogu `scripts` w repozytorium są 2 skrypty budujące obraz, które wykorzystują te obie formuły. Uruchomienie kontenerów z tych obrazów przy użyciu Podmana daje identyczny wynik w obu przypadkach (program uruchomiony w kontenerze ma PID 1), jednak gdy zostaną one zdefiniowane przy użyciu Dockerfile i zbudowane przez Dockera, wyniki będą odmienne (w przypadku definicji w formule powłoki program uruchomiony w kontenerze będzie miał PID 2).

### Konsekwencje mogą być poważne

W Pythonie jako obsługę zakończenia wykonania programu można wykorzystać moduł `atexit`, jak i standardową obsługę sygnałów z modułu `signal` - każdy z tych sposobów ma nieco inne zastosowanie, a funkcja obsługi jest wykonywana w nieco innym momencie. Spójrzmy na przykładowy kod:

```python
import atexit
import signal
import sys
import time


def bye():
    print('End of the world')


def signal_handler(signum, stack):
    print(f'Got signal {signum}, I have to go')
    time.sleep(2)
    print('All cleaned up, bye')
    sys.exit(0)


def main():
    print('I am at your service')
    time.sleep(1)
    while True:
        print('Working hard for 2 seconds')
        time.sleep(2)


if __name__ == '__main__':
    atexit.register(bye)
    signal.signal(signal.SIGTERM, signal_handler)
    main()
```

Mamy tu zarówno `atexit` jak i obsługę sygnału `SIGTERM`. Jeżeli uruchomimy sobie kontener z tym programem a w drugim terminalu wydamy polecenie `podman kill --signal TERM cnt1`, to zobaczymy mniej-więcej coś podobnego:

```shellsession
$ podman run -ti --rm --name cnt1 quay.io/zgoda/test
I am at your service
Working hard for 2 seconds
Working hard for 2 seconds
Working hard for 2 seconds
Got signal 15, I have to go
All cleaned up, bye
End of the world
```

Program otrzymał sygnał `TERM`, obsłużył go i ostatecznie zakończył działanie. Funkcja zarejestrowana w `atexit` wykonała się na zakończenie działania maszyny wirtualnej interpretera. Tak to powinno wyglądać.

A co się stanie, jeżeli nasz program nie będzie miał PID 1 dlatego, że zostanie uruchomiony przez powłokę?

```shellsession
$ podman run -ti --rm --name cnt1 quay.io/zgoda/test
I am at your service
Working hard for 2 seconds
Working hard for 2 seconds
^CTraceback (most recent call last):
  File "/with_atexit.py", line 29, in <module>
    main()
  File "/with_atexit.py", line 23, in main
    time.sleep(2)
KeyboardInterrupt
End of the world
```

Program w ogóle nie zareagował na wysłany sygnał `TERM`, bo ten do niego nie dotarł - został skonsumowany przez proces powłoki który radośnie się zakończył, a nasz proces został zombie. Zatrzymał go dopiero `KeyboardInterrupt`, obsłużony przez CLI Podmana, które wysłało go do wszystkich procesów uruchomionych w zarządzanym interaktywnie kontenerze (`-ti`). Jeżeli kontener zostanie zatrzymany przy użyciu sygnału `KILL` (uwaga, jest to domyślny sygnał wysyłany przez `podman kill`, w odróżnieniu od systemowego `kill`, który wysyła sygnał `TERM`!), to oczywiście program również umrze, lecz będzie to śmierć gwałtowna i niespodziewana.

```shellsession
$ podman run -ti --rm --name cnt1 quay.io/zgoda/test
I am at your service
Working hard for 2 seconds
Working hard for 2 seconds
```

Był proces i nie ma, nie wykonało się nawet `atexit`. Oczywiście, nie da się obsłużyć sygnału `SIGKILL`, bo oznacza on natychmiastowe i bezwarunkowe przerwanie wykonania, bez żadnego _ale_.

Na razie zobaczyliśmy co się może stać, jeżeli prosty program o jednowątkowym modelu wykonania nie zostanie uruchomiony jako kontroler procesów w kontenerze. W następnych odcinkach zobaczymy sytuacje naprawdę mrożące krew w żyłach, bo na scenie tej jatki procesów pojawią się dzieci.

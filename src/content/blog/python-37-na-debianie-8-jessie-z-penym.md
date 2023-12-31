---
title: 'Python 3.7 na Debianie 8 (Jessie) z pełnym SSL'
pubDate: 2018-12-24T13:43:00.001+01:00
tags:
    - arm
    - sbc
    - ssl
    - linux
    - python
author: Jarek
description: Dłubian
isTechRelated: true
---

Jakkolwiek wszyscy dobrze wiedzą, że Debian Jessie to jest staroć i w ogóle nikt go nie używa, to czasem jest potrzeba odpalić nowego Pythona (3.7 oraz nowszy) na takim archaicznym systemie. Problem jest taki, że ten stary Debian ma stare OpenSSL, z którym Python 3.7 nie gada. Nie ma rady, trzeba sobie zmielić nowe libssl i nowego Pythona.

Jak to zwykle w internecie, na ten temat można znaleźć _pińcet_ recept, każdy z autorów zarzeka się, że tylko jego sposób działa, a wszyscy pozostali to hochsztaplerzy. Tymczasem na świeżo mogę napisać, co działa na Armbianie Jessie z jądrem 3.4. Obie zabawki budowane były _na miejscu_, czyli na komputerku klasy SBC z procesorem Allwinner H3 i 512MB RAM. Decyzja o budowaniu na miejscu zapadła jak zobaczyłem jakiej gimnastyki wymaga _budowanie krzyżowe_ Pythona, np. na `x86_64` dla ARMv7. Tak że jakoś przeżyjemy. Jak również spróbowałem zbudować sobie zarówno OpenSSL 1.1.1, jak i LibreSSL 2.9.0 - ostatecznie wybrałem to drugie. Proces budowania jest jakiś taki _normalniejszy_. LibreSSL trzeba sobie pobrać z _release tag_ na GitHubie z repo portable.

No to jedziemy - trzeba sobie ściągnąć i rozpakować źródła w bezpiecznym miejscu, oraz zadbać o podstawowe zależności, czyli `build-essential`. Dodatkowo LibreSSL będzie potrzebowało `libtool`. Do Pythona to już co kto będzie potrzebował, rozsądne minimum to `libsqlite3-dev`. Zaczynamy jednakowoż od LibreSSL:

```shell
./autogen.sh
```

Po chwili autotools przygotuje wszystko co trzeba do konfiguracji i budowania, a teraz przychodzi moment bardzo ważnej decyzji - trzeba wybrać _prefix_ instalacji. Może jestem zboczony, ale takie rzeczy u mnie lądują w /opt, przede wszystkim po to, żeby łatwo było się ich pozbyć. Czyli:

```shell
./configure --prefix=/opt/libressl-2.9.0
```

Po paru minutach już można sobie zacząć budować to libssl, a że maszyneria to słabizna, w dodatku z wyjątkowo podłym sterowaniem częstotliwością rdzeni, to trzeba _z wolna i z ostrożna_:

```shell
screen -dmS libressl-build sh -c 'make -j3 -l2; exec bash'
```

Tylko z pasywnym chłodzeniem (aluminiowy radiator na procesorze) więcej się nie da. Próbowałem wielu kombinacji parametrów `-j` i `-l`, i dopiero ta nie powodowała przegrzania procesora; udaje się utrzymać temperaturę do 75°C. Więcej jednego lub drugiego i w trakcie budowania będzie reboot, a chyba nie o to nam chodzi.

Jak już się LibreSSL zbuduje, to czas na Pythona. Nie pamiętam ile razy próbowałem na ARM zbudować sobie wersję z włączonym LTO, ale za każdym razem budowanie kończy się _memory error_, więc jedyne co pozostaje to `--enable-optimizations`. Ale to jest prościzna, natomiast większym problemem jest jak tego naszego Pytonga pożenić z _kastomowym eseselem_? Skrypt konfiguracyjny ma opcję `--with-openssl` gdzie można podać ścieżkę do własnego libssl, ale to jest jakby za mało. Za mało, bo jakkolwiek Python się zbuduje, to się nie wykonają testy, bo linker nie znajdzie libssl. I tu z pomocą przychodzi `RPATH`. W skrócie opcja ta umożliwa linkowanie bibliotek ze stałego położenia, innego niż wskazane w `/etc/ld.so.conf`, jak również podawanego w  `LD_LIBRARY_PATH`. Żeby nam to zadziałało, trzeba to przekazać w zmiennej `LDFLAGS` ale jako opcja dla linkera, więc w trochę pokręconej formie:

```shell
export LDFLAGS="-Wl,-rpath,/opt/libressl-2.9.0/lib"
./configure --prefix=/opt/python-3.7.1 \
            --enable-optimizations \
            --with-openssl=/opt/libressl-2.9.0
screen -dmS py371-build sh -c 'make -j3 -l2; exec bash'
```

Po jakichś 2-3 godzinach powinno być gotowe. Jeżeli jednak procesor się przegrzał i nastąpił reboot, to trzeba wyczyścić katalog z artefaktów i całe budowanie rozpocząć od nowa - taka uroda PGO.

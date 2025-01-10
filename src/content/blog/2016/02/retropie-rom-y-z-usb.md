---
title: 'RetroPie, ROM-y z USB'
pubDate: 2016-02-18T11:23:00.000+01:00
tags:
    - retropie
    - pozapiwne
    - linux
description: Czujny reboot i można grać.
isTechRelated: true
imageUrl: https://storage.googleapis.com/public.zgodowie.org/images/rpie-tekken-1.png
---

Po wrzuceniu kilku ROM-ów na PSX okazało się, że karta SD z której bootuje się system jest za mała na to, żeby je tam trzymać. Inne opcje jakie przyszły mi do głowy to trzymać je na pendrive albo zamontować katalog z NAS po Sambie. W pomieszczeniu gdzie stoi telewizor WiFi działa co najwyżej jako-tako (nikt nie pomyślał o kablaturze podczas budowy...), więc na początek pójdzie 8GB pendrive. Powinno wystarczyć na parę dni.

## Albo rybka, albo pipka

RetroPie ma bardzo fajny ficzer [automatycznego transferu ROM-ów po podłączeniu storage do USB](https://github.com/RetroPie/RetroPie-Setup/wiki/Transferring-Roms#usb). Jakkolwiek bardzo miłe i user friendly, to zupełnie nie będzie przydatne w momencie, gdy będziemy tam trzymać ROM-y. W końcu jak będziemy chcieli sobie coś tam wgrać, to i tak trzeba będzie wyjąć pendrive i włożyć go ponownie. Zaczynamy więc od wyłączenia tego wodotrysku, odpalamy `retropie_setup.sh` i na ekranie głównym wybieramy "Setup / configuration", a następnie "USB ROM Service":

![Szot łan](https://storage.googleapis.com/public.zgodowie.org/images/rpie-romy-1.png 'USB config')

i dalej "Disable USB ROM Service":

![Szot tu](https://storage.googleapis.com/public.zgodowie.org/images/rpie-romy-2.png 'Wyłączenie usługi USB')

Wydaje mi się, że należałoby teraz zrestartować RPi, ale nie jestem pewien, YMMV. W każdym razie nie zaszkodzi.

## Move your precious assets

```shell
cp -r /home/pi/RetroPie/roms/* /media/usb/
```

To powinno wystarczyć za komentarz. Będzie trwało długo albo krótko, ale po chwili na USB będzie całe dobro. Tylko co z tego, skoro niedostępne? Próbowałem paru tricków, m.in. zmiany ścieżek do "systemu" w `$HOME/.emulationstation/es_systems.cfg`, ale tym co działa okazało się zrobienie symlinku `/media/usb` do `$HOME/RetroPie/roms`. Jeszcze tylko mała zmiana umask w ustawieniach usbmount (`/etc/usbmount/usbmount.conf`):

```ini
FS_MOUNTOPTIONS="-fstype=vfat,flush,gid=pi,dmask=0000,fmask=0000"
```

Czujny reboot i można grać. Na przykład w Tekken 3:

![Szot fri!](https://storage.googleapis.com/public.zgodowie.org/images/rpie-tekken-1.png 'Tekken 3!')

![Szot for!](https://storage.googleapis.com/public.zgodowie.org/images/rpie-tekken-2.png 'I znowu Tekken 3')

![Szot fajf!](https://storage.googleapis.com/public.zgodowie.org/images/rpie-tekken-3.png 'I jeszcze jeden z Tekken 3')

Ale coś mi się zdaje, że niedługo będę musiał obadać opcję montowania katalogu z NAS, bo 8GB pendrive na długo nie wystarczy, okazało się że znajomych z grami na PSX mam więcej niż się spodziewałem.

Mała uwaga na koniec - z symlinkowanym katalogiem nie działa fabryczny scraper, trzeba go sobie zaktualizować w `retropie_setup.sh`.

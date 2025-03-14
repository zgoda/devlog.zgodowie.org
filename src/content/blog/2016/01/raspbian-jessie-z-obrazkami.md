---
title: 'Raspbian Jessie, z obrazkami'
pubDate: 2016-01-22T00:16:00.000+01:00
tags:
    - sbc
    - pozapiwne
    - linux
description: Jak to teraz odpalić na moim starym RPi?
isTechRelated: true
imageUrl: https://storage.googleapis.com/public.zgodowie.org/images/rpi-z-obrazkami.jpg
---

Wymyśliłem sobie jedno zastosowanie w domu dla starego RPi B (bez plusa, 26-pin GPIO, 900MHz single core i 512MB RAM). Do tego jednak potrzebowałem jakiegoś wyświetlacza z panelem dotykowym. Przypadkiem wpadł mi w ręce taki jeden, 4 calowy, całkiem popularny. Okazja była, to wziąłem. No to jak to teraz odpalić na moim RPi?

Uczestnicy: Raspberry Pi B i [4" wyświetlacz 320x480px](http://www.waveshare.com/product/mini-pc/raspberry-pi/expansions/4inch-rpi-lcd-a.htm)
Początkowa inspiracja: [Juho Vähä-Herttua](http://futurice.com/blog/id-like-to-have-some-lcd-on-my-pi)  
System operacyjny: Raspbian Jessie

Posługując się oryginalnymi wskazówkami udało mi się uruchomić wszystko na Raspbianie Wheezy, ale to mnie nie zadowalało - potrzebowałem czegoś nowszego, z Qt 5.x. No to trzeba spróbować na Jessie. Zacznijmy od dupy strony, czyli najpierw w raspi-config włączymy sobie obsługę SPI. Będzie potrzebna, a później będzie przez to mniej pierdzielenia, taki jest plus spoilerów.

### Debian, you make me sick

Typowe rozwiązania problemów jak ładowanie modułów z /etc/modules okazały się przestarzałe i niegodne nowoczesnego Debiana 8.0 Jessie. Teraz moduły i owszem ładuje się z /etc/modules, ale parametry ustawia w odpowiednim pliku w katalogu /etc/modprobe.d. Ja to już widziałem, w Arch Linuksie, i to było złe. Przedostatni bastion rozumu i godności linuksiarza upadł wraz z Debianem Jessie (ostatni to Slackware i jak na razie trzyma się mocno). No ale wracajmy do adremu.

Już początek się nie zgadza - rpi-update z podanego repozytorium aktualizuje kernel do wersji starszej niż jest zainstalowana systemowo. WTF? A może wcale nie trzeba? No, wcale nie trzeba. Krok z aktualizacją jądra weg. I reboot też. Czyli że robimy sobie z terminala:

```shell
sudo modprobe flexfb nobacklight regwidth=16 init=-1,0xb0,0x0,-1,0x11,-2,250,-1,0x3A,0x55,-1,0xC2,0x44,-1,0xC5,0x00,0x00,0x00,0x00,-1,0xE0,0x0F,0x1F,0x1C,0x0C,0x0F,0x08,0x48,0x98,0x37,0x0A,0x13,0x04,0x11,0x0D,0x00,-1,0xE1,0x0F,0x32,0x2E,0x0B,0x0D,0x05,0x47,0x75,0x37,0x06,0x10,0x03,0x24,0x20,0x00,-1,0xE2,0x0F,0x32,0x2E,0x0B,0x0D,0x05,0x47,0x75,0x37,0x06,0x10,0x03,0x24,0x20,0x00,-1,0x36,0x28,-1,0x11,-1,0x29,-3 width=480 height=320

sudo modprobe fbtft_device name=flexfb speed=16000000 gpios=reset:25,dc:24
```

Jak zadziałało i ekranik przestał być biały/jasno-szary, to znaczy że wszystko działa. Thank you Debian for fucking nothing. Reszta powinna ruszyć wg oryginalnej instrukcji z wyjątkiem - tadam! - automatycznego ładowania modułów. Wraz z nastaniem Debiana 8 robi się to całkiem inaczej, czyli...

### /etc/modules i /etc/modprobe.d

Debian embraces systemd. Jakkolwiek erotycznie by to nie brzmiało, to nie może być nic dobrego. Przedostatnia dystrybucja która nie używała systemd lub używała go w sposób w miarę unobtrusive właśnie poszła robić na ulicy gdzieś w Tajlandii, a zanim przemigrujemy systemy do Slackware, to teraz robi się to tak:

-   w `/etc/modules` wypisuje się tylko nazwy modułów, które mają zostać załadowane zanim udev się uruchomi (resztę ma obsłużyć udev i módlmy się, żeby mu się udało);
-   w plikach w katalogu `/etc/modprobe.d` wpisuje się odpowiednio parametry ładowania modułów.

Czyli inaczej mówiąc było prosto, teraz jest źle. W przypadku tego ekraniku polega to na tym, że w `/etc/modules` są tylko wpisane nazwy modułów do załadowania (w naszym przypadku to `spi-bcm2835`, `flexfb` i `fbtft_device` - każdy w oddzielnej linijce) a w pliku `/etc/modprobe.d/fbtft.conf` (bo taki akurat mieliśmy kaprys) są opcje, czyli to co kiedyś w `/etc/modules`, tylko każda linijka poprzedzona słowem "options", np.:

```
options fbtft_device name=flexfb speed=16000000 gpios=reset:25,dc:24
```

Reszta jak w oryginale, tylko oczywiście trzeba przeprowadzić kalibrację, bo cyferki dla 4-calowego ekraniku są inne, niż dla 3,5-calowego. Ale to przecież drobiazg, wiadomo co trzeba zrobić.

### Co dalej

Do zrobienia zostało mi zmienić orientację ekranu (z domyślnej poziomej na pionową, tak żeby wtyczka zasilania była od góry) i środowisko graficzne (z lxde na fluxboxa, potrzebuję tylko managera okien, a im mniej graficznych wodotrysków tym lepiej). Ale to już zupełnie inna historia.

Okazuje się, że to już prościzna. Najpierw trzeba zainstalować fluxboxa (nikt by się nie domyślił) i dopisać odpowiednią linijkę w pliku `.xsession` swojego użytkownika. Powiedzmy, że będzie to wyglądać jakoś tak:

```shell
sudo apt-get install fluxbox
echo "fluxbox" > .xsession
```

Oryginalna instrukcja dobrze podpowiada co trzeba zrobić by obrócić ekran, jednak dla 4" nie wystarczy zmienić porządku opcji kalibracji, ale dla pewności lepiej jest tę kalibrację przeprowadzić od nowa ze zmienioną geometrią. Szczęśliwie xinput-calibrator w Jessie jest już w repo, więc w porównaniu do Wheezy obejdzie się bez kompilowania ze źródeł. Efekt tymczasowo wygląda tak:

![Mmm, beer!](https://storage.googleapis.com/public.zgodowie.org/images/rpi-z-obrazkami.jpg 'Najlepiej na początek wyświetlić coś przyjemnego')

### Remove bloatware

Tak się to uruchamiało na full-wypas Raspbianie Jessie, ze wszystkimi bloatami jakie wymyślili dla ośmioletnich miszczów klawiatury. Prawdziwy linuksiarz nie idzie tą drogą, prawdziwy linuksiarz odpala Vima i sobie wszystko pokonfiguruje sam, zaczynając od dystrybucji minimal. Czyli abarot zaczynamy, tylko z obrazem Raspbian Jessie minimal, bo zamiast usuwać co niepotrzebne, lepiej jest zainstalować tylko to co potrzebne (komu potrzebny jest login manager w komputerku sterownika?!).

```shell
sudo apt-get install fluxbox xinit xserver-xorg-video-fbturbo

echo '[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && exec startx' >> .profile

echo 'exec startfluxbox' > .xinitrc
```

Potem oczywiście można sobie pokonfigurować tego naszego fluxboxa jak się chce, oczywiście ręcznie edytując pliki w `~/.fluxbox`. A jak. W `raspi-config` pozostaje ustawić sobie automatyczne bootowanie do sesji terminalowej i wuala.

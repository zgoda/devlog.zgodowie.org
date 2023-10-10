---
title: 'RetroPie, bo mi się dziecko alienowało'
date: 2016-02-17T13:31:00.000+01:00
draft: false
tags:
  - retropie
  - pozapiwne
  - linux
author: jarek
vssue: false
---

Dziecko moje najdroższe alienowało mi się siedząc przed komputerem w swoim pokoju. Nie żebym jej zabraniał, ale skoro ma grać, to niech gra przy nas, w salonie. Przynajmniej będziemy wiedzieli w co gra.

<!-- more -->
  
Wymagane hardware:  
  
* Raspberry Pi 2 Mod. B,
* karta SD min. 8GB,
* gamepad na USB,
* telewizor

Opcjonalne w zależności od konfiguracji:

* karta WiFi na USB
* klawiatura na USB
* pendrive czy inny storage na USB

Jak już to wszystko mamy, to możemy robić. Zajmie to parę godzin wszystkiego.

### RetroPie

Obraz RetroPie [pobieramy ze strony projektu](https://github.com/RetroPie/RetroPie-Setup/releases), to będzie ten którego nazwa kończy się na `rpi2.img.gz`. Następnie obraz ten trzeba rozpakować i nagrać w standardowy sposób na kartę SD. Wkładamy kartę do RPi, podłączamy pada do USB, bootujemy naszą zabawkę i zaczynamy konfigurowanko jak zwykle z RPi (z podłączonego klawikordu i na telewizorze, albo po ludzku, po zalogowaniu przez SSH), czyli najpierw używając skryptu raspi-config rozciągamy system plików na całą kartę, reboot, pełna aktualizacja systemu, być może reboot jak trzeba, doprowadzić system do wygodnej obsługi (np. wrzucić swoje klucze SSH, zmienić hasło użytkownika pi, wrzucić tam swoje _dotfiles_, wybrać wygodny edytor, itd, itp) i co tam kto lubi. W tej chwili powinniśmy już mieć działające EmulationStation, jakkolwiek całkiem gołe. Teraz wypadałoby skonfigurować pada, albo nawet i dwa pady, bo obsługa EmulationStation jest przystosowana do użycia właśnie pada.

### ROM-y

ROM-y skąd brać to każdy wie - z własnej kolekcji oryginalnych gier. Jako szczęśliwy były posiadacz PSX miałem coś tam pochowane po kątach, jakiś Tekken się znalazł, X-COM czy Final Fantasy. Używając legalnego oprogramowania z płyt CD zrobiłem komplety plików BIN/CUE, które to są znacznie lepiej obsługiwane przez RetroArch niż zwykłe ISO. Na początek postanowiłem użyć najprostszej metody transferu ROM-ów, czyli przez [pendrive z użyciem automatu](https://github.com/RetroPie/RetroPie-Setup/wiki/Transferring-Roms#usb) (działa literalnie jak jest w instrukcji, nie mam nic do dodania). Po wrzuceniu moich 3 szczęśliwie posiadanych gier okazało się, że karta SD 8GB to może być ciut za mało jak się chce obgrywać PSX, bo ROM-y mają po 500-650MB. Ale na razie ruszyło, tylko po restarcie EmulationStation nic się nowego w menu nie pojawiło.

### Silnik emulatora do PSX

Zacznijmy od tego, że będzie potrzebny [BIOS konsoli](https://github.com/RetroPie/RetroPie-Setup/wiki/Playstation-1#bios). Skąd go wziąć? HGW, jak ktoś ma PSX pewnie może go jakoś z niej wydobyć. Jako legalny posiadacz postanowiłem skorzystać z dorodziejstw torrentów i sobie ściągnąć backup. Moja konsola od jakiegoś czasu jest już trupem, więc to było jedyne rozwiązanie, które nie wymagało wielkiej gimnastyki.

Enter the hell of RetroPie-Setup. Nie, żartuję, aż tak źle nie jest. Zanim sobie pogiercujemy to trzeba zainstalować silnik emulatora PSX. W terminalu na koncie użytkownika pi odpalamy skrypt:

```shell
sudo RetroPie-Setup/retropie_setup.sh
```

Tam w pierwszym menu wybieramy "Experimental packages":

->![The Suchy Experiment](https://2.bp.blogspot.com/-FXzJslV6BAw/VsRgmrYzvPI/AAAAAAAAEhg/n2RHZDAo8Sc/s800/rpie01-exp-packages.png)<-

i następnie "pcsx-rearmed":  

->![Armed again](https://1.bp.blogspot.com/-qZ6JR0gJWVY/VsRg4_og8eI/AAAAAAAAEhk/pY0NKtpY-Vc/s800/rpie02-pcsx-rearmed.png)<-

Skrypt zadba o to, by wszystkie potrzebne do kompilacji pakiety zostały zainstalowane, następnie ściągnie sobie kod źródłowy, skompiluje go i wrzuci gdzie trzeba. Teraz wystarczy zrestartować EmulationStation i można grać.

### Ale to słabo wygląda

No słabo wygląda, bo na liście gier mamy np. 4x Tekken 2 i 14x X-COM. Dzieje się tak dlatego, że ES (EmulationStation, tak to teraz będę oznaczał) listuje wszystkie pliki w katalogu o dopuszczalnych rozszerzeniach dla silnika, czyli [w przypadku PSX i ROM-ów w postaci zbiorów BIN/CUE co najmniej 2x dla każdej gry](https://github.com/RetroPie/RetroPie-Setup/wiki/Playstation-1). Jest to trochę głupie, bo próba odpalenia gry z pliku BIN się nie powiedzie, zadziała to tylko dla plików CUE. Co trzeba zrobić? Ano, trzeba zmienić listę dopuszczalnych rozszerzeń w konfiguracji emulatora (w żargonie ES nasywa się to "system"). W tym celu kopiujemy sobie plik konfiguracyjny do siebie:

```shell
cp /etc/emulationstation/es_systems.cfg ~/.emulationstation
```

i dokonujemy czujnej edycji usuwając wspominki o BIN (oraz bin) z ustawień silnika. Znajdujemy ustawienia dotyczące PSX i zmieniamy linijkę z tagiem `<extension>` na poniższą:

```xml
<extension>.cue .cbn .img .iso .m3u .mdf .pbp .toc .z .znx .CUE .CBN .IMG .ISO .M3U .MDF .PBP .TOC .Z .ZNX</extension>
```

Uwaga, to jest XML więc nie ma zmiłuj, musi być poprawnie składniowo albo małe kotki zginą.

Po restarcie ES już powinno być lepiej, ale nie całkiem dobrze, bo wciąż mamy listę plików, a nie listę gier - nie ma tam żadnych metadanych typu opis itd. Trzeba odpalić scraper.

Wracamy do naszego skryptu `retropie_setup.sh` i z Experimental packages wybieramy Scraper:

->![Scrap, scrap, scrap](https://1.bp.blogspot.com/-kijLzWD4kQQ/VsRk5wI935I/AAAAAAAAEh0/fsZDzivqvdM/s800/rpie03-scraper.png)<-

Po uruchomieniu wybieramy sobie albo albo "Scrape all systems" albo tylko wybrane, może na początek lepiej sobie pojechać po całości, ale i tak uprzednio dobrze będzie się upewnić czy nie ma nowszej wersji i dać "Update scraper". Tak dla pewności.

->![Scrap it!](https://1.bp.blogspot.com/-0TkIpcQzdbU/VsRltYgYB5I/AAAAAAAAEh8/dkSMkefbylU/s800/rpie04-scraper-scrap.png)<-

Ten program zadziała tylko wtedy, gdy ES nie będzie uruchomione, o czym nam uprzejmie przypomni w innym przypadku. W każdym razie po chwili będziemy mieli już metadane naszych gierek ściągnięte i z przyjemnością przejrzymy sobie ich listę, a następnie z przyjemnością w nagrodę pukniemy partyjkę w X-COM.

->![X-Com się skończyło na Kill'Em All](https://3.bp.blogspot.com/-yMRvqFAvltw/VsRmeEsDLlI/AAAAAAAAEiI/bD6GK8wtfH8/s800/upload_-1)<-

Po południu przyjdzie dzieć ze szkoły i już nie pogramy, więc lepiej korzystać.

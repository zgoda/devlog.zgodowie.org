---
title: '[PCP] licznik piwa'
pubDate: 2016-08-23T16:11:00.001+02:00
tags:
    - programowanie
    - projekty
    - pcp
    - esp8266
author: Jarek
description: Nie żadne tam automatyki, zwykły gadżet do klikania.
---

Nowa kategoria, zgodnie z panującym lata temu w Usenecie obyczajem nazwana "PCP" czyli "Patrzcie Co Popełniłem".

Za jakiś czas jadę na pijacki zlot, gdzie będzie się lało bardzo, bardzo dużo piwa. A że jestem coraz starszy, tym większą mam potrzebę wiedzieć ile tak naprawdę tego dobra poszło, a nie tylko "za dużo". Stąd projekcik licznika wypitego piwa. Nie żadne tam automatyki, zwykły gadżet do klikania.

![Pajęczyna](https://3.bp.blogspot.com/-2dO83ztozUk/V7xQsta6S-I/AAAAAAAAEpc/wkJFMsKcsHQIRDv-Zz8OrreOcmLLfgeYACPcB/s800/upload_-1)

Jak na zamieszczonym zdjęciu widać, składa się on z wyświetlacza tekstowego 1602, enkodera przyrostowego (rotary encoder) i płytki developerskiej ESP8266 WeMos D1 mini.

Na dzień dzisiejszy umożliwia zliczanie wypitych piw z podziałem na małe (250 ml), średnie (330 ml) i duże (500 ml). Wyniki są wyświetlane jako ilość piw ogółem i objętość w litrach. Możliwa jest obsługa do 8 uczestników zabawy (ot, taka okrągła liczba), a ich wyniki są zapisywane w wewnętrznej pamięci Flash mikrokontrolera ESP-12E/F (SPIFFS). Funkcje edukacyjne:

-   obsługa typowego wyświetlacza LCD połączonego po I2C (TWI);
-   prosta obsługa enkodera przyrostowego;
-   dynamicznie budowane menu nawigacyjne;
-   odczyt i zapis danych z pamięci SPI Flash (SPIFFS);
-   odczyt i zapis strukturalizowanych danych w JSON (dekodowanie i enkodowanie);
-   AP tworzący własną sieć WiFi (otwartą);
-   interfejs webowy do dodawania i usuwania uczestników zabawy z dynamicznie ładowaną listą przy użyciu JavaScriptu.

W najbliższej przyszłości otrzyma on dodatkowo interfejs WWW do dodawania uczestników zabawy, powinienem chyba również przemyśleć nawigację, bo obecnie zakałapućkanie się w niewłaściwe miejsce wymaga resetu całego układu, o ile nie chce się czegoś popsuć.

Kod źródłowy programu jest dostępny w [publicznym repozytorium Git](https://bitbucket.org/zgoda/esp8266_beercounter), a rozpowszechniany jest na licencji GPL wersja 2.

Po zmontowaniu wszystkiego na breadboard wygląda to tak:

![Na chlebku](https://1.bp.blogspot.com/-th2qEKW9CWQ/V8Wev7AwS6I/AAAAAAAAEqQ/rRD114nyzTgbz1URVQtUCahivXelJH8ZgCPcB/s800/upload_-1)

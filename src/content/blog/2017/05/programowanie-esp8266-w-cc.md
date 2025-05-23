---
title: 'Programowanie ESP8266 w C/C++'
pubDate: 2017-05-08T10:47:00.000+02:00
tags:
    - programowanie
    - iot
    - esp8266
description: Pan Chińczyk zrobił, to się da oprogramować.
isTechRelated: true
imageUrl: https://storage.googleapis.com/public.zgodowie.org/images/esp8266-mcu.jpg
---

ESP8266 powoli ustępuje miejsca swojemu następcy ESP32, ale jest to proces wyjątkowo powolny. Może to ceny tak samych chipów jak i płytek developerskich to powodują (niewiele jest gotowych modułów w cenie poniżej $10 z przesyłką), a może rozbudowany ekosystem bibliotek do ESP8266. W każdym razie ze starszym bratem ESP32 jeszcze długo będziemy mieć do czynienia, zwłaszcza że jest to wciąż jedna z najlepszych opcji jeżeli chodzi o mikrokontrolery.

![ESP-12F](https://storage.googleapis.com/public.zgodowie.org/images/esp8266-mcu.jpg 'ESP8266 12F')

ESP8266 można programować w Lua lub w Pythonie, jednak najlepszym wyjściem jest zaprogramowanie własnego firmware w C++ lub w C - daje to największą kontrolę i zapewnia najlepszą wydajność. Jakie mamy do tego możliwości? Od najłatwiejszej do najbardziej skomplikowanej.

## ESP8266 core dla Arduino

Link: [Github](https://github.com/esp8266/Arduino)

To jest najprostsze rozwiązanie, implementacja ramówki Wiring dla ESP8266. Jakkolwiek można tę obsługę zainstalować w Arduino IDE, to nie ma to większego sensu, bo nie da się tego edytora używać do niczego poważniejszego. Pisze się to w normalnym C++11, z pewnymi ograniczeniami wynikającymi z właściwości platformy (np. wykonywanie zadań w głównej pętli nie może zająć razem więcej niż 2 sekundy, itp.). Jako ramówkę do budowania polecam [PlatformIO](http://platformio.org/), niekoniecznie z IDE (bazuje na edytorze Atom i nie jest jakoś szczególnie stabilne).

## Sming

Link: [Github](https://github.com/SmingHub/Sming)

Alternatywny framework, wciąż jednak wykorzystujący sporo kodu z Wiring. W dużej mierze ułatwia to korzystanie z bibliotek dla ESP8266/Arduino, jednak często wymagają one delikatnego tuningu - przede wszystkim dlatego, że oczekują ustawionych innych zmiennych środowiskowych które załatwia Arduino core, ale również dlatego, że część z nich jest przystosowana do działania w pętli, a Sming jest ramówką asynchroniczną, opartą na zdarzeniach i callbackach. W tym ostatnim przypadku kod który ma być wykonywany w pętli trzeba wykonywać okresowo przy użyciu timera. Aktywnie rozwijany, jest wokół niego jakieś _community_, chociaż nie jest szeroko rozpowszechniony i niektóre rozwiązania są... dyskusyjne, co najmniej. Ale jest na dobrej drodze.

## ESP OpenRTOS

Link: [Github](https://github.com/SuperHouse/esp-open-rtos)

Bazujący na FreeRTOS framework do programowania ESP8266, więc kod pisze się w C99 (`-std=gnu99`). Kod charakterystyczny dla platformy bazuje na dość starym kodzie ESP RTOS SDK, ponieważ dla twórców ważne było by był on zgodny z licencją BSD. Wymaga więcej zachodu niż wcześniejsze opcje, nie jest również tak aktywnie rozwijany, ma wciąż sporo błędów i nie wszystko działa. Bezapelacyjnym minusem jest mała liczba dostępnych bibliotek, co w połączeniu z minimalnym _community_ może sprawiać problemy gdy coś nie działa.

## ESP (RTOS|NONOS) SDK

Link: [strona producenta](http://espressif.com/en/products/software/esp-sdk/resource) lub [alternatywne SDK](https://github.com/pfalcon/esp-open-sdk)

Programowanie w SDK dostarczonym przez producenta, dostępna jest zarówno wersja klasyczna ("nonos") i bazująca na FreeRTOS ("RTOS"). Tutaj już wszystko jest tak "blisko żelaza", że już bliżej nie można. Dokumentacja SDK jest coraz lepsza, jest wiele "kickstartów" i szkieletów projektów.

---
title: Chińska jakość, ojacież
pubDate: 2016-08-05T15:47:00.000+02:00
tags:
    - iot
    - madeinchina
    - mcu
    - rant
description: 'Trochę towaru z Chin już do mnie przyjechało, więc chyba mogę coś napisać o jakości tego szpeju, z czego również będzie można sobie pownioskować, czy w ogóle warto ryzykować zakup.'
imageUrl: https://storage.googleapis.com/public.zgodowie.org/images/blue-pill-board.jpg
---

Trochę towaru z Chin już do mnie przyjechało, więc chyba mogę coś napisać o jakości tego szpeju, z czego również będzie można sobie pownioskować, czy w ogóle warto ryzykować zakup.

1\. Podzespoły i moduły podstawowe (elementy na płytkach modułowych, typowe wyświetlacze, czujniki, podstawowa elektronika jak diody, tranzystory, itp.)

![Telewizor](https://storage.googleapis.com/public.zgodowie.org/images/adapter-na-ekranie.jpg 'Adapter ekranu LCD')

Wszystko to co dostałem działało jak należy. Bez żadnej dokumentacji, bez wsparcia, ale jednak działało. Żeby było ciekawiej, nie mogę dojść do porozumienia z polskim sprzedawcą jednego niedziałającego wyświetlacza LCD z adapterem I2C.

2\. Mikrokontrolery na płytkach oraz popularne klony (ESP8266 w wersjach ESP-01 i ESP-12F z adapterem, Arduino UNO R3, Arduino Nano)

![Atak klonów](https://storage.googleapis.com/public.zgodowie.org/images/mcu.jpg 'Klon któregoś z Adruino, chyba nano')

Jest to tak proste i tak mocno ćwiczone, że prawdopodobnie tutaj też nie ma czego spieprzyć. Dostałem 6x ESP-01 i 6x ESP-12F z adapterem, wszystkie działały jak należy. Podobnie w przypadku wszystkich klonów Arduino (2x UNO R3 i 2x Nano).

3\. Chińskie wersje płytek Open Source, klony (WeMos D1 mini) i wersje "rozwojowe" (NodeMCU V3)

![Cing ciong](https://storage.googleapis.com/public.zgodowie.org/images/wemos-d1-mini.jpg 'WeMos d1 mini')

![Ciang cieng](https://storage.googleapis.com/public.zgodowie.org/images/nodemcu-v3.jpg 'NodeMCU V3')

Tu już się zaczyna robić naprawdę nieciekawie. Przeciętnie co druga płytka jest walnięta, dokładnie połowa klonów WeMos D1 mini miała źle wlutowane gniazdo USB, a 2 z 3 płytek NodeMCU V3 mają jakieś problemy z adapterem USB-UART. Co ciekawe, klony D1 mini mają te same adaptery (QinHeng Electronics HL-340), ale problemy są z nimi zupełnie inne.

4\. Generycznie chińska myśl techniczna (płytki developerskie STM32, tzw. "bluepill")

![Don't do this at home](https://storage.googleapis.com/public.zgodowie.org/images/blue-pill-board.jpg 'Blue Pill')

Tu już potrafi być tragicznie, z 4 płytek 2 rodzajów działa mi tylko jedna. O tym, że USB służy tylko do ładowania to nie ma co w ogóle wspominać, bo to już wszyscy wiedzą.

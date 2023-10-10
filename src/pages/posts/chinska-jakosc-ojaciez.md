---
title: Chińska jakość, ojacież
date: 2016-08-05T15:47:00.000+02:00
draft: false
tags:
  - iot
  - madeinchina
  - mcu
vssue: false
author: jarek
---

Trochę towaru z Chin już do mnie przyjechało, więc chyba mogę coś napisać o jakości tego szpeju, z czego również będzie można sobie pownioskować, czy w ogóle warto ryzykować zakup.

<!-- more -->

1\. Podzespoły i moduły podstawowe (elementy na płytkach modułowych, typowe wyświetlacze, czujniki, podstawowa elektronika jak diody, tranzystory, itp.)  

->![Telewizor](https://1.bp.blogspot.com/-rCLwds1IcsI/V6SSzkcP__I/AAAAAAAAEog/_3ubVgEzN_QioNkkLckAU04ZRm1LeqZvACLcB/s800/YwRobotLCD-CU-450.jpg)<-

Wszystko to co dostałem działało jak należy. Bez żadnej dokumentacji, bez wsparcia, ale jednak działało. Żeby było ciekawiej, nie mogę dojść do porozumienia z polskim sprzedawcą jednego niedziałającego wyświetlacza LCD z adapterem I2C.
  
2\. Mikrokontrolery na płytkach oraz popularne klony (ESP8266 w wersjach ESP-01 i ESP-12F z adapterem, Arduino UNO R3, Arduino Nano)

->![Atak klonów](https://4.bp.blogspot.com/-0dh48qmqh1s/V6STTQjJ5qI/AAAAAAAAEok/vW4K3nqGZpgStpXsQXnyy9bf5l3d9381QCLcB/s800/51I6xd7H6hL._AC_UL160_SR160%252C160_.jpg)<-

Jest to tak proste i tak mocno ćwiczone, że prawdopodobnie tutaj też nie ma czego spieprzyć. Dostałem 6x ESP-01 i 6x ESP-12F z adapterem, wszystkie działały jak należy. Podobnie w przypadku wszystkich klonów Arduino (2x UNO R3 i 2x Nano).

3\. Chińskie wersje płytek Open Source, klony (WeMos D1 mini) i wersje "rozwojowe" (NodeMCU V3)

->![Cing ciong](https://3.bp.blogspot.com/-4KBwssBoLYI/V6ST_3JJRnI/AAAAAAAAEos/t06akGkWCI4N4MHocczULBdJLoqmeTyQgCLcB/s800/d1-mini.png)<-

->![Ciang cieng](https://2.bp.blogspot.com/-gLpMYkUBVbA/V6SUpcd1iCI/AAAAAAAAEo0/m3AVO4hT6iAOLQ90iGPSThVc4lSVoTc9gCLcB/s800/6c92705e10687ecdecccf031d909cc89.jpg)<-

Tu już się zaczyna robić naprawdę nieciekawie. Przeciętnie co druga płytka jest walnięta, dokładnie połowa klonów WeMos D1 mini miała źle wlutowane gniazdo USB, a 2 z 3 płytek NodeMCU V3 mają jakieś problemy z adapterem USB-UART. Co ciekawe, klony D1 mini mają te same adaptery (QinHeng Electronics HL-340), ale problemy są z nimi zupełnie inne.

4\. Generycznie chińska myśl techniczna (płytki developerskie STM32, tzw. "bluepill")

->![Don't do this at home](https://3.bp.blogspot.com/-IG-h8ojm1CA/V0Q93zGn13I/AAAAAAAAEl0/ET00TtgI2QkB0CeZ_pefhuMKhhenvNudwCPcB/s800/STM32F103C8T6-Development-Board-1.jpg)<-

Tu już potrafi być tragicznie, z 4 płytek 2 rodzajów działa mi tylko jedna. O tym, że USB służy tylko do ładowania to nie ma co w ogóle wspominać, bo to już wszyscy wiedzą.

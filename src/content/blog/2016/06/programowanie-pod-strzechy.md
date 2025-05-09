---
title: 'Programowanie pod strzechy'
pubDate: 2016-06-29T15:20:00.000+02:00
tags:
    - arm
    - sbc
    - iot
    - arduino
    - mcu
description: Dwa projekty, jeden cel
isTechRelated: true
imageUrl: https://storage.googleapis.com/public.zgodowie.org/images/rpi-1-a.jpg
---

Obietnice były wielkie, a efekty? Czy mamy to czego chcieliśmy?

## Dwa projekty, jeden cel

![RPi](https://storage.googleapis.com/public.zgodowie.org/images/rpi-1-a.jpg 'Rapberry Pi 1')

Raspberry Pi miało dać ludziom platformę do nauki programowania _małych rzeczy_. Komputer który był tani i teoretycznie _wszystkomający_, tak naprawdę w większości przypadków kończy jako set-top box przy telewizorze zastępując funkcje smart TV, lub retrokonsola do starych gier odpalanych na emulatorze. Przypadki kiedy RPi (i jego klony) są używane do czegokolwiek poważniejszego można policzyć na palcach. Prawdę mówiąc moje zastosowanie nie odbiega wcale od tego schematu, RPi 2B jest u mnie retrokonsolą, OPi PC przez większość czasu się nudzi będąc głównie serwerem aplikacji WWW i MQTT. Nie przyznam się ile różnych SBC leży u mnie w pudełkach, ale jest to konkretna moc obliczeniowa. Być może prowadzę nudne życie, ale nie widzę dla nich konkretnych zastosowań.

![Uno](https://storage.googleapis.com/public.zgodowie.org/images/arduino-uno-r3.jpg 'Arduino UNO R3')

Do towarzystwa jest Arduino UNO, 8-bitowy mikrokontroler na płytce developerskiej również ze wszystkim. Oryginał nie jest tanią zabawką (prawie 100 złotych za oryginalną płytkę), ale zadowalającej jakości klony na popularnym chińskim portalu można kupić za ułamek tej ceny, wliczając w to przesyłkę. Za te pieniądze dostajemy platformę, którą się łatwo oprogramowuje i można z nią zrobić zdecydowanie więcej niż tylko pomrugać diodami, choć na pierwszy rzut oka jej możliwości wyglądają skromnie. A co się najczęściej z nimi robi? No niestety, ale właśnie głównie mruganie diodami, a co najwyżej elektroniczny termometr.

## Dlaczego jest tak dobrze, skoro jest tak źle

Tak naprawdę to nie jest wcale źle. Dzięki popularności RPi ludzie oswajają się z informatyką na niskim poziomie, zapoznając się z systemami komputerowymi od samego dna. Trzeba płytkę podłączyć do WiFi (ręczne grzebanie w plikach konfiguracyjnych), trzeba zapewnić stabilne zasilanie, trzeba skierować sygnały na wyjściu na odpowienie kanały. Jest to bardzo odległe od obietnicy plug and play, którą serwują wielcy tego świata, według której wszystko ma się dziać samo, a urządzenia mają być w pełni funkcjonalne w momencie wyjęcia z pudełka. Zderzenie z rzeczywistością komputerową czasem jest bolesne (w szczególności gdy gotowce z internetu nie działają), ale zwykle wychodzi na dobre. Jeżeli jednak ktoś chciał użyć RPi do _nauki programowania_, to szybko przekonał się, że znacząco wygodniej programuje się na zwykłym komputerze (PC czy Apple, bez różnicy).

Z kolei Arduino potrafi wprowadzić w świat elektroniki praktycznej, przy okazji przypominając podstawowy kurs zagadnień o elektryczności z fizyki. Niektórym przestaje wystarczać to, co oferuje tzw. Arduino IDE i szybko orientują się, że tak naprawdę programowanie mikrokontrolerów to C++ i od tego języka nie da się uciec, pomimo usilnych prób odizolowania użytkownika od zawiłości tego języka. Pod względem nauki programowania Arduino zrobiło znacznie więcej niż RPi, ponieważ **wymagało** programowania. Tak naprawdę istniejące gotowce w większości przypadków nie nadają się do powtórnego wykorzystania, a służyć mogą co najwyżej jako wskazówka. Z kolei niewielka ilość dostępnych zasobów szybko wymusza daleko idącą optymalizację kodu. Można byłoby chcieć więcej, ale i to jest zadowalający efekt.

## Informatyka dla trzeciego świata

Pomysł na wykorzystanie tych tanich urządzeń w edukacji w zacofanych krajach południa nigdy nie złapał wiatru w żagle. Tak naprawdę są to zabawki bogatych, a przynajmniej dla tych, którym zostaje trochę pieniędzy przed pierwszym. Są projekty, ale spotykają się z [rzeczową krytyką](https://hackaday.com/2016/05/16/one-dollar-board-targets-students/) opartą na technologicznej wiedzy. A każdy z nich staje przed tym samym problemem - dostarczamy płytki **i co dalej**? I żaden z nich nie udziela na to pytanie odpowiedzi, jakby najważniejsza była nie idea wyprowadzania biednego południa z zapaści, a samo _robienie dobrze_.

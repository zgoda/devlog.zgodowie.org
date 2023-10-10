---
title: Donkiszotyzm to moje drugie imię
date: 2016-05-24T13:48:00.001+02:00
draft: false
tags:
  - arm
  - mbed
  - stm
  - pozapiwne
  - arduino
  - stm32
  - mcu
author: jarek
vssue: false
---

Jakiś czas temu wpadłem na szatański pomysł, by [kupić sobie OrangePi PC](http://beergeek.zgodowie.org/2015/12/piwny-czy-nie-geek.html) i kombinować z tym SBC. Szybko okazało się to straceńczą eskapadą, ale po dłuższym czasie udało mi się znaleźć sensowne wykorzystanie tego czegoś i nie jest przyciskiem do papieru. Jak się okazuje, niczego się nie nauczyłem.

<!-- more -->

Minęło kilka miesięcy, rozwinąłem trochę moje umiejętności oprogramowywania mikrokontrolerów i niestety przy jednej większej robótce natrafiłem na ścianę - popularne Arduino UNO przestało wystarczać zasobowo, ESP8266 również miało trochę czegoś tam za mało w każdej swej edycji, musiałem się rozejrzeć za MCU który uciągnie ethernet i komunikację po HTTP, rozparsowanie jakiegoś formatu serializacji danych (najchętniej JSON), wyświetlacz znakowy 20x4 z menu roboczym i obsługę inputu z keypada i/lub joysticka. Teoretycznie mogłoby być Arduino MEGA, ale ta cena, $10 za jedną płytkę, która dodatkowo jest taka wielka, jakby miała napędzać komputer ENIAC. Niezawodny chiński portal natychmiast udzielił mi odpowiedzi: płytka z STM32F103C8T6! Patrzę na specyfikację: ARM Cortex-M3 72MHz, 20KB RAM, 64KB FLASH, dobra nasza, a jak cena wynosi $2 za sztukę, to grzech nie brać, furda tam że trzeba sobie samemu piny polutować. I zacząłem się rozglądać jak to oprogramować.

->![Chiński szajs](https://1.bp.blogspot.com/-IG-h8ojm1CA/V0Q93zGn13I/AAAAAAAAElw/I7mYNl1hv7MHoHW1iU2AX78KN5XwVqTqgCLcB/s800/STM32F103C8T6-Development-Board-1.jpg)<-

Szczęśliwy traf czy wtopa na całego?

[STM Cube F1](http://www.st.com/en/embedded-software/stm32cubef1.html) odpadło od razu, nie jestem masochistą. Jak również [ChibiOS](http://www.chibios.org/) (do tego może dojdę później). Jest niby jakaś [platforma hardware do Arduino](http://www.stm32duino.com/), ale nie wspierana oficjalnie i nawet w menedżerze płytek jej nie ma. No i jest framework, w założeniu podobny do Arduino, podobnie jak i ten dający pewną warstwę abstrakcji od żywego żelaza, tylko dla ARM, nazywa się [mbed](https://developer.mbed.org/) i jest oficjalnie [wspierany przez wielkie tuzy](https://www.mbed.com/en/partners/our-partners/) typu ST Microelectronics, Texas Instruments czy Atmel. Czy ja śnię? Enter the hell of mbed (classic).

Zacznijmy od tego, że mbed oficjalnie nie wspiera tej płytki (gwoli ścisłości - żadnej płytki z tym MCU), ponieważ polityką wydawcy jest "oficjalne wsparcie dla oficjalnych płytek", a jak można się domyślić żadna szopa w Shenzen nie dostąpiła zaszczytu nominowania na "oficjalnego dostawcę". Trzeba będzie kombinować ze zbliżonymi płytkami.

Do prostego znakowego wyświetlacza LCD 8 bibliotek, ale po bliższym przyjrzeniu się 6 z nich to forki jednej lub forki innego forka tej jednej. Po jeszcze dokładniejszych poszukiwaniach znalazłem kolejne kilkadziesiąt forków (czyżby po jednym dla każdej wspieranej płytki?), ale czym się różnią to się nie dowiem, chyba że sklonuję każde repo i sobie zrobię ręcznego diffa. Ostatnia aktywność rok temu lub dawniej, żadnych _pull requestów_, w większości przypadków nawet nie ma jak zgłosić _issue_ czy zadać autorowi pytania, taki GitHub dla wyjątkowo ubogich. I potem trzeba to powtarzać z każdą rzeczą: moduły ethernet WizNet5100 lub ENC28J60, biblioteka do MQTT, czy parser JSON. A wsparcie "wielkich" kończy się na ich płytkach, inaczej mówiąc "za $2 to se radź sam, nasze płytki za $50 są wspierane że hej". W kategoriach _social development_ ten projekt można traktować jako _almost dead_, chociaż pewnie partnerzy ARM nie pozwolą mu tak szybko umrzeć, bo coś z tego mają, a tymczasem wiele funkcji _serwisu developerskiego_ zwyczajnie kończy się 404. W każdym razie - spory niesmak. Zadałem pytanie dotyczące kompilacji jednej z bibliotek na (teoretycznie) wspieranej płytce, po 2 dniach pytanie ma status _awaiting moderator approval_, a próba jego edycji pokazuje ładne, ale zupełnie nieprzydatne 404.

->![Błe](https://2.bp.blogspot.com/-SlHYFAoueXc/V0VZ-OY1GaI/AAAAAAAAEmA/mTmLyWpwqnsKUtnSOa4HF1u1ktyzT5bEQCLcB/s800/Zrzut%2Bekranu%2Bz%2B2016-05-25%2B09-53-07.png)<-

Ładne, ino co z tego wynika?

Skądinąd trochę dziwnie to wygląda: jest tani i dobry hardware, jest software które ma duży potencjał, a _ruchu społecznego_, który mógłby pchnąć ten wózek nie ma. Na tym sprzęcie można zrobić wszystko to, co na zapyziałym UNO, a nawet znacząco więcej, bo zasoby pozwalają. Framework mbed ma znacznie większy potencjał edukacyjny niż Arduino, bo nie abstrahuje tak bardzo od C/C++ i jakkolwiek wymaga nieco większego wysiłku na początku, to potem nie pozostawia "dziury w wiedzy" do zasypania. Dostępność hardware jest co najmniej bardzo dobra, a cena za sztukę MCU na popularnym chińskim portalu od $1.95 free shipping to mniej niż najtańszy klon UNO R3 ($2.50 w stanie równie gołym jak STM32). Gdzie jest to _community_, które tak skrzętnie wykorzystało ukryte moce ESP8266?

Ale nie dam się. Za $2? Nie ma mowy. Musi działać. I będzie działało.

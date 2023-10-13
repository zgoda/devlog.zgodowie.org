---
title: Flutter jest całkiem znośny
author: Jarek
pubDate: 2021-01-20T23:24:00
tags:
    - programowanie
    - android
    - flutter
    - dart
    - androidstudio
    - vscode
description: Do aplikacji mobilnych podchodziłem do tej pory jak do jeża, a zniechęcały mnie w jednakowym stopniu i Java, i Kotlin. Flutter w tej dziedzinie wiele zmienił.
---

Bliższe zapoznanie się z zagadnieniem pisania aplikacji na telefony chodziło za mną od bardzo dawna. Niby wszystko miało pasować - mam telefon do sprawdzenia jak działa (i ostatecznie pochwalenia się), znam Javę, mam na czym odpalić Android Studio. A jednak coś mnie cały czas w tym odpychało. To pewnie ta Java i jej bękart, Kotlin.

![Złoty strzał](https://i.imgur.com/8M1oP64h.jpg)

Po kilkunastu latach dziergania w Pythonie perspektywa dotknięcia Javy powodowała we mnie odruch ucieczki. Sytuacji nie poprawiło spopularyzowanie Kotlina jako podstawowego języka do pisania aplikacji na Androida, bo nie oszukujmy się, to jest to samo, tylko trochę mniej upierdliwe. A przymierzałem się do tego od lat, za każdym razem po kilku dniach z obrzydzeniem wywalałem z systemu Android Studio i oddychałem z ulgą. Ale też za każdym razem narastała świadomość, że to jest odwlekanie konieczności, w końcu trzeba będzie się tym zająć.

Już byłem blisko podjęcia próby z [React Native](https://reactnative.dev/), gdy po raz kolejny do głosu doszedł przypadek. Kilkanaście lat temu to przypadek sprawił, że zainteresowałem się Pythonem - w ubezpieczalni używaliśmy proxy do logowania po NTLM napisanego w Pythonie. Z ciekawości zajrzałem w kod i doznałem olśnienia, którego wystarczyło mi na 15 lat. W ostatnich kilku latach podobne próby jak z programowaniem aplikacji mobilnych miałem z Javascriptem - i już miałem poświęcić więcej czasu na [Vue.js](https://vuejs.org/), gdy **przypadkiem** natrafiłem na kod jakiejś aplikacji na ESP-32, która miała frontend w [Preact.js](https://preactjs.com/). Kod wyglądał prawie jak React.js, ale sam framework był znacznie mniejszy, prostszy w uruchomieniu i sprawiał wrażenie, że bierze z API React tylko to co fajne, zostawiając za sobą cały bagaż tego, co jest potrzebne Facebookowi. Co za przypadek, że trafiłem na taką fajną rzecz!

Tym razem badając zagadnienia wokół ActivityPub i _rozproszonych social media_ **przypadkiem** natrafiłem na jakiegoś mobilnego klienta napisanego przy użyciu frameworka [Flutter](https://flutter.dev/). Spojrzałem w kod, a tam [Dart](https://dart.dev/) - język, który podobał mi się od dawna, chociaż nie znajdowałem dla niego wielu zastosowań. Niezbyt innowacyjny (znacząco mniej niż [Go](https://golang.org/), [Rust](https://www.rust-lang.org/) czy choćby [Elixir](https://elixir-lang.org/)), nazwałbym go wręcz _dobrze zrobioną Javą_ - poważnie, tak mogłaby wyglądać Java, gdyby nie była wymyślona przez _typa z brodą_. Składnia w wielu miejscach przypomina Pythona (znowu, nie aż tak bardzo, jak w [Nim](https://nim-lang.org/)), no i widać również, że panom inżynierom z Google podobała się prostota, jaką wnosi Python. Odpowiada mi to dużo bardziej niż Kotlin, który jest pudrowaną Javą.

Jako że nie jestem typem, który uczy się nowych rzeczy obrabiając tutoriale jeden po drugim, postanowiłem pouczyć się tego robiąc coś konkretnego. Wymyśliłem sobie w moim [Devlogu](https://github.com/zgoda/devlog) (czyli w tymże właśnie serwisie) funkcję _mikroblogowania_. Żeby ona miała jakiś sens, to najlepiej by było mieć do niej aplikację mobilną, więc postanowiłem poćwiczyć właśnie na tym. Tak się rozkręcił [kolejny projekt edukacyjny](https://github.com/zgoda/devlog-microblog-client), któremu z dnia na dzień przybywa kodu. Aplikacja będzie prosta i raczej nie nastawiona na _akcent wizualny_, ale jej głównym celem jest edukacja.

We Flutterze podoba mi się również to, że jest _reaktywny_, tzn zmiany w interfejsie użytkownika wykonują się w wyniku zmiany stanu komponentu. Do takiego modelu przyzwyczaiły mnie różne frameworki Javascriptowe typu React i wydaje się on rzeczywiście przyjemniejszym rozwiązaniem, niż model deklaratywny (modyfikowanie właściwości pod wpływem wydarzeń). Owszem, jest trochę rozwlekły jeżeli chodzi o układanie widgetów, ale szczęśliwie w aplikacjach na telefony nie ma ich tak dużo na ekranie, żeby stało się to przykre. Drobna upierdliwość.

Nie wydaje mi się, żebym miał się przebranżowić na pisanie aplikacji na telefony, ale właściwie czemu nie miałbym się nauczyć również tego?

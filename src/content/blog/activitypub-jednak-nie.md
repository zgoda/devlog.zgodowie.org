---
title: ActivityPub - jednak nie
author: Jarek
pubDate: 2021-01-06T20:11:00
tags:
    - programowanie
    - python
    - activitypub
description: Po dwóch tygodniach zmagań z implementacją ActivityPub w Devlogu rzuciłem to jednak w diabły. Pokładane nadzieje okazały się płonne, a obietnica mobilnego klienta - niespełniona. Bez większego żalu skasowałem branch z zaczątkami kodu obsługi AP i znowu jestem w punkcie wyjścia, choć znowu mam pewien pomysł.
imageUrl: https://i.imgur.com/oUpkuigh.jpg
---

Po dwóch tygodniach zmagań z implementacją ActivityPub w Devlogu rzuciłem to jednak w diabły. Pokładane nadzieje okazały się płonne, a obietnica _mobilnego klienta_ - niespełniona. Bez większego żalu skasowałem branch z zaczątkami kodu obsługi AP i znowu jestem w punkcie wyjścia, choć znowu mam pewien pomysł.

![Zajzajer](https://i.imgur.com/oUpkuigh.jpg)

Do czego w ogóle był mi potrzebny AP? Do _microblogowania_ - publikowania notatek nie będących wypasionymi wpisami w blogu. Ot, luźne myśli, pomysły, czasem jakiś cytat, zdjęcie czy notatka głosowa. Żeby to miało sens, to konieczny do tego jest _klient mobilny_, najlepiej natywna aplikacja na telefonie, a to po to, by nie było problemu z działaniem offline. Cała ta impreza z federalizacją nie miała dla mnie żadnego znaczenia - instancja miała być tylko moja i nie miała niczego wymieniać z innymi instancjami.

Szybko okazało się że po odjęciu federalizacji ze specyfikacji ActivityPub pozostaje właściwie... nic. Kilka zaleceń, ale wyrażonych w trybie sugestii, zdecydowanie nie protokół ani nawet model implementacji.

### Ktoś nie pomyślał

Aby mobilny klient mógł skomunikować się z serwerem, to musi wiedzieć **gdzie** są różne rzeczy. Pierwsza z nich - punkt identyfikacji użytkownika, czyli ścieżki URL do aparatury OAuth2. Nie ma tego ani w [nodeinfo](http://nodeinfo.diaspora.software/schema.html), ani w [WellFed](https://github.com/kaiyou/wellfed), skąd więc klient wie gdzie ma wysłać żądanie? Otóż nie wie, w ciemno wysyła na `/oauth/authorize`. Oczywiście, w ciemno również zakłada, że rejestracja aplikacji klienckiej jest pod `/api/v1/apps`, bo tak jest w Mastodonie. Spec AP słowem nie wspomina jak to ma wyglądać i skąd klient ma mieć tę wiedzę, ograniczając się do sugestii, żeby identyfikacja i autoryzacja opierały się na OAuth2. Superowo.

Na tym etapie już mi się zapaliło, że być może wcale nie o to mi chodzi. Implementowałbym serwer pod klienta, który sam za bardzo nie wie co i jak. A w związku z tym, że generycznych klientów AP jest dwa (całe **dwa**), to sytuacja jest nad wyraz słaba.

Poszukiwania innego protokołu/specyfikacji spełzły na niczym i musiałem ponownie usiąść na miejscu projektanta.

### Adam Słodowy

A może samemu sobie napisać własną aplikację kliencką na telefon? Nie musiałaby robić dużo - zalogowanie użytkownika i manipulacja wpisami. Na początek wystarczyłoby nawet tylko wysyłanie postów, potem możnaby dopiero dorobić resztę, tj. przeglądanie listy, edycję i usuwanie. Identyfikacja mogłaby być uproszczona (login + hasło), ścieżki URL wbite na początek na stałe.

Ponownie z bólem zainstalowałem Android Studio. Po obskoczeniu kilku tutoriali w Kotlinie zrozumiałem, że nie będzie prosto, jest tego zwyczajnie za dużo. Już miałem sobie odpuścić, gdy wpadł mi w oko [Flutter](https://flutter.dev/) (podobnym przypadkiem kiedyś trafiłem na [Preact](https://preactjs.com/)). Przemówił do mnie intuicyjną składnią języka [Dart](https://dart.dev/), deklaratywnym modelem obiektów, a przede wszystkim tym, że aplikację można pisać w VS Code, a nie koniecznie w Android Studio, które doprowadza mnie do szału.

No to co, teraz _mobile development_?

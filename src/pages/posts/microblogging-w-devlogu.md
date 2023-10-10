---
title: Microblog w Devlogu
author: jarek
date: 2021-01-31T21:55:00
tags:
  - programowanie
  - python
  - flutter
  - dart
description: Korzystając z okazji uczę się pisania aplikacji mobilnych we Flutterze. Fajna sprawa.
---

Po upadku idei implementacji ActivityPub w Devlogu postanowiłem rzucić się na głęboką wodę i nauczyć się programować aplikacje mobilne, a backend dorobić *na rympał*, najprostszy jak się da. Idzie raz wolniej, raz szybciej, ale coś tam się udaje, a pomaga mi w tym kombo Dart + Flutter. *Na backendzie* oczywiście Python, co daje mi ten komfort, że wprowadzanie zmian infrastrukturalnych jest szybkie, łatwe i przyjemne.

->![Piękne miewamy tu zachody słońca](https://i.imgur.com/cWQqdhnh.jpg)<-

<!-- more -->

Na początek konieczne było zrobienie identyfikacji użytkownika, a więc również nowy model do przechowywania danych, takich jak nazwa i hasło. Na razie jedyną zaimplementowaną metodą identyfikacji jest API, które po zakończonej sukcesem operacji logowania zwraca krótkotrwały token, którym można następnie autoryzować kolejne żądania, ale jak już został zrobiony początek, to nic nie stanie na przeszkodzie by zrobić też przez UI.

Do tego trzeba było zrobić 2 *endpointy* na obiekt i na kolekcję wpisów, na razie tylko z podstawowymi funkcjami (pobierz wpis/listę, dodaj wpis) i w tym momencie uznałem, że backend mam jako-tako ogranięty. Przynajmniej na tę chwilę, bo i tak pisanie tej aplikacji na telefon idzie mi jak krew z nosa i zanim zacznę czegoś więcej potrzebować to trochę czasu minie.

Nie żebym się z tym jakoś szczególnie zmagał, tyle że jest to dla mnie coś zupełnie nowego. Nowy paradygmat, nowa platforma. Język przyjemny, idee znajome, ale jednak wciąż coś nowego. Przyznaję, jest to całkiem ekscytujące, szczególnie gdy uda mi się coś konkretnego zrobić, nad czym ślęczałem dość długo. Przykład z dzisiaj - gdy aplikacja nie ma w preferencjach ustawionej lokalizacji serwera, to otwórz stronę ustawień. Niby całkiem oczywiste, ale nastąpiło zderzenie światów asynchronicznego z synchronicznym i ostatecznie kod, który zamyka się w kilku linijkach powstawał przez parę godzin:

```dart
@override
Widget build(BuildContext context) {
  Future<void> future = locator.allReady();
  future.whenComplete(() {
    UserSettingsModel settings = locator<LocalStorageService>().settings;
    if (!settings.isConfigured()) {
      Future.delayed(Duration.zero, () => _askForSettingsDialog(context));
    }
  });
  return FutureBuilder(
    future: future,
    builder: (BuildContext context, AsyncSnapshot snapshot) {
      ...
    },
  );
}
```

Zapewne ktoś, kto używa Fluttera od dłuższego czasu miałby to gotowe w kilkanaście minut, ale ja musiałem popsuć całą aplikację parę razy doprowadzając ją do załamania, a potem przekopać się przez zasoby internetu, żeby w końcu zrozumieć co trzeba zrobić (chodziło o tę magiczną zawartość `future.whenComplete()`, choć wydaje mi się, że można to zrobić lepiej). W takich momentach smak zwycięstwa jest szczególnie słodki. Widzę jednak, że kilka tygodni dłubania pozwala mi na nieco bardziej swobodne poruszanie się w kodzie, a przede wszystkim łatwiej jest mi zidentyfikować na jaki problem natrafiłem i w których rejonach szukać rozwiązania. 25 lat doświadczenia w fachu robi swoje, pomimo że język i platforma są całkiem nowe to uczenie się wymaga o wiele mniej wysiłku (co bynajmniej nie oznacza, że nie wymaga go w ogóle).

Jedna drobna przeszkoda została pokonana, teraz będzie kolejna i coś czuję że większa - użytkownika trzeba będzie zalogować, odebrać z backendu token i w razie czego zapisać nazwę i hasło, jeżeli odpowiednia opcja jest zahaczona w ustawieniach. Przy okazji będzie trochę dłubania z *dziwnymi bibliotekami*, na szczęście analogie do Reacta są całkiem powszechne i stosunkowo łatwo jest znaleźć podpowiedź *jak to zrobić we Darcie/Flutterze*. Nie omieszkam powiadomić o sukcesie, jak również opowiedzieć o ciekawszych znaleziskach.

Dalej będą operacje na wpisach - pobieranie listy, dodawanie nowego wpisu, edycja istniejącego wpisu (Markdown z podglądem?), a potem różne *wisienki*, jak możliwość odbierania danych wysyłanych przez inne aplikacje. Szczęśliwie [jest aplikacja](https://github.com/jointwt/goryon), którą mogę *popodglądać*, bo robi dokładnie to samo, co będzie robić moja (choć używa zupełnie innego protokołu i backendu).

Co za ekscytująca podróż!

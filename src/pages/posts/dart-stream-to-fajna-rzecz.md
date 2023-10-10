---
title: "Dart: Stream to fajna rzecz"
author: jarek
date: 2021-02-11T19:27:00
tags:
  - dart
  - async
  - flutter
description: Spędziłem nad tym kilkanaście godzin, próbując bezskutecznie zmusić różne rodzaje providerów z biblioteki Riverpod zmusić do cyklicznego powiadamiania o stanie zewnętrznej usługi. Ostatni okazał się być najlepszym, co ja mówię, jedynym jaki działał.
---

W [mojej szkolnej aplikacji](https://github.com/zgoda/devlog-microblog-client) we Flutterze mam taki ficzer, że ona może działać również offline. Uznałem, że fajnie by było, jakby użytkownik widział od razu, czy ma połączenie z serwerem, czy nie ma (z jakiegokolwiek powodu, to akurat bez znaczenia - bo może sobie również ustawić ręcznie tryb *offline*). Niby nic trudnego, jakis timer, asynchroniczna metoda, która zwraca element wyliczenia reprezentujący stan - i rzeczywiście, implementacja okazała się prosta. Tylko jak skonsumować jej wynik?

->![Mmm, limoncello!](https://i.imgur.com/v6JGOvzh.jpg)<-

<!-- more -->

Konsumpcja okazała się najtrudniejsza. Aplikacja akurat przechodziła ze stadium architektury opartej o *service locator* i singletony na dostawców z biblioteki [Riverpod](https://riverpod.dev/), więc nie wszystko było w niej w najlepszym porządku, ale patrząc na dostępne rodzaje dostawców nie mogłem dojść do tego, który mi umożliwi regularne aktualizowanie stanu. Próbowałem od różnej strony, a to `StateProvider`, a to `StateNotifierProvider` - za każdym razem sprawa rozbijała się o asynchroniczność metody sprawdzającej stan i dostęp do stanu odpowiedniego providera. Aż na końcu pozostał jeden, którego nie próbowałem użyć - i ten okazał się tym właściwym.

Początkowo odrzucałem użycie `StreamProvider`a, ponieważ jedyne przykłady jego użycia jakie znalazłem dotyczyły strumienia zdarzeń z usługi [Google Firebase](https://en.wikipedia.org/wiki/Firebase#User_privacy_controversies) (niby kusi, ale...). Jednakowoż bedąc już mocno zdesperowanym wymyśliłem, że przecież ten mój serwis sprawdzający stan serwera mógłby - czysto teoretycznie - wygenerować strumień, a wtedy dałoby się użyć do tego `StreamProvider`a. I okazało się, że to działa. I to jak działa.

```dart
void stop() {
  _stopStream = true;
}

Stream<ServerStatus> status() async* {
  while (true) {
    if (_stopStream) {
      break;
    }
    final status = await _checkStatus();
    yield status;
    await Future.delayed(_interval);
  }
}

Future<ServerStatus> _checkStatus() async {
  try {
    final resp = await _http.head(_url);
    if (resp.statusCode == 200) {
      return ServerStatus.online;
    } else {
      return ServerStatus.error;
    }
  } on SocketException {
    return ServerStatus.offline;
  }
}
```

Interesujące jest tutaj `async*`, które od zwykłego `async` różni się tym, że zamiast funkcji zwracającej wynik na końcu z `return` mamy zwykły generator, który emituje poszczególne wartości przez `yield` - dokładnie tak jak w Pythonie. Do zatrzymania służy flaga `_stopStream`, a dopóki nie zostanie ustawiona to generator działa w nieskończonej pętli, co okres zapisany w zmiennej `_interval` uruchamiając metodę `_checkStatus()` i emitując jej wynik.

Teraz wystarczyło zdefiniować providera (no, właściwie dwa - jeden zwracający obiekt usługi i drugi sam strumień) i mam _obserwowalne_ żródło zdarzeń.

```dart
final serverStatusProvider = StreamProvider<ServerStatus>((ref) {
  final service = ref.watch(serverStatusServiceProvider);
  return service.status();
});
```

Konsumpcja też już jest wyjątkowo prosta.

```dart
class ServerStatusIcon extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final serverStatus = useProvider(serverStatusProvider);
    Widget result;
    serverStatus.when(
      data: (status) => result = serverStatusIcon(status),
      loading: () => result = serverStatusIcon(ServerStatus.offline),
      error: (_, __) => result = serverStatusIcon(ServerStatus.error),
    );
    return result;
  }
}
```

W przypadku obiektu klasy `StreamProvider` hook `useProvider` zwraca obiekt `AsyncData`, któremu należy zdefiniować 3 *callbacki* na to co się ma dziać gdy będące jego podstawą `Future` jeszcze się nie wykona, wykona się z sukcesem lub wykona się z błędem.

Teraz po włączeniu aplikacji pojawia się widget `ServerStatusIcon` i uruchamiane jest strumieniowanie danych. Dopóki nie zakończy się metoda `_checkStatus()` usługi, ikona odpowiada statusowi `offline`, a jest zmieniana gdy strumień dostarczy pierwszy wynik. Na jaką? Na taką, jaka wynika ze statusu.

Bardzo, bardzo mi się to podoba. Tak bardzo, że po miesiącu dłubania jeszcze nie rzuciłem tego w cholerę.

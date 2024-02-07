---
title: Async w Pythonie - wciąż daleko do ideału
author: Jarek
pubDate: 2021-03-11T10:36:00
tags:
    - programowanie
    - python
    - async
description: Sprawdziłem jak to z pisaniem asynchronicznych serwerów w Pythonie jest na początku 2021 i muszę państwu powiedzieć, że do zadowalającego stanu jest wciąż daleko, choć jest nieco lepiej niż półtora roku temu.
imageUrl: https://i.imgur.com/GkfP6vUh.jpg
isTechRelated: true
---

Co jakiś czas lubię sobie _dłubnąć_ coś nowego, a to jakaś aplikacyjka na telefon, a to coś w Javascripcie, a to jakieś nowe narzędzie przetestować, wyciskając z niego ile się da (a czasem zwyczajnie nadużywając). Po ostatnich przygodach z Preactem i Flutterem zapragnąłem wrócić do Pythona, przy okazji sprawdzając jak się w początku 2021 roku pisze aplikacje asynchroniczne.

![Greens](https://i.imgur.com/GkfP6vUh.jpg)

Asynchroniczne programowanie współbieżne w Pythonie. Tyle lat się już tym jaramy, a do czego doszliśmy? W ramach testu postanowiłem napisać [mały serwerek czatu](https://github.com/zgoda/chitty-server) oparty na WebSocketach i Redisie, a do obskoczenia wybrałem bibliotekę [Trio](https://trio.readthedocs.io/).

### Wybory miss

Jakie mamy alternatywy? Można tłuc w [żywym asyncio](https://docs.python.org/3/library/asyncio.html) jak zwierzęta, ale można spróbować z wyższego poziomu. [Curio](https://curio.readthedocs.io/) niestety dostarcza tylko podstawowych funkcji obsługi współbieżności, [AIOHTTP](https://docs.aiohttp.org/) (wbrew nazwie sugerującej specjalizację) już ma wszystko co trzeba by być _ramówką aplikacyjną_, podobnie jak Trio. Oczywiście, jest jeszcze [Twisted](https://twistedmatrix.com/), ale Twisted znam już na tyle dobrze, że chciałem spróbować czegoś nowego, czyli jedziemy z `async`/`await`. W tej sytuacji pozostają do wyboru AIOHTTP i Trio, więc zacząłem dobierać pozostałe elementy.

Z WebSocketami nie było żadnych problemów, AIOHTTP ma to [wprost z pudełka](https://docs.aiohttp.org/en/stable/web_quickstart.html#websockets), a do Trio jest [dobrze działająca biblioteka](https://github.com/hyperiongray/trio-websocket/). To teraz Redis no i tutaj zaczęły się schody.

Do AIOHTTP są 3 biblioteki: _omc-oficjalna_ [aioredis](https://github.com/aio-libs/aioredis), [aredis](https://github.com/NoneGG/aredis) która kusi zgodnością interfejsu z najpopularniejszą biblioteką do Redisa [redis-py](https://github.com/andymccurdy/redis-py) oraz [asyncio-redis](https://github.com/jonathanslenders/asyncio-redis) o której tyle wiadomo, że działa. Kolorowy zawrót głowy, ale jak się bliżej przyjrzeć, to:

-   aioredis jest w trakcie totalnej przebudowy interfejsu API tak, by można nią było zastąpić redis-py; nie mnie oceniać czy to dobry czy słaby pomysł, ale tymczasem nie wiadomo czy działa z Redisem 6, nie działa z Pythonem 3.10 i ma problemy z Pythonem 3.9, w dodatku niektórzy z oryginalnych autorów biblioteki [już się obrazili za tę zmianę API](https://github.com/aio-libs/aioredis/pull/891#issuecomment-770088787)
-   aredis ma dokumentację skopiowaną z redis-py, w szczególności w interesującym mnie zakresie, czyli PubSub, co czyni ją (dokumentację) bezużyteczną
-   asyncio-redis co prawda działa ponad wszelką wątpliwość (przekonałem się o tym naocznie), ale dokumentacja jest wyjątkowo skąpa

Z wielkiej trójki, została jedna, ledwo co udokumentowana i _może jedna_, bo w sumie nie wiadomo jak jej używać. Tragedią bym tego nie nazwał, ale do stanu _może być_ to jednak trochę brakuje. Nota bene, [benchmark jest trochę zniechęcający](https://aredis.readthedocs.io/en/latest/benchmark.html), nie umiem powiedzieć na ile jest wiarygodny.

Co zabawne, do Trio są aż cztery, choć tak naprawdę to też tylko trzy, bo [ta najstarsza została zarchiwizowana](https://github.com/Bogdanp/trio-redis) (nie obsługiwała z resztą PubSub). Co zostało?

-   [Redtrio](https://github.com/Harrison88/redtrio) bez dokumentacji, API z wyglądu nie przypomina niczego co bym znał, ale obsługuje najnowszy protokół Redisa
-   [trio-redis](https://github.com/omnidots/trio_redis) bez dokumentacji, za to z ostrzeżeniem żeby nie używać bez potrzeby i adnotacją, że jest niekompletna
-   [RedIO](https://github.com/Tronic/redio), która też zasadniczo nie ma dokumentacji, chociaż ma wyczerpujące _readme_ - również z ostrzeżeniem, żeby nie używać bez potrzeby

Ludzie, co jest z wami nie tak? No ale coś trzeba było wybrać, więc zdecydowałem się na kombo Trio + trio-websocket + RedIO, to w końcu projekt edukacyjny. Gównie dlatego, że AIOHTTP (i aioredis) wyglądają, jakby mało kto się nimi zajmował.

### Implementacja

Implementacja poszła stosunkowo łatwo. Nie obyło się bez paru przeszkód natury mentalnej, ale po przestawieniu się na _myślenie w async_ poszło już gładko. Miałem jedną zagwozdkę związaną z RedIO i teraz zastanawiam się, [czy czasem to nie jest błąd w bibliotece](https://github.com/Tronic/redio/issues/4), ale jeszcze nie jestem pewien co tam się dzieje. Otóż pobieranie wiadomości z _topicu_ PubSub zdaje się blokować pętlę aplikacji dopóki wiadomość się nie pojawi, ale obszedłem to dodając `await trio.sleep(0)` w pętli zadania odczytującego z PubSub i na razie zdaje się działać. Do zaimplementowania zostało jeszcze kilka innych funkcji, a potem będę mógł się zająć pozostałymi dwiema częściami układanki.

O Trio mogę powiedzieć tyle, że dokumentację ma dobrą, przejrzystą i raczej kompletną (nie aż tak jak Falcon, ale blisko). Pisze się w tym całkiem przyjemnie, a dzięki wyczerpującemu wprowadzeniu przestawienie się na _myślenie w async_ zajęło raptem jeden wieczór. W trackerze Trio dzieje się bardzo dużo, ale odbieram to głównie jako szum, bo samo tempo rozwoju [nie jest zawrotne](https://github.com/python-trio/trio/tags) choć w miarę stałe. Kiedyś denerwowało mnie w Trio to, że statyczne analizatory kodu (np dostarczające usługi IntelliSense w edytorach) głupiały całkowicie, ale ta bolączka została już usunięta. Skończę ten projekt i zapewne kiedyś jeszcze do Trio wrócę, bo warto ten projekt śledzić, może się z niego urodzić coś równie dobrego, co Twisted.

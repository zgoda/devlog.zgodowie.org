---
title: ActivityPub - plan implementacji
author: Jarek
pubDate: 2020-12-25T14:17:00
tags:
    - programowanie
    - python
    - activitypub
description: Postanowiłem jednak zrobić kawałek ActivityPub w Devlogu. Potem może następny i następny, ale powoli i bez pośpiechu, w dodatku traktując AP jako _ramówkę_, a nie specyfikację protokołu.
---

Postanowiłem jednak zrobić kawałek [ActivityPub](https://www.w3.org/TR/activitypub/) w Devlogu. Potem może następny i następny, ale powoli i bez pośpiechu, w dodatku traktując AP jako _ramówkę_, a nie specyfikację protokołu.

![Smokin'](https://i.imgur.com/FHT1ChNh.jpg)

Niedawno przypomniałem sobie ponownie o ActivityPub, którym interesowałem się już w okolicach 2018 roku, a to w kontekście pojawiającej się często potrzeby zapisania sobie (i _u siebie_) czegoś większego niż tweet, a mniejszego niż pełnowymiarowy post w blogu, do czego w dodatku istnieje choćby podstawowy klient na telefon. Oczywiście szybko okazało się, że różowo nie jest, a wręcz spec to jest jakiś zbiór niedopowiedzeń, przez co nie da się _dobrze_ zrobić najważniejszego, a więc rozproszenia i współdziałania instancji. Sytuacja ogólnie jest niewesoła w tym ActivityPubie, ale jak sobie przemyślałem sprawę, to do tego co jest mi potrzebne się nada.

## Co będzie miał AP w Devlogu

-   `outbox` do zbierania od klienta aktywności których ja jestem autorem, jednak w przypadku żądań pobrania zawartości będzie zwracał pusty zbiór
-   _głuchy_ `inbox`, bo musi być, ale będzie działał jako _zlew_ (komunikacja bez efektu z odpowiedzią `OK`)
-   OAuth2, żeby klient mógł się autoryzować
-   meta informacje pod `/.well-known` (`webfinger` z danymi użytkownika i `nodeinfo` z danymi instancji)

Jak widać, nie mam zamiaru robić żadnej federalizacji, ani tym bardziej implementować żadnych funkcji _sieci społecznościowej_, więc większość przykładowego lub bibliotecznego kodu nie będzie mi w ogóle potrzebna, jak również nie mam żadnego powodu żeby się przejmować niedoskonałościami specyfikacji ActivityPub.

Tyle na początek. Trudno mi powiedzieć, czy będę implementował coś więcej - jak zazwyczaj pewnie wyniknie to w trakcie użytkowania. Na tę chwilę nie mam takiej potrzeby, utworzoną zawartość i tak będę udostępniał ręcznie, a naprawdę nie widzę potrzeby porzucania tej czy innej platformy społecznościowej.

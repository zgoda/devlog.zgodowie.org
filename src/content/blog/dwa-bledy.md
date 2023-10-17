---
title: Dwa błędy
pubDate: 2021-03-16T22:20:00
author: Jarek
tags:
    - programowanie
    - javascript
    - unbundled
description: 'Zachciało mi się unbundled, więc po przejrzeniu dostępnych opcji wybrałem Snowpack, ale już po tygodniu okazało się to sporym błędem. A właściwie dwoma, bo przy okazji chciałem łyknąć coś z TypeScriptu.'
imageUrl: https://i.imgur.com/uERigGnh.jpg
---

Pomysł wydawał się na pierwszy rzut oka przedni - poćwiczę sobie parę rzeczy, robiąc przy okazji jakiś projekt edukacyjny. Na _backendzie_ to miał być asynchroniczny Python, na frontendzie _unbundled_ + TypeScript. O ile backend poszedł gładko i z co najwyżej drobnymi przeszkodami, to _na froncie_ wpakowałem się w niezły szajs.

![B-Cz](https://i.imgur.com/uERigGnh.jpg)

Plan był taki, żeby przećwiczyć na raz 2 rzeczy: _unbundled_ (czy jak to niektórzy mawiają _buildless_) i TypeScript. Wydawałoby się, że jak coś jebnie, to jedno z dwóch i się bez ceregieli wygrzebię, ale okazało się, że jebły oba aspekty i nagle znalazłem się w otchłani.

## No dymanic

Po pierwsze, nie leży mi TypeScript. Sądziłem początkowo, że będzie to miły dodatek, jak _annotations_ w Pytągu, ale nie. Jest co prawda fajna wartość dodana w edytorze ze wsparciem (jak np. w VS Code), czyli mam informację o spodziewanych typach argumentów i zwracanych wartości, ale nie jest to opcjonalne. Inaczej mówiąc, TypeScript robi z JavaScriptu język typowany całkowicie statycznie. Nie opcjonalnie, nie w formie _sugestii_, tylko po prostu wymusza deklarację typów wszystkiego naokoło (czasem wymusza zaniechanie adnotacji, ale z dokładnie tą samą manierą). Dla człowieka który od kilkunastu lat z upodobaniem używa _dynamic dispatch_ jest to po prostu niezrozumiałe, jak można z tego zrezygnować na własne życzenie.

Nie mam nic przeciwko statycznemu typowaniu, jestem nawet w stanie zaakceptować brak _odzwierciedlania_, jak w Darcie. Tylko nie w JavaScripcie. Bo TS tak naprawdę jest wciąż tym samym JavaScriptem, tylko z nałożonym zespołem kagańców. Komu to pasuje? Doskonale wiadomo komu - wielkim korporacjom piszącym miliony linii kodu miesięcznie, w których każda godzina jest płatna _setkami dularów_, tiko że nie nie jestem jednym z nich. Jako człowiek robiący _dla siebie_ mam inne priorytety, a najważniejszy z nich jest _fun_. TypeScript is _no fun_. Nawet jeżeli miałoby to przynieść jakiś walor edukacyjny.

## Bundle it, FFS

TypeScript był porażką mentalną, ale to co wyszło ze Snowpacka, to jest porażka technologiczna _po całości_.

Co jest najważniejszym narzędziem programisty? Tak, wiem, napisałem kiedyś, że klawiatura, ale teraz chodzi mi o coś innego - co jest najważniejsze przy pisaniu programów?

Najważniejszy jest **debugger**. Ten mały programik, który pozwala po podłączeniu się do wykonywanego procesu zobaczyć, co tak naprawdę się w nim dzieje _pod maską_. W Pytągu jest PDB (i jego usprawnione klony), nawet do JavaScriptu jest taki, co pozwala podłączyć się do procesu wykonującego kod JS w przeglądarce (Chrome, Firefox).

Tylko że on - jak się używa Snowpacka - nie działa. Jak sprawdziłem, [tak samo](https://github.com/vitejs/vite/issues?q=is%3Aissue+debugger) _nie działa_ również z [Vite](https://vitejs.dev/). Można _się zaczaić_ w devtoolsach przeglądarki, ale to co przeglądarka wykonuje to zupełnie nie jest to, co żeśmy napisali. Ani żaden człowiek. Czyli mówiąc krótko, przy _unbundled_ (przynajmniej przy użyciu Snowpacka lub Vite) **debugger nie działa** w sposób, który byłby użyteczny dla programisty. Nie ma czarniejszej dupy ponad to. Rozumiem co się tam dzieje, i rozumiem też dlaczego tak się dzieje - każdy kod który nie jest _natywny_ musi ostatecznie do przeglądarki zostać wysłany jako natywny, dlatego narzędzia takie jak Snowpack czy Vite muszą jednak przetłumaczyć ten JSX na zwykły JavaScript. To co widać w debuggerze to jest efekt tego tłumaczenia, bardziej lub mniej czytelny, ale jednak nie to co zostało napisane przez programistę.

## Way out of this mess

I teraz jakoś należałoby się z tego wygrzebać, ale tak, żeby nie pogrążyć całego projektu, bo oprócz aplikacji webowej są jeszcze _dwa kawałki_, które warto byłoby zrobić. A jeden z nich jest nawet fajniejszy niż cała reszta razem wzięta.

Najpierw pozbędę się TypeScriptu. Mam na tę chwilę jako-tako działający kod, który tylko trzeba lekko przerobić, by stał się *prawilnym* JavaScriptem. Możnaby do tego dodać wyłączenie kompilatora TS, ale to nie ma sensu, bo ostatecznie i tak go nie będzie. Dlatego tylko zmienię rozszerzenia plików, włączę dopuszczalność _żywego JS_ w `tsconfig.json` i będziemy nad tym zagadnieniem pracować dalej.

Dopiero potem zacznę się wygrzebywać ze Snowpacka. Myślę, że żeby nie pogrzebywać od razu całego projektu, to po drodze mogę spróbować jakiegoś jeszcze innego _unbundlera_, np. [WMR](https://github.com/preactjs/wmr). Ma on co prawda kilka mankamentów, które jednak w przypadku tej aplikacji nie będą jakoś mocno przeszkadzać. A jeżeli z tym się nie uda, to postaram się wrócić do Webpacka 4, czyli zwykłego uruchomieniowego środowiska programistycznego dla Preacta.

I tak zapewniłem sobie hobbistyczne zajęcie na następne 2 tygodnie. W końcu czy nie o to właśnie chodzi?

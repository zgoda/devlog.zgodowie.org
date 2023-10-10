---
title: Javascript w Brewlog v3
author: jarek
date: 2020-07-24T09:57:00
description: Początkowo chciałem zrobić w reaktywnym JS cały formularz wprowadzania i modyfikacji danych warki. Okazało się to nierealne, ale jeszcze nie zrezygnowałem z JS.
tags:
  - python
  - programowanie
  - projekty
  - pcp
  - javascript
  - preact
---

Plan był taki, żeby formularz wprowadzania i modyfikacji danych warki był *reaktywny*. Po kilku dniach walki z tematem doszedłem do wniosku, że jest to nierealne.

->![Evening](https://i.imgur.com/rOCPghOh.jpg)<-

Przynajmniej w takiej formie, w jakiej planowałem przeprowadzić to początkowo.

<!-- more -->

Próbowałem już ożenić [Preact](https://preactjs.com/) w aplikacji Flask zrobionej hybrydowo i rezultat był nieprzekonujący. Kod oczywiście działał, ale zakres dodanej *reaktywności* był za mały w porównaniu do wysiłku jakiego wymagało połączenie tych dwóch światów. Tym razem temat powrócił przy okazji modyfikacji kodu Brewlogu do wersji v3.

Wbrew pozorom jest to całkiem spora aplikacja, więc uznałem że *reaktywność* będzie do niej dodawana stopniowo, po małym kawałku. Podejście to da w efekcie hybrydowy system, który będzie wymagał niewiele większego nakładu pracy, ale w znaczący sposób poprawi wygodę korzystania z aplikacji. Obecnie punktem centralnym aplikacji jest wprowadzanie i modyfikacja danych warki i ta część wydawała się najlepszym miejscem do tego, by zacząć. Jest to duży, nudny formularz z masą pól, z których część narzuca pewną konwencję, inne z kolei są obklejone Javascriptem manipulującym wprowadzanymi danymi. Jest tam generalnie dużo łataniny i niezbyt eleganckiego kodu, który aż się prosi o to, by go *naprostować pogrzebaczem*.

Spędziłem nad próbami tego *naprostowywania* ponad 10 godzin, bez zadowalającego skutku. Najprostsze (i jak się zdawało najwłaściwsze) podejście, polegające na zaimplementowaniu całego formularza w JS spełzło na niczym. Okazało się, że początkowy wybór technologii czyni to zadanie ogromnie pracochłonnym - na pewno łatwiej byłoby to zrobić, gdybym używał [JSX](https://facebook.github.io/jsx/) a nie [HTM](https://github.com/developit/htm) i *tagged templates*, a kamulec sporego rozmiaru dołożyła ramówka CSS [Bulma](https://bulma.io/) ze swoim [barokowym formatowaniem elementów formularzy](https://bulma.io/documentation/form/). No ale nie oszukujmy się, moje skromne doświadczenie z *nowoczesnym frontendem* również dało się we znaki. Ale i tak - ogromna ilość kodu do napisania a następnie przetestowania.

Wczoraj wieczorem powiedziałem sobie wreszcie *dość*. Przemyślałem sprawę i trzeba to będzie załatwić inaczej. Skoro nie da się skalpelem, to trzeba siekierą.

Z wieczornych przemyśleń wyszło mi, że najlepszym rozwiązaniem będzie zmiana w *architekturze UX* całej aplikacji (nie wiem czy coś takiego istnieje, ale wydaje mi się że powinno). W skrócie co innego ma być centralnym punktem aplikacji. Wprowadzenie danych warki jest jednorazowym wydarzeniem, jest to żmudny proces, który jednak nie musi być wciąż przypominany użytkownikowi przez podsuwanie mu tego samego wielkiego formularza za każdym razem, gdy chce wykonać jakąś czynność w kontekście danych warki (zanotować wyniki pomiarów, dodać notatkę z jakąś obserwacją, czy dokonać rozlewu). I tu pojawia się miejsce, gdzie ta *reaktywność* zmniejszy uciążliwość korzystania z programu. Centralnym punktem aplikacji będzie teraz pulpit (*dashboard*) z listami warek *z którymi można coś zrobić*, uszeregowanymi wg kontekstu ważności, dostarczający skrótów do wykonania typowych czynności. Nadal będzie można zmieniać dane warki przy użyciu formularza, ale nie będzie on już głównym sposobem wprowadzania dodatkowych danych, a tym bardziej jedynym czy nawet domyślnym.

Przez lata nie zastanawiałem się nad wygodą użytkowania aplikacji, bo przyzwyczaiłem się do tego, jak się w niej wykonuje różne rzeczy - działało, więc nie było sensu naprawiać. Wydaje mi się, że jest to dość częsta przypadłość programów robionych przez programistów głównie na własny użytek. Tym razem jednak sprawy zaszły za daleko, zdarzyli się jacyś użytkownicy i trzeba chyba o nich zadbać. A przy okazji poćwiczyć coś nowego. Nie wydaje mi się żeby to było jakoś mocno przydatne w przyszłości, ale jakie to ma znaczenie?

No i w 2020 wreszcie przyszedł czas zmian, a wraz z nim opamiętanie. Mam nadzieję że mój *designer skill* wystarczy na to zadanie. Na razie potrzebuję żeby mi jakiś grafik zrobił logo, może być wycięte z jednego darmowego SVG które mam na oku.

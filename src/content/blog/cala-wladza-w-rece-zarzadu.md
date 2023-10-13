---
title: Cała władza w ręce zarządu
pubDate: 2020-07-25T01:30:00
author: Jarek
tags:
    - rant
    - przypiwie
description: Coraz większa liczba usługo polega na federated login, cedując decyzję kto może uzyskać dostęp do treści na paru nieodpowiedzialnych typów.
---

20 lat temu, gdy robiłem pierwszą aplikację webową w PHP (3!), oczywiste było, że aby wykonać jakąś czynność w serwisie użytkownik musi się zidentyfikować, a potem aplikacja mu to umożliwi, albo nie. Minęło 20 lat i dziś nie jest to aż tak oczywiste.

![Not great, not terrible](https://i.imgur.com/d6lmIKyh.jpg)

I nie chodzi o to, że aplikacja nie ma już nic do powiedzenia, bo ciągle jeszcze coś ma. Jednak w wielu przypadkach **zanim** aplikacja będzie mogła dostąpić zaszczytu podjęcia jakiejkolwiek decyzji, kto inny zadecyduje, czy użytkownik może do niej uzyskać dostęp.

Prezes korporacji, która przeprowadza identyfikację użytkownika - Google, Facebook, Twitter, Microsoft, Yandex, Alibaba. Czasem może nawet osobiście, ale raczej częściej wyznaczona osoba, siedząca w ciemnej, śmierdzącej kanciapie, przeprowadzająca tzw _moderację treści_. Kontrowersyjny komentarz na fejsie? Klik i 7 dni kwarantanny od usług platformy. Których usług? A to się przekonasz gagatku, gdy spróbujesz z nich skorzystać. Jeżeli wkurzyłeś kogoś zbyt mocno, to również do usługi identyfikacji użytkowników, która teraz na każde zapytanie o twoje konto będzie odpowiadać kodem 404 - nie ma takiego zasobu. I nie ma dla nikogo znaczenia, że chciałeś tylko wygenerować kartkę z życzeniami dla cioci, ale serwis generujący kartki z życzeniami teraz identyfikuje użytkowników używając platformy Facebooka, a platforma ta twierdzi, że takiego konta nie ma.

Usługi _federated login_ udostępniane przez wielkie globalne korporacje niosły ze sobą obietnicę ułatwienia życia użytkownikom sieci. Nie trzeba było zapamiętywać setek haseł do różnych serwisów, wystarczyło 2 czy 3 do tych używanych na co dzień, by uzyskać autoryzowany dostęp do tysięcy innych - jak sobie przypominam to tak miało wyglądać spełnione marzenie teoretyków internetu jakieś 10 lat temu. Klik, klik - i już jesteś zalogowany. Co prawda dostawca usługi identyfikacji wie, że właśnie zalogowałeś się do serwisu porno dla miłośników zoofilii, ale komu to przeszkadza? To znaczy, jest parę osób którym mogłoby to przeszkadzać, ale one się przecież o tym nie dowiedzą.

Nie?

Otóż - dowiedzą się. Facebook, Google, Twitter czy Microsoft w pierwszym rzędzie sprzedadzą tę informację zaprzyjaźnionym firmom zajmującym się reklamą w internecie. Chwilę później sprzedadzą ją każdemu kto będzie gotów zapłacić. Będą się certować gdy służby państwowe poproszą o tę informację, ale to tylko dlatego, że służby są skąpe i nie zamierzają płacić, dlatego zażądały dostępu do danych w trybie bezpłatnym. Przy tak szeroko zakrojonej cyrkulacji danych jest tylko kwestią czasu, kiedy dostęp do informacji uzyskają ci, których wolelibyśmy od tej informacji trzymać z daleka.

A gdy przyjdzie czas rozprawy z miłośnikami seksu ze zwierzętami, to lista osób do odstrzału będzie w tym momencie gotowa.

To jest właśnie powód, dla którego w Brewlogu v2.1 nie będzie już możliwości zakładania nowych kont przy użyciu _federated login_, a od wersji 2.2 nie będzie można się do aplikacji zalogować używając `OAuth2`. Co również oznacza, że do serwisu trzeba będzie mieć oddzielne hasło, ale zarówno Chrome jak i Firefox dostarczają usługi generatora haseł, która jednocześnie jesr _password managerem_.

Tak się wykuwa stal.

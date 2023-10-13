---
title: Minimalna aplikacja we Flasku, done right
author: Jarek
pubDate: 2020-07-17T22:18:00
tags:
    - flask
    - python
    - pcp
    - programowanie
    - projekty
description: Czasem naprawdę potrzeba dużo mniej, niż będą wmawiać doświadczeni architekci aplikacji webowych, a jednocześnie trochę więcej, niż proponują autorzy jutubowych tutoriali. Inaczej mówiąc, jak najmniejsza aplikacja we Flasku, ale tak żeby miała sens i dała się utrzymywać minimalnym nakładem sił.
---

Przyglądając się baczniej mojemu Brewlogowi, który akurat przechodzi transformację do wersji 3 przy okazji tracąc kolejne nigdy nie użyte warstwy abstrakcji, doszedłem do wniosku, że nawet robiąc małą aplikację, zaczynam ze zbyt wysokiego poziomu. Jak zrobić małą aplikację we Flasku (naprawdę małą) ale tak, żeby miało to ręce i nogi?

![Niebo nad Mazowszem](https://i.imgur.com/s5aLMzCh.jpg)

Na pierwszy rzut oka wydaje się to bajecznie proste - obiekt aplikacji, parę funkcji widoków, definicja modeli, dopóki wszystko to siedzi w jednym module, to trudno sobie nawet wyobrazić, że coś mogłoby nie działać. Schody zaczynają się wtedy, gdy spróbujemy porozdzielać to na oddzielne moduły, w szczególności funkcje widoków. Otóż żeby działała rejestracja widoków jako _handlerów_ dla ścieżek URL, to potrzebny jest obiekt aplikacji w momencie definicji, a w _runtime_ aplikacja musi mieć zaimportowane pod ręką wszystkie funkcje widoków. Czy to czegoś nie przypomina? W sportach walki jest takie określenie jak **klincz**, a w języku polskim przysłowie że _złapał kozak tatarzyna, a tatarzyn za łeb trzyma_. W Pythonie określa się to jako _circular import_.

Czy aby na pewno? Czy to jest sytuacja bez wyjścia?

->![Otóż nie tym razem](https://i.imgur.com/qBfzpOLh.jpg)<-

No nie do końca.

Rzeczywiście gdybyśmy chcieli wszystko sobie ładnie statycznie poimportować, to oczywiście _się nie da_ i ten import w kółko rzeczywiście wystąpi, wykonanie się załamie i nic z tego nie będzie. Tymczasem nie jest to takie trudne do obejścia, trzeba tylko się zorientować kiedy co się dzieje, a w efekcie **kiedy** który obiekt potrzebuje co wiedzieć. Jak to zrobić [opisał Charles Leifer](https://charlesleifer.com/blog/structuring-flask-apps-a-how-to-for-those-coming-from-django/) w 2013 roku, a ja przygotowałem [coś w rodzaju minimalnego przykładu](https://github.com/zgoda/miniq), którym teraz posłużę się do wyjaśnienia ocb.

Obiekt funkcji widoku musi mieć dostęp do obiektu aplikacji w momencie definicji po to, by móc zarejestrować się jako obsługujący jakąś ścieżkę URL. Z kolei obiekt aplikacji musi wiedzieć która z fukcji zarejestrowała się jako obsługująca ścieżkę URL w momencie uruchamiania, a żeby do tego doszło to musi zaimportować wszystkie funkcje widoków. Te dwie rzeczy nie dzieją się jednocześnie, czyli już pojawia się jakaś iskierka nadziei.

Aby ten problem ostatecznie rozwiązać skorzystamy z pewnej dozy magii Pythona, czyli z faktu że obiekty modułów są niezmienialne, a jednocześnie identyfikatory obiektów w modułach są tylko nazwami wskazującymi na obiekty występujące w jednym egzemplarzu w czasie wykonywania kodu przez maszynę wirtualną. Wykorzystując to zjawisko możemy użyć identyfikatora obiektu aplikacji z jednego modułu [w momencie definicji funkcji widoku](https://github.com/zgoda/miniq/blob/master/src/miniq/views.py), a z zupełnie innego modułu [w momencie uruchamiania samej aplikacji](https://github.com/zgoda/miniq/blob/master/src/miniq/main.py). Ważne jest tylko to, by nie był to ten sam identyfikator w obu przypadkach. Dzięki temu w obu przypadkach nie będzie importowana ta sama nazwa (choć za każdym razem wskazująca na ten sam obiekt aplikacji).

Przykład który zmontowałem oprócz tego tricku zawiera kilka innych przydatnych rzeczy, które ułatwią utrzymanie zbudowanego na jego podstawie kodu w 2020. Przede wszystkim, jest oparty na _src-layout_, który rozwiązuje 2 poważne problemy, [testowalność i instalowalność](https://blog.ionelmc.ro/2014/05/25/python-packaging/). Tego układu kodu używają np. wszystkie projekty Pallets (w tym Flask) i ma on bardzo wyraźne zalety. Oprócz tego mój przykład dostarcza kilku rzeczy które są już zdefiniowane i gotowe do wykorzystania, jak ładowanie konfiguracji z plików `.env`.

Fajne, co?

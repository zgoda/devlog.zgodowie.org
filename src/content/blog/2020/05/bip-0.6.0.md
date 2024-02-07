---
title: BIP 0.6.0
author: Jarek
pubDate: 2020-05-31
tags:
    - pozapiwne
    - python
    - flask
    - programowanie
    - projekty
    - pcp
description: Robienie oprogramowania open source to nie jest łatwy kawalek chleba, w szczególności gdy nie ma na nie zapotrzebowania.
imageUrl: https://i.imgur.com/qjNTKpCh.jpg
isTechRelated: true
---

10 miesięcy spędziłem nad tą aplikacją. W tym czasie jej potrzeba okazała się być znacznie mniej palącą, a wręcz przestała być potrzebna _w wymiarze osobistym_. A jednak doprowadziłem ją do stanu _feature complete_.

![Coś nadchodzi](https://i.imgur.com/qjNTKpCh.jpg)

Zacząłem robić aplikację [BIP (Biuletyn Informacji Publicznej)](https://github.com/zgoda/bip) z potrzeby osobistej. Ktoś bliski miał potrzebę, a ja się rozejrzałem i okazało się, że takich rzeczy prawie nie ma. Zazwyczaj aplikacja BIP jest udostępniana jako SAAS, co samo w sobie nie jest oczywiście niczym złym ale _come on_, żadnej alternatywy?!

To pod koniec lata 2019 roku pchnęło mnie we frenetyczny proces produkowania aplikacji webowej, która:

-   implementowałaby minimalny biuletyn informacji publicznej
-   działałaby na dowolnym hostingu typu VPS
-   miałaby administrację zasobami zarówno z linii poleceń jak i przez interfejs administracyjny po WWW
-   byłaby dostępna na zasadzie _wolnego oprogramowania_

Kto miałby być odbiorcą takiego czegoś? Osoba która musi mieć _mały BIP_, a jednocześnie ma _darmowego admina_ w postaci małżonka, zstępnego, wstępnego - kogoś, czyją pracę może mieć za darmo. Jak również osoba, która ma w dyspozycji (np przez umowę-zlecenie) obrotnego admina, który nie pęka przed robotą na Linuksie przy instalacji przez jakąś godzinę lub dwie. Ile ja takich osób znam? Co najmniej 10, ale może powinienem zmienić znajomych?

Jednym z głównych założeń było to, że obsługiwany serwis będzie _mały_. To znaczy, że będzie miał jednego czy dwóch edytorów, a ruch nie przekroczy 100 odwiedzających na godzinę. Realia BIP instytucji o zakresie gminnym.

Dodatkowe _ekstrasy_ były takie:

-   w miarę możliwości zmieścić się w najtańszej ofercie VPS na polskim rynku
-   w miarę możliwości nie wymagać żadnego extra softu typu serwer bazy danych
-   i niech instalacja będzie jak najprostsza

Z tych dodatkowych rzeczy na razie udało mi się osiągnąć 2 pierwsze - do uruchomienia i _zadowalającego działania przy zwyczajowym ruchu_ (dla biuletynów informacji publicznej instytucji na poziomie gminnym) wystarczy VPS z 1 core i 1 GB RAM, do tego 10 GB storage, a parametry połączenia ze SQLite zostały tak ustawione, by działała dobrze w sytuacji _wielu czytających, jeden edytor_.

Instalację możnaby chyba było uprościć, ale to jest sprawa do przepracowania. Mam świadomość tego, że jest trochę skomplikowana.

## Gdzie jesteśmy

Zgodnie z [dokumentem](https://bip.readthedocs.io/pl/latest/roadmap.html), który sam dla siebie wyprodukowałem, osiągnięcie fazy _basic feature complete_ to jest wersja 0.6, i tę właśnie wersję [opublikowałem dziś w PyPI](https://pypi.org/project/biuletyn-bip/0.6.0/). To ledwo nieco dalej niż połowa drogi, a to co zostało jest o wiele mniej przyjemne niż to, co do tej pory zostało zrobione - czyli dokumentacja, podręczniki użytkownika i administratora, poprawa łatwości instalacji i codziennej administracji serwisem.

Kiedy można się spodziewać 1.0? To w dużej mierze zależy od decyzji Ministra Zdrowia oraz rządu RP - im więcej rygorów i obostrzeń związanych z SARS-CoV2, tym więcej mam czasu na robotę, ale zważywszy że nadchodzi lato, to wersji finalnej nie należy się spodziewać wcześniej niż w listopadzie-grudniu 2020. Jakieś 15-18 miesięcy w sumie...

## Nauczka

O, bardzo cenna jedna. Warto jest robić rzeczy pożyteczne i przeprowadzać je przez stany przejściowe, coraz bliżej finału. Mam ogromną satysfakcję.

Mam nadzieję że komuś ta aplikacja się przyda.

Aplikacja BIP jest udostępniana zgodnie z warunkami licencji [GNU GPL, wersja 3](https://www.gnu.org/licenses/gpl-3.0.html).

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

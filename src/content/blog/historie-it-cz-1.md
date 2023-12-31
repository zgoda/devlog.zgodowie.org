---
title: Historie IT, część 1
pubDate: 2020-01-26T13:51:00
author: Jarek
tags:
    - truestorybro
    - tagbylo
    - praca
description: 'Był początek roku 2014.'
imageUrl: https://i.imgur.com/gLpAfHOh.jpg
---

Całkiem niedawno temu na pewnej fejsbókowej grupie pojawił się link do [pewnego artykułu](https://danluu.com/wat/) na temat _dewiacji_ w środowiskach IT, który po przeczytaniu zainspirował mnie do opisania historii z _najbardziej zjebanej firmy w której przyszło mi pracować_. Nie było to wcale tak dawno temu, a cała historia też nie jest bardzo długa, bo i krótko tam pracowałem.

![Dużo dobrych rzeczy](https://i.imgur.com/gLpAfHOh.jpg)

Był początek roku 2014. Startup w którym pracowałem właśnie po cichu dokonał żywota po nieudanej próbie zdobycia dużego kontraktu w rosyjskim banku. Nie udało się skutecznie zahaczyć w branży spożywczej więc musiałem poszukać sobie ponownie zajęcia przy programowaniu. Jako że plany były takie, by jednak ostatecznie opuścić IT i rozpocząć _nowe życie_ w spożywce, to specjalnie nie przebierałem w ofertach, traktując pracę w IT jako zajęcie tymczasowe.

Firma była dość duża. Mieściła się w dobrze rozpoznanej okolicy poprzedniej pracy (wiadomo gdzie _chińczyk_, gdzie _kebsy_, gdzie _obiady domowe_). Projekt: system obsługi call center dla klienta wewnętrznego w Django i bardzo mało Javascriptu, w którym podówczas nie czułem się zbyt pewnie. Co może pójść źle?

W poniedziałek stawiłem się w pracy o 8:50 i po odczekaniu tych ekstra 10 minut ktoś do mnie przyszedł. Warunki zatrudnienia już znałem, więc teraz miałem się zapoznać z warunkami wykonywania pracy. Dostałem licznik czasu, który miałem włączyć gdy zacznę wykonywać pracę, a wyłączać za każdym razem gdy przerwę. No ok. O godzinie 9:15 byliśmy pod drzwiami biura gdzie miałem pracować i przez następne 20 minut byłem szkolony z używania systemu biometrycznego, który wpuszcza do dostępnych obszarów biura. Jak się okazało, toaleta była w tym samym korytarzu, ale z powodu zabezpieczeń przeciwpożarowych żeby się do niej dostać trzeba było przejść przez recepcję od drugiej strony, po drodze dwukrotnie mijając bramki biometryczne. Jak biometryka oparta na skanowaniu twarzy oraz odciskach palca działała w 2014 roku to chyba nie muszę wspominać, więc należało się uzbroić w cierpliwość i ogromne pokłady spokoju, bo po 3 nieudanych próbach rozpoznania system blokował się na 5 minut. Wyobraźcie sobie teraz, że stoicie z pełnym pęcherzem pod taką bramką. Ale nawet jeżeli udało się ją pokonać, to centralizacja systemu powodowała, że następne odblokowanie (a więc np. odblokowanie kolejnej bramki na drodze do toalety) mogło nastąpić dopiero po 5 minutach.

OK, to znaczy że na siku trzeba wychodzić od razu jak się zachce, a nie czekać aż naprawdę będzie trzeba. Jakoś to przeżyję.

Dostałem laptop Dell, nie najgorszy, ale też nie żaden wypas. Ot, taki zwykły. Do niego płytę z Ubuntu 12.04 i proszę, zainstaluj sobie. Zaraz, miałem pracować! Mogę sobie czas przeznaczony na instalację systemu wliczyć do czasu pracy? Nie. O wy chuje.

Dochodziło południe gdy narzędzie miałem gotowe do pracy. Jako że i tak nie wykonywałem żadnej płatnej pracy, to czekając na zakończenie instalacji zwiedziłem biuro. Nic ciekawego, dużo obcokrajowców typu Portugalczycy, Hiszpanie, Włosi czy Francuzi, trochę Rosjan. Raz udało mi się włączyć _intrusion alarm_ gdy trzykrotnie spróbowałem przejść przez bramkę do obszaru do którego nie miałem mieć dostępu. Uznając w południe, że nie ma co zaczynać pracy na pół godziny, poszedłem do okolicznej stołówki na obiad. Po obiedzie współpracownik miał mnie wprowadzić w arkana projektu, więc była szansa że wreszcie zacznę robić coś _za pieniądze_.

Wtedy okazało się jakim zjebem był typ od bezpieczeństwa w firmie. Kod znajdował się w repo Git, do którego dostęp był tylko z jednej maszyny. Ta z kolei maszyna była dostępna z biura tylko i wyłącznie przez VPN. Oczywiście nie było mowy o żadnym tunelu SSH, zresztą jak się okazało był **kategoryczny zakaz pobierania lokalnej kopii repozytorium**. Przy pewnej gimnastyce udało mi się przy użyciu `sshfs` zamontować zdalny system plików lokalnie, co dało jakąkolwiek możliwość w miarę cywilizowanego edytowania kodu. Współpracownicy patrzyli na mnie jak na heretyka którego w każdej chwili mógł porazić boży gniew.

Dostałem do zrobienia jakiś ficzer, który zrobiłem w miarę szybko, napisałem testy i zgłosiłem gotowość wysłania kodu do przeglądu i tu po raz kolejny objawił się geniusz zła gościa od bezpieczeństwa.

> Proszę zrobić patch ze zmianami i wysłać go mailem na adres `xxx@yyy.com.pl`. Damy znać gdy kod zostanie dołączony do mastera.

You fucking kidding me?!

Zabrałem się do domu nie mogąc wyjść z wrażenia, że powinienem szybko stamtąd uciec.

Cały ten tydzień minął mi na wysyłaniu maili z patchami i użeraniu się z bramkami biometrycznymi.

W piątek dostałem maila z zestawieniem przepracowanego czasu w minionym tygodniu. O godzin, 0 minut. Żaden z moich patchy nie został jeszcze dołączony do mastera.

W poniedziałek spędziłem pół godziny pod bramką wejściową na mój korytarz. W weekend nie było prądu i cała baza wzorców biometrycznych poszła w pioch, ale nikt o tym nie zostawił żadnej informacji. Musiałem się ponownie rejestrować przy użyciu identyfikatora pracownika, którego nikt nie nosił ze sobą, bo kara za zagubienie to były jakieś grube tysiące złotych.

We wtorek 2 z 8 patchy zostały dołączone do mastera. Ilość godzin przepracowanych w ubiegłym tygodniu wyniosła bezsporne 4, sporne 1. PM stwierdził że 3 godziny to za dużo jak na jeden z ficzerów i zaliczył mi tylko 2 godziny. Około 14 zadzwonił gościu z jednej z firm do których się rekrutowałem i zaprosił mnie na spotkanie żeby omówić warunki zatrudnienia. Do 17 udało mi się jeszcze 4 razy uruchomić _intrusion alarm_.

Do piątku czas mijał mi na wysyłaniu kolejnych patchy i uruchamianiu _intrusion alarm_. Na piętrze na którym pracowałem znalazłem 6 bramek których nie mogłem przejść i atakowałem je na przemian.

W piątek przed obiadem poprosiłem recepcjonistkę o potajemne wydrukowanie mi rozwiązania umowy z dniem dzisiejszym i poszedłem coś zjeść do nieodległego _chińczyka_. Wracając wpadłem do _haerów_ i zostawiłem rozwiązanie umowy. Wróciłem do pokoju, wyłączyłem komputer, zabrałem przygotowane wcześniej bambetle i wyszedłem z biura. Już na dole przed budynkiem odebrałem telefon od dyrektora działu.

> ...

> Nie, nie chcę pracować w takim środowisku.

> ...

> Nie, wyślę wam fakturę i jak jej nie zapłacicie to pójdziemy do sądu.

> ...

> Nie, nie mamy o czym dyskutować.

W końcu po 2 tygodniach wymiany maili zapłacili fakturę, na której wykazałem 60 (z 80) przepracowanych godzin, a ja zacząłem pracować w zupełnie innych warunkach.

Paradoks sprawił, że 5 lat później firma ta wprowadziła się do tego samego budynku, gdzie pracuję obecnie. Nie wiem, czy ten gość od bezpieczeństwa nadal tam pracuje.

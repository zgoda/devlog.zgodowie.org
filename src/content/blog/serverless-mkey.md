---
title: Serverless, mkey
pubDate: 2020-01-23T13:23:00
tags:
    - serverless
    - python
    - rant
author: Jarek
description: Serverless, serverless, serverless!
imageUrl: https://i.imgur.com/1MER1b7h.jpg
---

Serverless, serverless, serverless!

![Nie ma przypadków, są tylko znaki](https://i.imgur.com/1MER1b7h.jpg)

W pracy dużo robimy na lambadzie i różnych innych _serwerlesach_ z AWS. Wszystko w imię oszczędności i w ogóle, samo się skaluje, jest proste i przejrzyste, _krawaty wiąże i usuwa ciąże_. Hehehe. Proste to było na początku, ale jak teraz template do stacka CloudFormation ma ponad 2500 linii, to jest cud że jeszcze ktoś nad tym panuje.

No ale ja nie o tym chciałem, a właśnie o tym, kiedy te _serwerlesy_ nie mają w ogóle, nigdy, żadnego uzasadnienia i są tylko kulą u nogi. A wcale do tego wiele nie trzeba, wystarczy ok. 10 złotych miesięcznie, a zabawy z tego można mieć znacznie więcej.

Zaglądasz na stronę _lokalnego dostawcy usług internetowych_ i patrzysz jakąż to ma cenę za najtańszy VPS. Będzie to około 10 zł miesięcznie, a może nawet mniej. Za tyle dostajesz wirtualkę z 1 CPU, 2 GB RAM i tak pod 20 GB _storage_ na dysku SSD (zwykłym albo NVMe). Co prawda istnieją _serwerlesy_ które możesz mieć za darmo, np ZEIT Now, ale jak spojrzysz na ograniczenia, to się słabo robi, dostaniesz ok. 0,6 vCPU, 1 GB RAM i ograniczenie do 10 sekund czasu wykonywania. Oferta płatna wygląda nieco lepiej, ale tylko nieco, bo wcale nie dużo. Zasadniczo to samo możesz mieć na AWS, ale za storage po roku trzeba będzie zacząć płacić. Czyli robić dokładnie to samo, co ze swoim VPS.

A teraz spójrzmy czym kuszą _serwerlesy_.

## Painless deployment

Jest on _painless_ tak długo, jak robisz najprostsze rzeczy, korzystając z narzędzi pobłogosławionych przez dostawcę. W przypadku AWS to będzie SAM CLI, w przypadku ZEIT program `now`. Ale na AWS czeka cię jeszcze fura zabawy w wyklikanie odpowiednich ról IAM dla _lambady_. Jak zrobić automatyzację deploja to napisano już wiele książek i sporo osób dzięki dochodom z tego jest rentierami w wieku 30 lat.

## Automated scaling

Ale tylko do granicy limitu na karcie kredytowej. Lub do limitu nałożonego na ofertę _za free_. Czyli w sumie nie tak dużo, o ile nie zamierzasz zawstydzać kolegów devów na dyskotece Dierżążni. Mówię o zastosowaniach _łagodnie hobbistycznych_. Naprzeciw tego masz VPS za 10 złotych miesięcznie. 5 Perlenbacherów w puszce, albo 4 w butelce. Zielonej. Najwyżej cię zdosują, ale sam sobie będziesz winien, jeżeli się przed tym nie zabezpieczysz.

## No provisioning

Śmiech szczególny bierze mnie na ten argument zwłaszcza w przypadku AWS. Zanim odpali się _serwerlesa_ to się tam trzeba nieźle naklikać. ZEIT zwalnia z większości tego koszmaru, dodatkowo dając jednoczesny _deploj_ statyków i kodu, ale powiedzmy sobie szczerze, _flexibility_ to tam jest marne, a baboli całe morze.

Nie żebym _serwerlesów_ nie lubił, bo je lubię. Ale jeszcze bardziej lubię się bawić _na swoim_, choćby było gównianym VPS-em za 10 złotych miesięcznie.

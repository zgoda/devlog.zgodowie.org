---
title: Javascriptowe frameworki do UI, koniec 2019
pubDate: 2020-01-10T22:16:00
tags:
    - javascript
author: Jarek
---

Z racji konieczności zawodowych musiałem pod koniec 2019 roku zapoznać się z kilkoma _wiodącymi_ Javascriptowymi frameworkami UI. Doznałem przy tym niemałego zawrotu głowy. Oraz deja vu, do czego dotrzemy za chwię.

![Don't do this at home](https://i.imgur.com/L1j2unXh.jpg)

One wszystkie są niemal identyczne. React to jest zdaje się _low hanging fruit_ i większość robi po prostu _React ale lepiej_. Tylko że jak się dowiedziałem u źródeł bliskich _origin_ w React wcale nie chodzi o to żeby było lepiej, tylko o to, żeby było łatwo wdrożyć nowego developera, czyli to jest taki _React ale gorzej_. Albo inaczej _weźmiemy z React to co w nim fajne i zrobimy z tego framework dla nikogo_.

Ale spoko, ani mnie to ziębi ani grzeje, ja _robię w pytągu_ i na Javascript staram się patrzeć przez pryzmat jego dobrych stron. Widziałem książkę (dość cienką) na ten temat, tak że jak sądzę nie jestem sam.

No ale jednak czasem muszę *coś dziabnąć w tej jawie z krypty* i tu się dopiero zaczyna. React - spoko, dam radę, tylko później się użerać z _code splitting_, żeby to nie było jakieś wielkie? Ja to robię sam, nikt mi tego nie obskoczy... To samo z Vue (Vue nie jest jak React i ja to doceniam). Sam się z tym będę użerał? Svelte... No nie wiem. Naprawdę nie wiem. Wygląda fajnie, ale jak zacząłem szukać jak zrobić proxy do backendu podczas developmentu to mi się odechciało. Jeszcze bardziej niż z Django i Pyramid. Znaczy, z Reactem i Vue.

Ale jak już porównałem React do Django, to mam również porównanie do Flask - to Preact. Jak dla mnie pisze się kod dokładnie tak samo jak pod React, ale paru rzeczy nie ma i w efekcie _bundle_ to ułamek tego, co wychodzi z Reacta. Pod Flask tak samo się  pisze kod jak pod Django, tylko nic nie działa.

A że nie jest tak szybkie jak Inferno? Lel. Zapewne nawet nie zauważę. I _końcowy użytkownik_ również nie. Tak samo jak zamienię backend na `async` czy w ogóle na Sanic.

## Deja Vu

A teraz na chwilę powrócę do wspomnianego wcześniej deja vu, czyli po naszemu _powidoku_.

Ja to już widziałem. 10 lat temu było to samo z _microframeworkami_ w Pythonie. A wcześniej w ogóle z _web devem_. Widzę to od 2005 roku, czyli od kiedy świat ocipiał na punkcie Django i Ruby on Rails. Potem były microframeworki, kolejny ocip na fali którego dostaliśmy Sinatrę i Flask, aż wreszcie gówniarze przejęli władzę nad pilotem w momencie gdy pojawiło się Node.js i wtedy już poszło z górki. Czy w dobrą stronę to zrób `ls -l node_modules` i po przeczytaniu listy pakietów wnioskując o ich funkcjonalności z nazwy sam sobie odpowiedz na pytanie czy to ma sens.

Czy to coś złego? Broń Boże. Tylko naprawdę nie ma się czym podniecać. Za rok czy dwa pojawi się nowy hajp i frameworki UI przestaną rozpalać wyobraźnię. Za rok lub dwa będzie wiadomo co jest _sustainable_ w tej dziedzinie, natomiast [pojawi się jakaś zupełnie nowa](https://www.destroyallsoftware.com/talks/the-birth-and-death-of-javascript), o której nic nie wiadomo i tu się szarlataneria zapewne odnajdzie.

Na szczęście dopóki klient pali pieniędzmi w **naszym piecu** to nikt nie ma prawa nazwać tego marnotrawstwem.

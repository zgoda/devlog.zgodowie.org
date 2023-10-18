---
title: ActivityPub - notes to self
author: Jarek
pubDate: 2020-12-21T00:11:00
tags:
    - programowanie
    - python
    - activitypub
description: Domyślacie się już co będzie robione na Devlogu? Chodzi w skrócie o to, żeby mieć gdzie zapisywać krótkie notatki, jedno zdanie, może dwa. Czasem krótkie nagranie głosowe.
isTechRelated: true
---

Domyślacie się już co będzie robione na Devlogu? Chodzi w skrócie o to, żeby mieć gdzie zapisywać krótkie notatki, jedno zdanie, może dwa. Czasem krótkie nagranie głosowe.

Poza kilkoma aktywnie rozwijanymi projektami wygląda to tak, jakby ok. 3 lata temu zainteresowanie nagle wybuchło, po czym równie nagle wygasło w połowie 2019 roku.

## Implementacje

-   implementacja przykładowa w Ruby: [Mastodon](https://github.com/tootsuite/mastodon), chyba najczęściej używana
-   [GNU Social](https://git.gnu.io/gnu/gnu-social/), ciekawostka (w PHP)
-   [Osada](https://codeberg.org/zot/osada), ciekawa implementacja łącząca protokół Zot6 z ActivityPub, również w PHP
-   implementacja przykładowa w Rust: [Plume](https://github.com/Plume-org/Plume) (zdaje się że to coś większego, a ActivityPub jest tylko na doczepkę)
-   implementacja w Elixirze: [Pleroma](https://pleroma.social/), frontend w [Vue.js](https://vuejs.org/)
-   implementacja w TS: [Misskey](https://github.com/syuilo/misskey), ciekawy motyw, Japonia się przelewa wierzchem
-   kolejna implementacja przykładowa w Rust: [Rustodon](https://github.com/rustodon/rustodon)
-   [przykładowa implementacja](https://github.com/dariusk/express-activitypub) w Express/Node oraz [jej opis](https://hacks.mozilla.org/2018/11/decentralizing-social-interactions-with-activitypub/), bardzo uproszczona
-   [przykład s2s (federation) w Go](https://go-fed.org/activitypub-tutorial) z pewnymi wskazówkami

## Meta

-   [rekomendacja W3C](https://www.w3.org/TR/activitypub/), tu należy zacząć
-   słownictwo i format [Activity Streams](https://www.w3.org/TR/activitystreams-core/)
-   [JSON-LD](https://www.w3.org/TR/json-ld/) jest używany jako warstwa transportowa
-   jakaś [lista projektów](https://awesomeopensource.com/projects/activitypub) związanych z ActivityPub
-   [wyjaśnienie podstaw](https://blog.joinmastodon.org/2018/06/how-to-implement-a-basic-activitypub-server/)
-   [dogłębne wyjaśnienie](https://raw.githubusercontent.com/w3c/activitypub/gh-pages/activitypub-tutorial.txt)
-   [wskazówki](https://socialhub.activitypub.rocks/t/guide-for-new-activitypub-implementers/479) dla implementujących ActivityPub

## Pytąg

-   [przykład w Django](https://github.com/tOkeshu/activitypub-example)
-   [biblioteka dla Pythona](https://github.com/dsblank/activitypub), która wyewoluowała z implementacji w Tornado
-   [serwer pod Flask](https://github.com/rowanlupton/pylodon), MongoDB jako data storage

## Krytyka

Tu się zaczyna robić ciekawie. Po pierwszej chwili zainteresowania (_o, jakie to fajne, może by tak coś?..._) z przyzwyczajenia pogóglałem za _what's wrong with ActivityPub_ no i tu się pojawiły konkrety. Muszę przyznać, że nie wygląda to za dobrze. W szczególności nie tego się spodziewałem jako wyniku pracy komitetu W3C. No ale z czym przyszło żyć, z tym trzeba się będzie mierzyć.

-   odrzucony ticket w Diasporze, [proponujący implementację ActivityPub](https://github.com/diaspora/diaspora/issues/7422), dyskusja podnosi wiele kwestii które są albo niedoprecyzowane albo w ogóle pominięte w specu ActivityPub
-   uwagi Dennisa Schuberta z Diaspory, [początkowe z 2018](https://schub.wtf/blog/2018/02/01/activitypub-one-protocol-to-rule-them-all.html) i [przemyślenia po roku](https://schub.wtf/blog/2019/01/13/activitypub-final-thoughts-one-year-later.html), krytyka obejmuje zarówno _community_ wokół ActivityPub, jak i same propozycje zawarte w specu
-   Dennis Schubert przywołuje na koniec swojego drugiego artykułu kilka innych artykułów krytykujących zarówno proces powstawania speca, jak i jego rezultat, m.in. [autora wspomnianej wyżej biblioteki w Go](https://webcache.googleusercontent.com/search?q=cache:PHBR0-cBjpIJ:https://cjslep.com/c/blog/an-activitypub-philosophy+&cd=1&hl=pl&ct=clnk&gl=pl) (zawartość z cache Google, bo serwer źródłowy chwilowo niedostępny)
-   krytyka (również przywołana przez Dennisa Schuberta) od strony technologicznej, zaufania i prywatności; domyślam się że Ariadne Conill należy do grona developerów Pleromy - [część 1](https://blog.dereferenced.org/activitypub-the-worse-is-better-approach-to-federated-social-networking) i [część 2](https://blog.dereferenced.org/activitypub-the-present-state-or-why-saving-the-worse-is-better-virus-is), niestety proponowane rozwiązania przy użyciu elementów protokołu [LitePub](https://litepub.social/) to stąpanie po kruchym lodzie, bo protokół jest martwy od połowy 2019 roku (uwaga, strona ma nieważny certyfikat, z zachowaniem ostrożności można ją obejrzeć)

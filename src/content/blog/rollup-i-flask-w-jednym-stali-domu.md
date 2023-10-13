---
title: Rollup i Flask w jednym stali domu
author: Jarek
pubDate: 2020-08-02T00:17:00
tags:
    - python
    - javascript
    - flask
    - rollup
    - es6
description: Javascript na froncie i Flask na backu to są dwa światy, które pożenić nie jest ze sobą prosto. Oto dalszy ciąg moich przygód z Rollupem.
---

Ostatnio spróbowałem zaprząc Webassets do tego, by wyprodukowały mi _bundle_ z kodem w JS tak, bym mógł go zaimportować. To się udało, ale szybko się okazało, że efekt jest daleki od zadowalającego - i to pomimo że działa.

![Golden hour](https://i.imgur.com/PBUc7tIh.jpg)

Po pierwsze, ~~nie mają armat~~ debugowanie tego to mordęga. Webassets (a za nim i Flask-Assets) nie produkuje _source map_, więc nawet podłączenie _na siłę_ preact-devtools wyświetla jedynie jakieś dziwne znaczki. Po drugie, nie da się wyprodukować manifestu. A po trzecie pomimo tego że Rollup to potrafi, to Webassets nie ma czegoś co produkowałoby _chunked bundle_. Zacząłem od takiej modyfikacji konfiguracji Rollupa, która po uruchomieniu `npx rollup -c` wyprodukowałaby mi pożądany efekt, a potem już jest tylko to, co robię od 25 lat. Czyli oprogramowanie procesu.

Najlepiej byłoby wraz z aplikacją odpalać Rollup w trybie obserwowania (`--watch`), ale to by mi zabiło baterię w lapku momentalnie. Dlatego postanowiłem podążyć ścieżką Webassets i zrobić rozszerzenie do Flaska, które będzie działało trochę podobnie, ale tylko z Rollupem - i wykorzystywało całą moc jaką Rollup dostarcza.

### Enter Flask-Rollup

Na razie rozszerzenie jest rozwijane w gałęzi `v3` kodu Brewlogu, ale docelowo będę je chciał wydzielić i rozwijać oddzielnie. W skrócie chodzi o to, by wykorzystać jak najwięcej możliwości Rollupa, tzn pozwolić mu działać w jego naturalny sposób.

Jak to ma działać?

Centralnym punktem jest plik konfiguracyjny Rollupa `rollup.config.js`, który będzie definiował wszystko, poza nazwami _entrypointów_ i ścieżkami do nich. Tylko to będzie przekazywane w postaci linii poleceń do wykonania programu, a cała reszta ma być załadowana z pliku konfiguracyjnego Rollupa. Z tego wynika, że część _CLI_ będzie ważnym elementem (którego jeszcze nie ma), bo raczej nie ma sensu dystrybuowanie specjalnego pliku `package.json`, zwłaszcza że rzeczy które ma on instalować podlegają sporej zmienności. Tak, że workflow jaki przewiduję będzie następujący:

```console
appcli rollup init
appcli rollup run
```

Krok `init` wygeneruje domyślny `package.json` i zainstaluje co trzeba (to obejmie `npm init`, utworzenie `package.json` oraz uruchmienie `npm install`), a następnie krok `run` uruchomi Rollupa dla całego projektu używając zdefiniowanych zbiorów zasobów.

Możliwe że będzie jeszcze krok `update`, który mógłby być prostym _wrapperem_ na `npm install`, ale raczej nie chciałbym się dłubać z wrapperami do modyfikacji `package.json`, niech to będzie załatwione normalnie przez `npm install --save-dev pkgname`. Tak że to jest kwestia do rozważenia, na pewno nie do wersji 1.0.

### Plan 1.0

-   instalacja i wstępne ustawienie Rollupa oraz podstawowych pluginów (`node-resolve`, `commonjs` i `terser`)
-   wygenerowanie domyślnego pliku konfiguracji Rollupa
-   uruchomienie Rollupa z definicjami zbiorów zasobów aplikacji
-   automatyczne regenerowanie zbiorów zasobów aplikacji w trybie `development`

### Czego to ma nie robić

Przede wszystkim ma nie dotykać niczego, co nie jest Javascriptem, a więc SASS/SCSS i innych tego typu rzeczy. Nie wykluczam Typescriptu i innych opcji _transpilowalnych_ np przez Babel, ale jedynym zakresem działania ma być Javascript, a w szczególności ES6 - na wyjściu.

Dobrze, że dałem sobie tyle czasu na Brewlog v3. ;)

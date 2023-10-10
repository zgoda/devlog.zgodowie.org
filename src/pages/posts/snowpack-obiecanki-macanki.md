---
title: Snowpack, obiecanki-macanki
author: jarek
date: 2020-08-27T10:30:00
tags:
  - javascript
  - es6
  - jsx
  - snowpack
description: I kolejny raz "miało być pięknie, a wyszło jak zwykle". Obietnica "unbundled development", początkowo bardzo kusząca, okazała się nie do końca pasować do niektórych modeli aplikacji.
---

Nowy zawodnik na dzielnicy obiecuje *unbundled development*, ale jednak gdy się bliżej zapoznać z ofertą, to jak zwykle najważniejsze jest to co małym drukiem. A małym drukiem napisane jest, że *oferta dotyczy wybranych modeli*. Których? Akurat nie tych, które mnie interesują.

->![Froccs](https://i.imgur.com/l7jfa5Ah.jpg)<-

<!-- more -->

Po tym jak dodałem do mojej konfiguracji [Flask-Rollup](https://pypi.org/project/Flask-Rollup/) (a właściwie samego Rollupa) w Brewlogu v3 plugin do tłumaczania JSX na Javascript, proces przebudowywania *bundle* zaczął zajmować zauważalnie więcej czasu, co niekorzystnie wpływa na samopoczucie mnie jako developera - po każdej zmianie w module JS trzeba odczekać jakąś sekundę, aż Rollup to wszystko przemieli.

I nagle uwagę moją przykuł slogan *unbundled development*, który mignął mi na jakiejś hype-liście. O, czyżby właśnie rozwiązanie mojego problemu? Czyżby ostatecznie udało się wprowadzić *webdev* na poziom ponad javascriptową autarkię? Natywnie ładowane moduły ES6 ze starannie przygotowanej lokalizacji?

->![A jednak nie](https://i.imgur.com/qBfzpOLh.jpg)<-

No, jednak nie. To co [Snowpack](https://www.snowpack.dev/) robi jest może i sprytne, a na pewno bardzo zaawansowane techonologicznie, ale robi to wszystko... w pamięci. Przynajmniej to, co by mi się przydało, tj translację JSX. Aby z tego skorzystać musiałbym uruchomić Snowpacka, z niego dopiero aplikację we Flasku i ustawić w Snowpacku żeby jego dev server działał jako proxy - a to zupełnie nie odpowiada mojemu wyobrażeniu o *upraszczaniu procesu*. Od niedawna Snowpack ma również opcję automatycznego przebudowywania *bundle* po zauważeniu zmian w kodzie, ale dziwnym trafem nie udało mi się jeszcze przekonać go, że *entrypoint* znajduje się w katalogu `src/brewlog/static/js`, jak również że nie jest to plik `index.js` - o tym że takich entrypointów w mojej aplikacji jest dużo to już nie wspominam. Efekt tego jest taki, że w `static/web_modules` mam gotowy do użycia Preact, ale kod mojej aplikacji w JS nadal sobie leży w `static/js/dashboard.jsx` i Snowpack go po prostu ignoruje. Próba zaimportowania CSS/SCSS/SASS z `node_modules` też kończy się niczym.

Męczyłem się z tym cały wieczór, niestety - ostatecznie bez sukcesu. Będę miał ten wynalazek na oku, ale w wersji 2.9 nie spełnia on moich oczekiwań. Jeszcze nie i wygląda na to że jeszcze długo, długo nie. Co jest również nieco deprymujące, wygląda na to ze nikt inny nie próbuje tematu *unbundling development* rozwijać, więc cała nadzieja to tylko Snowpack.

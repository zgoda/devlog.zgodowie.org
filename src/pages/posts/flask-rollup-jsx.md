---
title: Flask-Rollup i JSX
author: jarek
date: 2020-08-20T14:27:00
tags:
  - flask
  - rollup
  - jsx
description: Nie jest to może szczególnie trudne, ale ręczne złożenie do kupy rzeczy, które normalnie robi jakiś skrypt (w dodatku napisany w javascripcie) nie zawsze jest trywialne. Jak np. transpilowanie JSX przez Rollup.
---

Decydując się na *dodanie reaktywności* do Brewlogu v3 ustaliłem sobie bardzo prosty zestaw narzędzi - [Preact](https://preactjs.com/) + [HTM](https://github.com/developit/htm). Wydawało mi się to całkiem rozsądne, że w procesie obróbki Javascriptu nie występuje etap przetłumaczania czegoś dziwnego na Javascript. Powiedzmy sobie jednak szczerze, jest to umartwienie.

->![Dat sky!](https://i.imgur.com/VyTzB36h.jpg)<-

<!-- more -->

Dlatego gdy tylko udało mi się doprowadzić [Rollup](https://rollupjs.org/) do jako-takiego działania przy użyciu mojego własnego rozszerzenia [Flask-Rollup](https://pypi.org/project/Flask-Rollup/) (ta-dam!, shameless plug), zacząłem się rozglądać jakby tu sobie ułatwić życie.

Dla ustalenia uwagi, jest to aplikacja we Flasku, w której kod JS jest ładowany z zasobów statycznych jako moduł ES6, po jednym na każdej stronie i jest to jedyny kod JS jaki jest na stronie importowany. Można powiedzieć, że jest to jedna aplikacja w Pythonie i pewna ilość aplikacji w Javascripcie, ponieważ każdy moduł eksportuje właśnie komponent aplikacji (i jeszcze kilka rzeczy, ale o tem - potem).

Początek *wersji działającej* był taki:

```html+jinja
{% block scripts %}
<script type="module">
  import { html, render, Dashboard } from '{{ jsbundle(request.endpoint) }}';
  const brewsets = JSON.parse(document.getElementById('brewsets-data').textContent);
  const csrfToken = document.getElementById('csrf-token').textContent;
  render(
    html`<${Dashboard} brewsets=${brewsets} csrfToken=${csrfToken} />`,
    document.getElementById('dashboard-block'),
  );
</script>
{% endblock %}
```

To `html` to jest właśnie Hyperscript Tagged Markup z pakietu HTM. Obecna wersja działająca wygląda tak:

```html+jinja
{% block scripts %}
<script type="module">
  import { h, render, Dashboard } from '{{ jsbundle(request.endpoint) }}';
  const brewsets = JSON.parse(document.getElementById('brewsets-data').textContent);
  const csrfToken = document.getElementById('csrf-token').textContent;
  render(h(Dashboard, { brewsets, csrfToken }), document.getElementById('dashboard-block'));
</script>
{% endblock %}
```

Zasadnicza różnica jest w linijce, w której wykonywana jest funkcja `render()`: to `h` to jest funkcja produkująca fragment wirtualnego DOM pochodząca z Preact - a wszystko po to, by się pozbyć HTM. Nie żebym miał coś przeciwko niemu, bo to mały i przyjemny moduł, ale po co on, skoro można go nie używać?

```javascript
const Dashboard = ({ brewsets, csrfToken }) => {
  return html`
    <div>
      <div class="columns">
        <${Fermenting} brews=${brewsets.fermenting} token=${csrfToken} />
        <${Maturing} brews=${brewsets.maturing} />
      </div>
      <div class="columns">
        <${Dispensing} brews=${brewsets.dispensing} />
        <${Recipes} brews=${brewsets.recipes} />
      </div>
    </div>
  `;
}
```

A można na przykład zrobić tak, co wygląda na znacznie bardziej czytelne:

```jsx
const Dashboard = ({ brewsets, csrfToken }) => {
  return (
    <div>
      <div class="columns">
        <Fermenting brews={brewsets.fermenting} token={csrfToken} />
        <Maturing brews={brewsets.maturing} />
      </div>
      <div class="columns">
        <Dispensing brews={brewsets.dispensing} />
        <Recipes brews={brewsets.recipes} />
      </div>
    </div>
  );
}
```

To co widać powyżej to jest oczywiście [JSX](https://facebook.github.io/jsx/) spopularyzowany dzięki ramówce [React](https://reactjs.org/) i używany przez wiele innych bibliotek/ramówek, które operują na wirtualnym DOM - w tym również Preact. Cały myk polega na tym, że nie jest to składnia, którą łyknie przeglądarka, więc podczas budowania paczki z kodem (co u mnie robi Rollup) potrzebny jest jeszcze jeden krok, czyli przetłumaczenie JSX na Javascript.

## Babel, ale nie ten

[Babel](https://pypi.org/project/Babel/) który znamy i kochamy jest starszy i w ogóle bardzo użyteczny, ale to nie ten Babel jest najpopularniejszym Bablem na dzielnicy. Chodzi o [ten Babel](https://babeljs.io/). Ten bardziej popularny Babel tłumaczy jeden Javascript na inny Javascript, a przy okazji umie też przetłumaczyć inne dziwactwa na Javascript, w tym JSX, a to dzięki czujnie dobranym pluginom, presetom i konfiguracji.

Zaczynamy od zainstalowania wszystkiego co będzie potrzebne.

```shell-session
$ npm i -D @babel/core @babel/plugin-transform-react-jsx @rollup/plugin-babel @babel/preset-env

+ @babel/core@7.11.1
+ @babel/plugin-transform-react-jsx@7.10.4
+ @rollup/plugin-babel@5.2.0
+ @babel/preset-env@7.11.0
```

I następnie konfiguracja, w z grubsza nieustalonym porządku. Najpierw Babel.

```json
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "h",
      "pragmaFrag": "Fragment"
    }]
  ],
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "esmodules": true
      },
      "bugfixes": true
    }]
  ]
}

```

Najpierw ustawienia *transpilacji* (serio, to się tak nazywa) JSX, czyli co ma zostać użyte zamiast czego - to `h` zdaje się być znajome i rzeczywiście to jest to samo. Ale potem zaraz dużo ważniejsze ustawienie, czyli predefiniowane ustawienia wyjścia wyprodukowanego przez Babla. Przez cały czas moim celem jest uzyskanie *nowoczesnego* Javascriptu na wyjsciu w postaci modułów ES6. Ustawienia takie jak powyżej odpowiadają z grubsza temu, co oferuje [przyszły domyślny preset dla modułów](https://github.com/babel/preset-modules). 88% ruchu to dla mnie wystarczający współczynnik.

Teraz Rollup. Trzeba dodać import pluginu, zmodyfikować opcje Tersera żeby nie psuł poprawki na Safari 10.1 którą doda Babel i dodać w odpowiednim miejscu plugin do Babla. Kolejność tutaj jest ważna, więc tylko trzeba pamiętać, żeby plugin do Babla był przed `commonjs`. Nie wiem dlaczego i nie chce mi się w to wnikać - w każdym razie inaczej nie działa.

```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";

const isProduction = process.env.NODE_ENV === 'production';

const terserOpts = {
  ecma: 2015,
  compress: {module: true},
  mangle: {module: true},
  rename: {},
  safari10: true
}

export default (async () => ({
  output: {
    format: 'es',
    sourcemap: true,
    entryFileNames: '[name].[hash].js',
  },
  plugins: [
    resolve(),
    babel(),
    commonjs(),
    isProduction && (await import('rollup-plugin-terser')).terser(terserOpts),
  ]
}))();
```

I to już. W modułach obrabianych Rollupem można używać JSX, a Babel przetłumaczy go na Javascript. Pozbycie się HTM nie dało wiele w kontekście rozmiaru paczki, ale kod pisze się trochę wygodniej.

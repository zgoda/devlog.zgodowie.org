---
title: Flask i pakietowanie modułów ES6
author: Jarek
pubDate: 2020-07-30T00:45:00
tags:
    - python
    - javascript
    - es6
    - flask
description: Gdzie kulawy Python nie może tam się Javascriptem podeprze i jakoś uda są spakietować moduły ES6 przy użyciu Flask-Assets. Polecam tego Allegrowicza.
imageUrl: https://i.imgur.com/KCQ6rPth.jpg
isTechRelated: true
---

Spędziłem cały wieczór próbując spakietować (_bundle_) jeden moduł ES6 razem z kodem frameworku którego używał i muszę przyznać że nie jest to prosta rzecz. Być może egzotyczny wybór techologii lub platformy utrudnił mi życie, ale nie sądziłem że będzie _aż tak_.

![Mniam, to było pyszne](https://i.imgur.com/KCQ6rPth.jpg)

Jak zapewne już wszystkim wiadomo, Brewlog v3 jest aplikacją hybrydową - zasadniczo w Pythonie, ale ma kawałki _nowoczesnego frontendu_ w Javascripcie. Otóż te kawałki są w HTML-u ładowane jako moduły ES6 no i żeby było elegancko, ekologicznie i oszczędnie to chciałem zrobić tak:

-   jedno żądanie HTTP po cały kod Javascript potrzebny na stronie
-   kod w Javascripcie jako moduł ES6
-   kod skompresowany tekstowo (_minified_)
-   pakiet dla danej strony zawiera tylko to, co jest używane na tej stronie

Wymagało to znaczących zmian w całym około-javascriptowym środowisku, ale po kolei do wszystkiego dojdziemy.

Oczekiwanie że cały kod Javascript zostanie pobrany jednym żądaniem wymagało użycia _bundlera_. Jest kilka popularnych opcji do wyboru, z których _pierwszorzędne wsparcie_ dla wyjścia w postaci modułów ES6 daje [Rollup](https://rollupjs.org/), w którym ta opcja równiez pojawiła się najwcześniej. W momencie pisania tego tekstu popularny webpack [nadal tego nie robi](https://github.com/webpack/webpack/issues/2933#issuecomment-652942095) (jest to planowane w wersji 5), natomiast implementacja w [ParcelJS](https://v2.parceljs.org/getting-started/webapp/) jest stosunkowo świeża. Niektórzy twierdzą również, że Rollup najlepiej radzi sobie z usuwaniem martwego kodu, tzw _tree shaking_. Wisienką na czubku tortu okazało się, że przy użyciu jednego pluginu dodatkowo mogę mieć dostęp do bibliotek zainstalowanych w lokalnym katalogu `node_modules/`, co zwiększy skuteczność _potrząsania drzewem_. No to jedziemy.

```console
$ npm i --save-dev rollup @rollup/plugin-node-resolve

+ @rollup/plugin-node-resolve@8.4.0
+ rollup@2.23.0
```

Do tego będzie potrzebna konfiguracja w pliku `rollup.config.js`:

```javascript
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    output: {
        format: 'es',
    },
    plugins: [nodeResolve()],
};
```

I to już wystarczy, by w module można było umiescić import symboliczny, który Rollup sobie rozwiąże do konkretnego miejsca w katalogu z zainstalowanymi bibliotekami JS.

Jak się okazało z kompresowaniem kodu modułów jest raczej słabo, bo właściwie robi to tylko [Terser](https://terser.org/) - inne narzędzia dają sobie radę co najwyżej z kodem ES5. Zacząłem od pisania filtra do [Webassets](https://github.com/miracle2k/webassets), implementującego interfejs do tego narzędzia, ale jak obejrzałem opcje wiersza poleceń to mi się odechciało. To jakiś straszliwy barok. Spróbujmy z drugiej strony.

Z drugiej strony, czyli od strony _bundlera_, w moim przypadku Rollup. Konfiguracja Tersera przez plugin do Rollupa nie jest jakoś szczególnie elegancka, ale w ogóle daje się odczytać i jest łatwiej zrozumieć co i jak ma działać.

```console
$ npm i --save-dev rollup-plugin-terser

+ rollup-plugin-terser@6.1.0
```

Jeszcze tylko konfiguracja, żeby robiło co ma robić i produkowało to co ma wyprodukować. Do listy pluginów w `rollup.config.js` trzeba dodać parę ekstra ustawień.

```javascript
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
    output: {
        format: 'es',
    },
    plugins: [
        nodeResolve(),
        terser({
            compress: { ecma: 2015, module: true },
            mangle: { module: true },
            output: { ecma: 2015 },
            parse: { ecma: 2015 },
            rename: {},
        }),
    ],
};
```

I tu przy okazji Rollup rozwiązał jeszcze jeden problem, który wcześniej nie dawał mi spokoju. W Brewlogu jako frameworku do UI używam [Preacta](https://preactjs.com/), dystrybuowanego z procesorem markupu [HTM](https://github.com/developit/htm) w postaci jednego skompresowanego tekstowo modułu JS (skrypty `npm` w HTM robią to zarówno dla Preacta jak i dla Reacta). Do tej pory miałem sobie plik z tym wszystkim gdzieś w repo w zasobach statycznych i w razie potrzeby importowałem ze ścieżki względnej, ale dało się wyczuć, że nie jest to sytuacja idealna (_vendoring_ czegokolwiek to powinna być ostateczna ostateczność, a nie). Podłączając do Rollupa jeszcze plugin rozwiązywania lokalizacji w środowisku Node uzyskałem dostęp do zawartości źródeł w `node_modules/`, a to z kolei dało mi pełną implementację _tree shaking_ - nic tylko importować i korzystać.

No to teraz trzeba to wszystko podłączyć do [Flask-Assets](https://github.com/miracle2k/flask-assets) i będzie działało, na szczęście jest do tego [gotowy plugin](https://pypi.org/project/webassets-rollup/), trochę stary, ale jak na razie nie mam z nim problemów.

```console
$ pip install -U webassets-rollup --upgrade-strategy eager
Requirement already up-to-pubDate: webassets in ./venv/lib/python3.8/site-packages (from webassets-rollup) (2.0)
Installing collected packages: webassets-rollup
Successfully installed webassets-rollup-1.0.0
```

Tam, gdzie mam zdefiniowane pakiety zasobów musiałem podłączyć ten plugin do Rollupa przez zarejestrowanie filtra w Webassets.

```python
from flask_assets import Bundle
from webassets.filter import register_filter
from webassets_rollup import Rollup

register_filter(Rollup)

all_js = Bundle(
    'js/main.js', filters='rollup', output='dist/all.%(version)s.min.js',
)
```

Mały konwenans w aplikacji hybrydowej - moduł z kodem komponentów używanych na stronie nazywa się tak, jak _endpoint_ w aplikacji Flask, zapewne dla ułatwienia nazwy pakietów również tak zostaną zmienione. Moduł Javascriptu eksportuje zarówno głowny komponent, jak i to co jest potrzebne do jego zamontowania.

```javascript
import { html, render } from 'htm/preact';
import { Dashboard } from './dashboard';

export { Dashboard, html, render };
```

Jest to wydmuszka, ale chodzi o to, by ten moduł importował dokładnie tyle, ile będzie używane w miejscu, gdzie zostanie zaimportowany w dokumencie HTML, co pomoże Rollupowi w usuwaniu nieużywanego kodu podczas pakietowania całości. Z samego Preacta i HTM nie ma tego dużo, ale zawsze to jakieś 2 KB mniej. A gdybym zechciał użyć jakiejś ekstra Javascriptowej biblioteki, to już może być konkretny zysk.

```jinja
{% block content %}
<h1>Mój Brewlog</h1>
<div id="dashboard-block"></div>
{% endblock %}

{% block scriptdata %}
<div class="is-hidden" id="brewsets-data">{{ brewsets|tojson|safe }}</div>
{% endblock %}

{% block scripts %}
<script type="module">
  {% assets 'js_all' %}
  import { html, render, Dashboard } from '{{ ASSET_URL }}';
  {% endassets %}
  const brewsets = JSON.parse(document.getElementById('brewsets-data').textContent);
  render(html`<${Dashboard} brewsets=${brewsets} />`, document.getElementById('dashboard-block'));
</script>
{% endblock %}
```

Jak widać, podejście hybrydowe za darmo dostarcza innego _ficzuru_ nowoczesnego Javascriptu, zwanego _code-splitting_, czyli dołączania tylko kodu potrzebnego w miejscu importowania. Na razie ręcznie, ale więcej chyba mi nie potrzeba w obecnej sytuacji.

Ponieważ mój Rollup jest zainstalowany lokalnie, to trzeba jeszcze pluginowi do Webassets powiedzieć gdzie on jest, jak również dać mu znać że ma użyć konkretnego pliku konfiguracyjnego. Dzieje się to w dwóch miejscach.

Ścieżkę do Rollupa podałem mu w zmiennych środowiskowych, razem z pozostałymi narzedziami używanymi przez Webassets.

```shell
export NODE_SASS_BIN="${PWD}/node_modules/.bin/node-sass"
export CLEANCSS_BIN="${PWD}/node_modules/.bin/cleancss"
export ROLLUP_BIN="${PWD}/node_modules/.bin/rollup"
export ROLLUP_CONFIG_JS="${PWD}/rollup.config.js"
```

Dodatkowe parametry podawane w linii poleceń Rollupa są w module konfiguracji aplikacji.

```python
# tool configs
ROLLUP_EXTRA_ARGS = ['-c', os.environ['ROLLUP_CONFIG_JS']]
```

Nie było to wszystko oczywiste, ale w końcu się udało. Co prawda Javascript linter w VS Code pluje się, że ten kawałek Jinja w Javascripcie jest strasznie niepoprawny, ale chyba będę w stanie przeżyć to, że całkowicie wyłączę sprawdzanie poprawności Javascriptu w kodzie HTML (w modułach robi to dla mnie [ESlint](https://eslint.org/)). Dla pewności dodałem to ustawienie tylko w konfiguracji _workspace_.

```json
{
    "html.validate.scripts": false
}
```

Implementacja którą powyżej zaprezentowałem jest stosunkowo świeża i zapewne przejdzie jeszcze kilka iteracji zanim będę z niej całkowicie zadowolony, ale kierunek zdaje się być dobry.

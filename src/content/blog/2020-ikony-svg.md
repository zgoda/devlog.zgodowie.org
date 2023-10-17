---
title: 'Ikony SVG, ponieważ 2020'
author: 'Jarek'
tags:
    - python
    - flask
    - jinja
pubDate: 2020-07-14T20:55:00
description: 'Mamy rok 2020, czas zerwać z nawykami z poprzedniej dekady i wreszcie przestać używać krojów czcionek z ikonami, to jest epoka nowoczesna i właściwym formatem do wyświetlania ikon na WWW jest SVG!'
imageUrl: https://i.imgur.com/xcU7UQIh.jpg
---

Mamy rok 2020, czas zerwać z nawykami z poprzedniej dekady i wreszcie przestać używać krojów czcionek z ikonami, to jest epoka nowoczesna i właściwym formatem do wyświetlania ikon na WWW jest SVG!

![Motherland](https://i.imgur.com/xcU7UQIh.jpg)

Przez lata do wyświetlania piktogramów w aplikacjach webowych używałem [Fontawesome](https://fontawesome.com/) w postaci krojów czcionek skalowalnych. Prosto i bez większych zgrzytów. Czcionka miała zawsze odpowiedni rozmiar zgodny z rozmiarem tekstu elementu - oraz odpowiedni kolor. No ale podobno tak jest źle, a żeby było dobrze to trzeba używać SVG. No ok, to skoro tak ma być, to niech będzie. Nawet się ucieszyłem, bo od dawna podobały mi się piktogramy w zestawie [Feather Icons](https://feathericons.com/), a one są najprościej dostępne jako indywidualne pliki SVG.

Najpierw sobie poczytałem jak to można umieścić w dokumencie. A potem się okazało, że wcale nie będzie prosto. Piktogram w aplikacji czasem pokazuje się na na jasnym tle i wtedy nie przeszkadza to że jest narysowany czarną linią (a właściwie `currentColor`, ale do tego _ficzeru_ jeszcze wrócę), ale czasem pojawia się na kolorowym guziku i wtedy dobrze by było żeby kreska była w tym samym kolorze co tekst obok niego. Piktogramy w zestawie Feather Icons mają kolor linii (`stroke`) ustawiony na `currentColor`, czyli kolor elementu rodzica, więc teoria mówi, że wszystko będzie działać. Żeby się to udało, to musi być mu nadany styl i tu zaczyna się problem z _przechodniością_. Styl ma to do siebie, że jest lokalny w dokumencie i nie da się go zastosować do obiektu z zewnątrz - na przykład załadowanego z pliku. Co prawda SVG jako XML może mieć zdefiniowany styl wbudowany, ale nie o to chodziło, bo przecież guzik raz może być niebieski z białym tekstem, a raz biały z czerwoną obwódką i czerwonym tekstem. To znaczy, przy pewnej dawce Javascriptu da się to zrobić, ale dłubaniny w Javascripcie chciałem właśnie uniknąć. Na dłubaninę w Javascripcie w tym projekcie przyjdzie jeszcze czas.

Jedyny sposób który nie wymaga kombinacji z Javascriptem to osadzenie żywego SVG w dokumencie i lokalne odwołanie. Wtedy zostanie do niego zastosowany właściwy styl i w efekcie wszystko się wyświetli tak jak powinno. Proste?

No więc - nie tym razem.

Po pierwsze, żeby nie osadzać tego samego piktogramu kilkukrotnie w różnych miejscach tego samego dokumentu (tam gdzie ma zostać wyświetlony), to dobrze by było osadzić go raz w postaci niewidocznej i później tylko odwoływać się do referencji. Żeby to się udało, to pojedynczy piktogram musi być osadzony jako `symbol` w jednej strukturze obejmującej wszystkie piktogramy na stronie. Aby łatwo było się do niego odnieść musi mieć charakterystyczny i unikalny atrybut `id`, którego będzie można użyć następnie jako referencji

Obiekt SVG może mieć predefiniowaną wysokość i szerokość podaną w pikselach. Najwyraźniej podanie w CSS wysokości i szerokości `1em` nie wystarcza - przynajmniej mnie się to nie udało. Podczas osadzania ewentualne wartości wysokości i szerokości trzeba zamienić na wartość 100% - niech wypełnia cały element rodzica. To by było dwa.

To że wszystkie piktogramy pokażą się w miejscu osadzenia trzeba załatwić atrybutem `display="none"` na elemencie kolekcji. Pikuś ale jednak trzy.

Plan jest taki: wygenerujemy _skryptem w pytągu_ odpowiedni fragment i wrzucimy go do katalogu szablonów, a następnie dołączymy do głównego szablonu przy użyciu [dyrektywy `include` w Jinja2](https://jinja.palletsprojects.com/en/2.11.x/templates/#include). Do tego jedno makro, które wstawi nam odpowiedni `span` i zawartość piktogramu, żeby nie klepać za dużo w szablonach.

No to do roboty.

## Generator fragmentu

Ponieważ aplikacja jest we [Flasku](https://flask.palletsprojects.com/en/1.1.x/), to do dyspozycji mamy całą maszynerię do linii poleceń [Click](https://click.palletsprojects.com/en/7.x/). Wystarczy podłączyć w odpowiednim miejscu i generator zawsze będzie pod ręką jako jedno z poleceń normalnego flaskowego CLI.

Poniższy kod można zobaczyć w szerszym kontekście [w repo projektu](https://github.com/zgoda/brewlog/blob/v3/src/brewlog/cli.py) (link do gałęzi v3 za jakiś czas będzie nieaktualny, ale ten moduł jest też w `masterze`).

```python
import os
from typing import List
from xml.etree import ElementTree as etree

import click
from defusedxml.ElementTree import parse  # [1]
from flask import current_app
from flask.cli import FlaskGroup

from . import make_app
from .ext import db

def create_app(info):
    return make_app('dev')

cli = FlaskGroup(create_app=create_app)

@cli.group(name='generate')  # [2]
def generate_grp():
    pass

@generate_grp.command(
    name='icons',
    help='Generate Jinja2 include file for SVG icons from specified icon set',
)
@click.argument('iconset')  # [3]
@click.argument('names', nargs=-1)  # [4]
def gen_icons(iconset: str, names: List[str]):
    _default_icons = [  # [5]
        'check',
        'key',
        'lock',
        'log-in',
        'log-out',
        'send',
        'trash',
        'user-plus',
        'user',
    ]
    if names[0] == 'default':  # [6]
        names = _default_icons
    target = os.path.join(
        current_app.root_path, current_app.template_folder, 'includes'
    )
    os.makedirs(target, exist_ok=True)
    target = os.path.join(target, 'icons.html')
    if os.path.isfile(target) and len(names) < len(_default_icons):
        if not click.confirm(
            'You are about to overwrite existing icon includes with smaller set '
            'than default, you sure want to do this?'
        ):
            return
    ns = 'http://www.w3.org/2000/svg'  # [7]
    directory = os.path.join(current_app.static_folder, 'vendor', iconset)
    includes = []
    for name in names:
        fname = f'{name}.svg'
        file_path = os.path.join(directory, fname)
        tree = parse(file_path, forbid_dtd=True)  # [8]
        root = tree.getroot()
        elems = root.findall('*')
        for el in elems:
            _, _, el.tag = el.tag.rpartition('}')  # [9]
        symbol = etree.Element('symbol', attrib=root.attrib)
        symbol.attrib['id'] = name  # [10]
        del symbol.attrib['class']  # [11]
        symbol.attrib['width'] = symbol.attrib['height'] = '100%'  # [12]
        symbol.extend(elems)  # [13]
        includes.append(symbol)
    root = etree.Element('svg', attrib={'display': 'none', 'xmlns': ns})  # [14]
    root.extend(includes)
    with open(target, 'w') as fp:
        fp.write(etree.tostring(root, encoding='unicode', short_empty_elements=False))  # [15]
```

I po kolei wyjaśnione ocb (próbowałem zrobić adnotacje ale chyba _pytągowy_ parser Markdown nie daje z tym rady, jak również rozszerzenie `footnotes` nie działa w zakresach kodu).

1. [defusedxml](https://pypi.org/project/defusedxml/) chroni nas przed paroma przykrymi niespodziankami, jakie mogą się kryć w dokumentach XML - szczególnie pochodzących _ze świata_
1. dzięki temu będzie możliwe uruchomienie skryptu poleceniem `skrypt generate icons ...`, a jakbym chciał kiedyś jeszcze coś generować, to mam już na to grupę poleceń
1. lokalna konwencja, ikony są umieszczone w katalogu z nazwą kolekcji
1. ta konstrukcja umożliwia podanie dowolnej ilości argumentów z nazwami ikon, do funkcji obsługującej są przekazywane jako sekwencja
1. lista domyślnych ikon, tutaj zbiór wszystkich ikon używanych w aplikacji
1. podanie `default` jako pierwszej wartości argumentu nazw ikon spowoduje wygenerowanie zbioru z listy domyślnych ikon
1. jeszcze do tego wrócimy, ale to jest `namespace` dokumentu SVG
1. ponieważ ikony mogą pochodzić z niepewnego źródła, to wyłączamy **wszystkie** niebezpieczne _ficzery_ parsera XML (pozostałe są domyślnie wyłączone)
1. ponowne spotkanie z namespace SVG, tym razem bolało; [ElementTree parsuje i ustawia namespace każdemu elementowi dokumentu](http://effbot.org/zone/element-namespaces.htm); nie muszę dodawać że później są z tym problemy, bo inne parsery nie są takie mądre i _default namespace_ traktują tak, jakby go w ogóle nie było, a tak naprawdę ma je każdy element - w ten sposób pozbywamy się namespace z elementu kalecząc całkowicie poprawny dokument XML
1. ustawiamy charakterystyczny atrybut `id` który będzie odnośnikiem do symbolu
1. usuwamy z SVG atrybut `class`, nie będzie nam potrzebny a zawsze to parę bajtów mniej
1. a to jest ten myk z ustawieniem wymiarów na 100%, szczerze mówiąc nie jestem pewien czy tak to powinno być zrobione
1. dołączamy wszystkie symbole do kolekcji
1. namespace jest jednak wymagane w obiekcie SVG, a to jest jedyny sposób żeby nie zostało ustawione wszystkim elmentom; przy okazji ustawiamy od razu żeby kolekcja się nie wyświetlała
1. gotowy dokument XML zapisujemy bez skracania pustych elementów, bo parserom XML w przeglądarkach zdarza się mieć z tym problemy

Jest prosto i jest potencjał do modyfikacji, jakby ktoś potrzebował coś tam pozmieniać, a dzięki podłączeniu do CLI Flaska skrypt jest zawsze pod ręką.

## Szablony

Wynik działania skryptu trzeba osadzić w szablonie bazowym, najlepiej zaraz na początku elementu `body` - zanim zaczniemy używać ikon w nim zdefiniowanych. Ścieżka względna ma wskazywać na wygenerowany zbiór.

```jinja-html
{% include "includes/icons.html" %}
```

Pozostało jeszcze makro, ale to już jest drobiażdżek.

```jinja-html
{% macro icon(name) %}
<span class="icon"><svg><use xlink:href="#{{ name }}"></svg></span>
{% endmacro %}
```

Makro to jest dostosowane do tego jak się osadza ikony używając [frameworku CSS Bulma](https://bulma.io/), do innych trzeba będzie je dostosować.

Dzięki użyciu tego makra umieszczanie ikon w szablonie jest teraz banalnie proste.

```jinja-html
{% from "macros/icons.html" import icon %}
<a href="{{ url_for('auth.logout') }}">{{ icon('log-out') }} <span>wyloguj</span></a>
```

## Konkluzja

Umęczyłem się z tym niemożebnie, ale w końcu działa. Czy można to zrobić lepiej? Zapewne. Jeżeli ktoś ma pomysł jak to zrobić lepiej, to będzie to dla mnie bezcenne, [proszę o ticket](https://github.com/zgoda/brewlog/issues). Na pewno można dołączyć fragment z SVG przy pomocy SSI zamiast używać dyrektywy `include` z Jinja, ale ze względów bezpieczeństwa wtedy chyba wolałbym przeparsować treść obiektów SVG, żeby się upewnić że niczego niepewnego tam nie ma (Jinja w pewien sposób mnie przed tym zabezpiecza). Jestem również niemal pewien, że można lepiej rozwiązać skalowanie ikon - to moje pierwsze podejście do tematu SVG i nie czuję się w tym jeszcze pewnie.

A czy było warto? No ba, po skompresowaniu gzipem ten fragment z ikonami ma ~650 bajtów, nie ma porównania do rozmiaru Fontawesome jako czcionki, nawet po ograniczeniu go do zestawu który jest używany w aplikacji. Do tego przynajmnie jedno żądanie HTTP mniej - może być zbuforowane, ale przecież nie musi. A pliki z czcionkami nie są małe.

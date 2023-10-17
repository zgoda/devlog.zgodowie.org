---
title: Dobre rzeczy to rzadkość
pubDate: 2019-12-19T18:37:00.000+01:00
author: Jarek
tags:
    - python
    - rant
description: 'Potrzebowałem odświeżenia głowy i postanowiłem przy okazji zapoznawania się z Vue.js spróbować zrobić sobie backend w czymś innym. Żeby nie rzucać się od razu na głęboką wodę to pozostałem przy tradycyjnym WSGI, żeby chociaż deployment był w miarę obcykany.'
imageUrl: https://i.imgur.com/x9MQrRIl.jpg
---

Jak wielka jest to rzadkość to się mogłem przekonać opuściwszy moją _strefę komfortu_ ([Flask](https://flask.palletsprojects.com/) + [SQLAlchemy](https://www.sqlalchemy.org/)). Potrzebowałem odświeżenia głowy i postanowiłem przy okazji zapoznawania się z [Vue.js](https://vuejs.org/) spróbować zrobić sobie _backend_ w czymś innym. Żeby nie rzucać się od razu na głęboką wodę to pozostałem przy tradycyjnym WSGI, żeby chociaż deployment był w miarę _obcykany_.

Przed państwem _dymanic duo_ czyli [Falcon](https://falconframework.org/) + [Pony](https://ponyorm.org/).

![Para z piekła rodem](https://i.imgur.com/x9MQrRIl.jpg)

Zwykle zaczynam od modelu danych, więc na pierwszy ogień poszło Pony. Schemat prosty, bo i aplikacyjka prosta, tu nie było niespodzianek. Kilka metod dostępu do danych, pierwsze test i... WTF? Wyniki obiekty zależne przychodzą w losowej kolejności? Ano właśnie, tak one przychodzą, ponieważ wewnętrzną reprezentacją zbioru obiektów zależnych jest [pythonowy set](https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset), czyli właśnie zbiór, który ma to do siebie, że jest nieuporządkowany. Co generalnie niczego nie psuje tak by się nie dało naprawić, ale czyni kod bardziej skomplikowanym. O to nam chodziło? **No łaczej nie bałdzo panie chłabio**.

Dobra, obejdę to jakoś, świat się nie skończył.

No to teraz Falcon, w końcu jak bardzo można ramówkę opartą na WSGI uczynić niewygodną? O, nie macie pojęcia jak bardzo można. I już nawet nie chodzi o to, że _request handler_ niczego ma nie zwracać, tylko zmodyfikować przekazany obiekty typu `Response` (tak jest podobno szybciej, normalnie _Need For Speed_). Dochodzę do momentu kiedy mam zrobić stronicowanie jakichś tam wyników i czytając dokumentację przecieram oczy - funkcja parasująca parametry z URL czasem zwraca `str`, a czasem `List[str]`. Dlaczego nie dało się tu użyć czegoś w rodzaju `MultiDict`, jaki jest dostępny zarówno w [Werkzeug](https://werkzeug.palletsprojects.com/) jak i w [WebOb](https://docs.pylonsproject.org/projects/webob/en/stable/index.html)? A bo panie tak będzie szybciej. No, wcale nie będzie szybciej, bo ten kod i tak musi zostać napisany, tylko że przeze mnie.

Coś czuję że ledwo musnąłem powierzchnię tego jeziora łajna.

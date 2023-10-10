---
title: Preact, Python, HTM - dalszego ciągu nie będzie
date: 2020-01-25T20:15:00
draft: false
tags:
  - preact
  - python
  - javascript
author: jarek
vssue: false
---

Planowałem napisać serię tutoriali o łączeniu Pythona z Javascriptem _po staremu_, ale skończy się na wprowadzeniu i jednym artykule. To nie ma sensu. Nikt tego nie potrzebuje w 2020 roku.

<!-- more -->

->![Revolt](https://i.imgur.com/iOmtl8xh.jpg)<-

Gdy zaczynałem pisać wprowadzenie i ten pierwszy artykuł byłem niemal pewien, że jest cała masa ludzi którzy tak jak ja są starzy, całe życie tłukli _zwyczajne_ aplikacje webowe i chcą powoli wejść w nowoczesność, żeby nie zostać jakoś strasznie z tyłu. Jak się przekonałem po kilku rozmowach to było bardzo, bardzo mylne wrażenie.

W 2020 roku nie ma już starych ludzi. Nikt już nie robi takich serwisów jak mój [Brewlog](https://brewlog.zgodowie.org), w szczególności zawodowo. Jest nowocześnie, reaktywnie, progresywnie i wielowarstwowo. A ci którzy tego nie robią siedzą cicho i nie chcą się wychylać.

Dlatego nie będę kontynuował tego cyklu. Wstyd i poruta. Oraz oczywiście szkoda na to czasu. Jak również jak się zastanowić to było bez sensu - wyrenderowany HTML z Javascriptem, który coś tam niby robił, ale właściwie nie musiał, bo można to wszystko było zrobić _server-side_. Czy to nie jest to co obecnie jest modne w Javascripcie, czyli Server Side Rendering?!

I dlatego też postanowiłem zrezygnować z półśrodków i jako _projekt edukacyjny_ zacząłem robić mikroblog (aka _klon Twittera_) z backendem w Pythonie i frontem w [Preact](https://preactjs.com/). Projekt jest [publicznie dostępny na githubie](https://github.com/zgoda/microblog) i rozwija się powoli. Nie mam ram czasowych, ani nie narzuciłem sobie terminów osiągnięcia poszczególnych _kamieni milowych_. Być może nawet nigdy nie zostanie ukończony, ale jego natura jest właśnie edukacyjna - ma mi pomóc odświeżyć _stack technologiczny_ w którym czuję się swobodnie.

W Javascripcie robiłem całkiem sporo, ale raczej dawno temu, gdy nikt jeszcze nie myślał o Vue czy React, a szczytem nowoczesności był [Ember jedynka](https://blog.emberjs.com/2013/08/31/ember-1-0-released.html) i wczesne wersje [Angulara](https://angularjs.org/). W tamtych zamierzchłych czasach jak ktoś chciał mieć dobry framework w Javascripcie to raczej musiał go sobie napisać sam, i przy takim to kodzie właśnie pracowałem. Były to lata 2012-2013. Na szczęście mamy rok 2020 i Javascript zaczął wreszcie przypominać język programowania _for humans_ i mam nadzieję że tak już zostanie.

A na razie zmierzam do pierwszego ważnego momentu w dziejach aplikacji, czyli autoryzacji użytkownika.

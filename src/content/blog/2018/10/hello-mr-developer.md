---
title: Hello, Mr. Developer
pubDate: 2018-10-07T14:37:00.002+02:00
tags:
    - programowanie
    - rant
    - python
description: 'Wyruszyłem wraz z Google na poszukiwanie króla dżungli.'
imageUrl: https://storage.googleapis.com/public.zgodowie.org/images/grumpy-old-man.jpg
isTechRelated: true
---

Po dłuższej robocie z innymi rzeczami trafił mi się jeden mały projekt, który idealnie nadał się na rozpoznanie bojem, co tam nowego panie w światku bibliotek narzędziowych/ramówek do robienia aplikacji sieciowych - proste REST API z jednym zasobem w kilku perspektywach. Pierwsza myśl była "robiłem to meeelion razy, w jeden dzień będzie z pokryciem 100%". Ale zaraz zorientowałem się, że to dobra okazja, żeby przy okazji rozejrzeć się, czy czasem coś nowego nie pojawiło się na arenie w ciągu tych 3 czy 4 lat, kiedy tłukłem w standardzie Flask + SQLAlchemy, do porzygu. Pamiętam przecież, jak ze 3 lata temu co chwilę pojawiały się jakieś zajawki, że tu jakiś framework osiągnął niesamowite wyniki w benchmarkach, a to jakiś przełomowy koncept miał na zawsze odmienić sposób w jaki robi się webaplikacje w Pythonie, a to to, a to tamto. Poprosiłem więc o chwilę ekstra na zastanowienie się i wyruszyłem wraz z Google na poszukiwanie króla dżungli.

![Fuj](https://storage.googleapis.com/public.zgodowie.org/images/grumpy-old-man.jpg 'Grumpy old man (tu: Clint Eastwood)')

## Jest źle, a nawet bardzo źle

### Asynchroniczna smuta

Ostatnie 3 czy 4 lata to okres asynchronicznej rewolucji w Pythonie, więc spodziewałem się znaleźć przynajmniej jeden w miarę dojrzały projekt - poza Twisted, które było dojrzałe już 10 lat temu, po 5 latach rozwoju (15 lat, to jest dopiero szokujące!). Nic z tych rzeczy, niestety, pomimo że prace nad implementacją referencyjną [ASGI](https://asgi.readthedocs.io/), asynchronicznym następcą WSGI, trwają już prawie 3 lata i są prowadzone w ramach bardzo stabilnej organizacji (Django), a sama implementacja doczekała się już wersji 2, z małym okładem. Oczywiście jest Tornado (8 lat rozwoju to też piękny wynik, pogratulować), ale szukałem czegoś "mniej", raczej w stylu Werkzeug niż Flask. No i "wartość dodana" Tornado względem Twisted wynosi dla mnie niemal zero. Ramówka aplikacyjna która zdaje się mieć najlepsze perspektywy i na moje oko wygląda najlepiej ([Starlette](https://www.starlette.io/)) wciąż jest w stanie "alpha", przecież nie postawię na tym produkcyjnej aplikacji, choćby była nie wiadomo jak mała. Nie wnikałem zanadto w przyczyny tego smutnego stanu rzeczy, ale wydaje mi się, że duży kawał asynchronicznego tortu zeżarło NodeJS, a Python został mocno w tyle na starcie.

### WSGI, trochę lepiej ale też bez szału

W światku bardziej tradycyjnym, czyli WSGI czas się jakby zatrzymał. Są duże ramówki (Django, Pyramid), są małe ramówki (Flask, CherryPy), są biblioteki narzędziowe (Werkzeug, WebOb) - wszystkie one są stabilne jak skała i ugruntowane jak Stonehenge, a jedynie Flask ma mniej niż 10 lat rozwoju za sobą. Co między innymi wiąże się z tym, że w pewnym okresie mojej kariery z prawie każdym już miałem do czynienia. Może pojawiło się coś nowego, coś świeżego, jakieś nowe spojrzenie? Niby jest [Falcon](https://falconframework.org/), też nie młodzieniaszek (5 lat rozwoju), a jednak wciąż brakuje mu wielu rzeczy. Na pierwszy rzut oka wydawał się idealnym rozwiązaniem (dopasowany do domeny, mało zależności, minimalny zestaw składników, zero funkcji których bym nie użył), więc zdecydowałem się poświęcić mu trochę więcej czasu. Szybko okazało się, że wygoda użytkowania i powszechne zwyczaje nie jest tym, czym autorzy Falcona zdają się przejmować, np. zazwyczaj odpowiedź zwraca się z funkcji obsługującej żądanie, a tu modyfikuje się przekazany obiekt. Czasem też trzeba zejść poziom niżej, do warstwy WSGI żeby mieć jakąś funkcjonalność. A czasem po prostu nie ma, np. obsługi danych kodowanych w application/x-www-form-urlencoded czy multipart/form-data, i trzeba sobie radzić przy użyciu młotka i przecinaka. Nawet jakbym chciał tam cokolwiek poprawić i przyłożyć się do rozwoju projektu, to mój światopogląd mi na to nie pozwala, ponieważ [w projekcie obowiązuje CoC](https://github.com/falconry/falcon/blob/master/CODEOFCONDUCT.md) z którym się nie zgadzam, a licencja projektu nie zezwala mi na wycofanie mojego wkładu.

## Badum-tss

Konkluzja? Niejednoznaczna. Jak trzeba coś zrobić, to jest czym. Jak ktoś chce spróbować czegoś nowego, to za bardzo nie ma czego. Ostatecznie aplikację zrobię w Falconie - i mam nadzieję że nie będę tego żałował.

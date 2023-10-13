---
title: FTS po polsku, Pytąg Edycjon
author: Jarek
pubDate: 2020-10-06T11:15:00
tags:
    - python
    - fts
    - lingwistyka
description: Po prawie 15 latach powracam do tematu wyszukiwania pełnotekstowego w języku polskim. Przyjrzę się ponownie narzędziom i opcjom dostępnym w 2020 roku, a także spróbuję sformułować jakieś podpowiedzi, co w tej dziedzinie może zrobić programista w Pythonie chcący dołączyć do swojej aplikacji wyszukiwanie pełnotekstowe.
---

Tego że język polski jest _trudny od strony programistycznej_ można się domyślić nawet nie dotykając dziedziny lingwistyki obliczeniowej. Jak bardzo jest on trudny może świadczyć wyjątkowo uboga oferta narzędzi językowych dla różnych silników wyszukiwania pełnotekstowego.

![Jeseniky](https://i.imgur.com/zRkHH3Ah.jpg)

W 2007 roku, gdy na dobre porzuciłem pracę w kopro i poszedłem do startupów tłuc w Pytągu, moim pierwszysm zadaniem było _zmontowanie_ wyszukiwarki pełnotekstowej. Nie dla języka polskiego lecz dla rumuńskiego i węgierskiego, ale niejako przy okazji zbadałem opcje dostępne dla naszego języka ojczystego. Wyniki były przygnębiające. W tamtym czasie istniała 1 (jedna!) implementacja stemmera języka polskiego - [Stempel](http://www.getopt.org/stempel/), którego współautorem był Andrzej Białecki. Mniej-więcej w tym samym czasie pojawił się [lematyzator](http://www.cs.put.poznan.pl/dweiss/xml/projects/lametyzator/index.xml) autorstwa Dawida Weissa, który mógł działać razem ze stemmerem w postaci kombo o dźwięcznej nazwie [Stempelator](http://morfologik.blogspot.com/2006/08/stempelator-103.html). Autor Lametyzatora ostatecznie wykorzystał te doświadczenia do przygotowania dojrzałego stemmera [Morfologik](https://github.com/morfologik/morfologik-stemming). I niestety podobnie jak jego wcześniejsze dzieła - jest on w Javie. Ach, oczywiście Stempel również jest w Javie.

Jedno lub oba te narzędzia są dostępne jako wtyczki do popularnych wyszukiwarek [ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-stempel.html) (Stempel) oraz [Solr](https://lucene.apache.org/solr/guide/8_6/language-analysis.html#polish) (Stempel i Morfologik). Używałem Stempela (Stempla?!) w dużej wyszukiwarce jaką robiłem w mojej późniejszej karierze i sprawdzała się doskonale.

Wszystko cacy, ale co z Pytągiem? Ano nic, a właściwie prawie nic. Zarówno ElasticSearch jak i Solr można sobie uruchomić i mieć, używając ich API po HTTP, ale umówmy się, nie zawsze się to opłaca, bo obie aplikacje to są wielkie kobyły, które wymagają dużo zasobów - dużo CPU, dużo pamięci, dużo szybkiego _storage_.

Sytuacja jest trudna, ale nie katastrofalna.

## Alternatywy 4

[Reimplementacja Stempela](https://github.com/dzieciou/pystempel) (Stempla?!) w Pythonie. Wygląda jak prawdziwy Stempel i ma podobne do niego wymagania, nie jest również szczególnie szybki. Do wsparcia wyszukiwarki w aplikacji webowej nada się średnio.

[Stemmer polskiego bazujący na algorytmie Portera](https://github.com/Tutanchamon/pl_stemmer) - do zbadania. Kod będzie wymagał trochę czyszczenia i adaptacji do standardów 2020 roku, ale jest w pełni algorytmiczny i wygląda na dość szybki. Jakość wyjścia należałoby przetestować.

I [takie coś jeszcze znalazłem](https://github.com/eugeniashurko/polish-stem), stemmer oparty na czymś co się nazywa Finite State Transducers. Nie mam pojęcia co to jest i jak działa (zapewne jednak wkrótce się dowiem), ale również warty sprawdzenia, jak wszystko inne w tej dziedzinie.

No i [analizator morfologiczny Morfeusz](http://morfeusz.sgjp.pl/), którego jednak przydatność nie wydaje się dostateczna do użycia jako preprocesora tekstu w wyszukiwarce aplikacji webowej.

Pojawiło się słowo _preprocesor_, co oznacza że mam już pomysł jak wykorzystać tego rodzaju narzędzia. Read on, ale najpierw słówko wprowadzenia.

## Przygotowanie tekstu do wyszukiwania pełnotekstowego

Aby można było zastosować wyszukiwanie pełnotekstowe, tekst który będzie przeszukiwany zawsze musi być zawczasu przygotowany. Obejmuje to (w różnej kolejności zależnej od implementacji, ale mniej-więcej takiej):

-   podział na pojedyncze wyrazy (tokeny)
-   normalizację unikodu
-   analizę morfologiczną (stemming lub lematyzacja)
-   normalizację wielkości znaków

Te same czynności są wykonywane względem zapytania, które zostaje przesłane do silnika wyszukiwarki, a następnie znormalizowane tokeny z zapytania są przyrównywane do znormalizowanej wcześniej (podczas wstawiania danych) zawartości indeksu.

Jak widać jeden z tych procesów normalizacji nie musi być szybki, bo wstawianie dokumentów można wykonać offline, natomiast drugi zdecydowanie powinien być szybki, bo jest częścią zadania realizowanego interaktywnie.

## Czas wyjaśnić po co te wszystkie rozważania

Ponieważ większość aplikacji webowych używa jakiejś bazy danych, to rozwiązaniem FTS dostępnym dla każdej z nich jest użycie funkcji wyszukiwania pełnotekstowego jakie oferuje baza danych - ma to zarówno MySQL, PostgreSQL jak i nawet SQLite. Żaden z tych silników nie oferuje wsparcia dla analizy morfologicznej języka polskiego, dlatego postępowanie będzie takie samo w każdym przypadku - analizę morfologiczną trzeba będzie przeprowadzić w Pythonie. Silnikowi FTS pozostanie wtedy tokenizacja i normalizacja, bo do indeksu zostaną wstawione już gotowe stemy, jak również zapytania będą już zredukowane do stem, więc silnik zrobi to, co umie najlepiej - czyli wyszukiwanie w indeksie z pełnym dopasowaniem.

Czy to ma szansę zadziałać?

Szansę to ma, ale czy zadziała, to się dopiero okaże. Patrząc na dostępny kod obawiałbym się przede wszystkim o jakość wyników.

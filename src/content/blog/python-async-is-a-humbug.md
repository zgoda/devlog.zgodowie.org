---
title: Python async is a humbug
pubDate: 2020-05-23
tags:
    - python
    - async
    - rant
author: Jarek
description: Ponownie zanurkowałem w rzeczywistość programowania asynchronicznego w Pythonie i prawdopodobnie wkrótce znowu wycofam się z uczuciem obrzydzenia.
imageUrl: https://i.imgur.com/pRx9fWgh.jpg
---

Ponownie zanurkowałem w rzeczywistość programowania asynchronicznego w Pythonie i prawdopodobnie wkrótce znowu wycofam się z uczuciem obrzydzenia.

![Prawie jak pizza](https://i.imgur.com/pRx9fWgh.jpg)

Naprawdę bardzo chcę sobie przyswoić jak się to robi _asynchronicznie_, czyli z tym całym `async`/`await`. I chyba wreszcie przy tej próbie to zrozumiałem. Po czym spróbowałem zrobić sobie _czysto edukacyjnie_ małą aplikację która robi coś konkretnego i w szybkim tempie zacząłem siwieć.

To się nie nadaje do niczego.

Jest cała masa rzeczy, które było zrobić łatwo - biblioteki, ramówki, obudowane szybkie pętle itp. Jak się wie co i jak, to taką rzecz jest prosto zrobić. Potem oczywiście można spędzić nieskończenie wiele czasu na cyzelowaniu tego, ale towar już działa i dobrze kopie. Można też na początkowym etapie wybrać ścieżkę _procrastination_ i zatopić się w nie kończących się dyskusjach w dziesiątkach ticketów.

Problem się zaczyna, gdy chcesz tego użyć do czegoś _konkretnego_. Prosta aplikacja czytnika newsów RSS z frontem w Javascripcie, więc dobrze by było żeby _backend_ miał jakieś _storage_, Redis do tego byłby idealny. No to co my tam mamy do tego Redisa? Ups, `aioredis` nie dotykany od pół roku, ludzie już zadają pytania czy projekt jest/będzie utrzymywany. Skoro takie pytania się pojawiają to można wnosić, że niekoniecznie będzie. Nie, poważnie? Jedna z najpoważniejszych usług sieciowych współczesnego świata i takie coś? Banda przedszkolaków?

I tak jest ze wszystkim innym związanym z `asyncio` i innym _asyncem_. Bronią się tylko projekty jednoosobowe, jak Curio, albo już mocno ugruntowane, które w dodatku nie są _community project_ jak Twisted, jednakowoż Curio ma bardzo ograniczony zakres stosowania, a Twisted... No wiadomo, najlepsze _job sesurity_, w dodatku znam je już dość dobrze, a nie chodzi o to, żeby tłuc coś co już znam. Naprawdę chciałem zrobić coś _async_ po nowemu, ale chyba jednak nic z tego nie będzie. Brakuje infrastruktury. Bo o tym czy _wystartuje_ nie przesądza to, czy biblioteka/ramówka jest _fajna_ - tylko czy są do niej to wszystkie dodatki, które powodują, że ludzie używają jej do robienia _konkretnych rzeczy_. Takie właśnie dodatki jak biblioteka kliencka do Redisa. Przypadkiem ta dla Twisted działa o wiele lepiej niż ta do asycio.

Tak że pewnie połowę zrobię po staremu, a tylko front po nowemu. WSGI ma się dobrze i raczej nieprędko przejdzie do lamusa.

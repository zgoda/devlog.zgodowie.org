---
title: Python, interaktywne CLI
author: Jarek
pubDate: 2020-05-06T23:16:00
tags:
    - python
    - cli
description: Mmmmmm, command line!
---

Jakiś czas temu zacząłem robić hobbistycznie aplikację webową, która ma pewne dość szczególne wymagania, dość powiedzieć że nie można w niej użyć _zbyt nowoczesnych rzeczy_, takich jak np zbyt nowy Javascript. Dlatego większą jej część postanowiłem zrobić jako CLI.

![Defoliator](https://i.imgur.com/uUMTexNh.jpg)

Nie ma co prawda wymagań co do szczegółowych wersji obsługiwanych przeglądarek, natomiast nie może się opierać na Javascripcie, tylko działać w tradycyjnej technologii _żądanie/odpowiedź_ i wyświetlać wyrenderowany HTML.

Jednym z elementów aplikacji jest oczywiście panel/sekcja zarządzania treścią, a to celem utrudnienia sobie i ewentualnym użytkownikom postanowiłem zaimplementować jako CLI z interaktywnym interpreterem.

Aplikacja jest we Flasku (a to ci niespodzianka!), więc początek CLI był oczywisty &mdash; Flask korzysta z [Click](https://click.palletsprojects.com/), a przy jego pomocy można zbudować nawet bardzo skomplikowane struktury wierszy poleceń. Aż w końcu doszedłem do momentu, kiedy Click przestał mi wystarczać, bo potrzebowałem dać możliwość _interaktywnej_ pracy z danymi. Coś jak REPL, czyli Cmd lub Cmd2, a do tego pobieranie danych od użytkownika, sprawdzanie poprawności i generalnie interakcja, czyli któraś z kopii inquirer.js.

W efekcie niezły miszmasz mi się tam zrobił.

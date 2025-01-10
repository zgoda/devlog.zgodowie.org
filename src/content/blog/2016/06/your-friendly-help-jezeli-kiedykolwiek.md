---
title: 'Dziękuję, żółta kaczuszko!'
pubDate: 2016-06-29T11:30:00.000
tags:
    - docker
    - programowanie
    - pozapiwne
    - linux
description: 'Your friendly help.'
isTechRelated: true
imageUrl: https://storage.googleapis.com/public.zgodowie.org/images/rubber-duck.jpg
---

Your friendly help.

![Quack!](https://storage.googleapis.com/public.zgodowie.org/images/rubber-duck.jpg 'Kwa!')

Jeżeli kiedykolwiek będziesz potrzebować rozwiązać następujący problem:

> _W aplikacji działającej w kontenerze z linuksem muszę wykonać backup danych z iPhone/iPad przy użyciu programu `idevicebackup2`._

to uda ci się to gdy do kontenera udostępnisz katalog /var/run z hosta, ponieważ tam się znajduje gniazdo UNIX do komunikacji z serwisem `lockdownd` na urządzeniu.

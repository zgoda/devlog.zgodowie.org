---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Dziękuję, żółta kaczuszko!'
date: 2016-06-29T11:30:00.000
tags:
    - docker
    - programowanie
    - pozapiwne
    - linux
author: jarek
description: 'Your friendly help.'
---

Your friendly help.

![Quack!](https://4.bp.blogspot.com/-SXxp9qPBMSA/V3OTpg3kPSI/AAAAAAAAEms/ngOIs1IYBdAIQuyWyFS12hPdAxh3-ePEACLcB/s800/rubber-duck_0.jpg)

Jeżeli kiedykolwiek będziesz potrzebować rozwiązać następujący problem:

> _W aplikacji działającej w kontenerze z linuksem muszę wykonać backup danych z iPhone/iPad przy użyciu programu `idevicebackup2`._

to uda ci się to gdy do kontenera udostępnisz katalog /var/run z hosta, ponieważ tam się znajduje gniazdo UNIX do komunikacji z serwisem `lockdownd` na urządzeniu.

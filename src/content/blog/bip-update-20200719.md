---
title: Co nowego w BIP, 2020-07-19
author: Jarek
pubDate: 2020-07-19T00:19:00
tags:
    - python
    - flask
    - projekty
    - pcp
description: Aktualizacja statusu projektu aplikacji BIP, wersja 0.6.2
isTechRelated: true
---

Dzisiaj [BIP](https://github.com/zgoda/bip) zyskał numerek wersji [0.6.2](https://pypi.org/project/biuletyn-bip/0.6.2/). W dalszym ciągu trwają prace nad wersją 0.7. A co nowego tam przyszło od _feature complete_, czyli od wersji 0.6.0?

-   poprawiłem wyświetlanie aplikacji na małych ekranach (jak np smartfony - nadal nie działa na Nokii 3310i)
-   w panelu administracyjnym jest wyświetlana ścieżka nawigacyjna stron
-   aplikacja może być opcjonalnie zintegrowana z systemem zdalnego logowania [Sentry](https://sentry.io/), wymaga to tylko ustawienia jednej zmiennej środowiskowej
-   dostępna jest definicja _JSON schema_ dla pliku z danymi instytucji
-   zaktualizowałem przykłady konfiguracji uruchomieniowej (Nginx, uWSGI, Gunicorn)
-   dopisałem trochę dokumentacji instalacyjnej oraz administracyjnej (system)
-   wprowadziłem sporo zmian upraszczających kod, ma to głównie na celu zwiększenie przejrzystości
-   dużo zmian było związanych z _zapleczem projektowym_ (Github Actions)

Początkowy impet wygasł, ale teraz właśnie dzieje się robota której nie można pominąć. Błędy w kodzie można naprawiać na bieżąco, ale początkowe wsparcie użytkownika to jest coś co musi być gotowe na 1.0 choćby nie wiem co. Nie lubię tego robić, ale trzeba.

Wydanie [wersji 0.7.0](https://bip.readthedocs.io/pl/latest/roadmap.html) zbliża się wielkimi krokami, ale jeszcze chwilę to potrwa.

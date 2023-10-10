---
title: Flask - zagwozdki
author: jarek
date: 2021-02-06T21:22:00
tags:
  - flask
  - programowanie
  - gotchas
description: Flask, jakkolwiek fajny, ma również swoje idiosynkrazje. Czasem nie działa do końca tak, jakby się człowiek spodziewał, choć zwykle trudno mówić o błędzie.
---

[Flask](https://palletsprojects.com/p/flask/), jakkolwiek fajny, ma również swoje idiosynkrazje. Czasem nie działa do końca tak, jakby się człowiek spodziewał, choć zwykle trudno mówić o błędzie. Ot, takie *zagwozdki* i *dziwactwa*, a najczęściej sami do tego doprowadziliśmy.

<!-- more -->

Bardzo lubię Flaska, odpowiada mojemu wyobrażeniu o *rozszerzalnym frameworku webowym w Pythonie*. Nie jest najszybszy, ani nie jest najnowocześniejszy, ale działa i dostarcza wiele przyjemności, nie izolując przy tym od Pythona - używając Flaska aplikację pisze się w Pythonie i można to czuć przez cały czas.

### `HEAD` odpowiada 404, chociaż metoda jest dodana do listy obsługiwanych

Mamy sobie taką funkcję widoku, która oprócz logowania użytkownika służy również do sprawdzania stanu serwera poprzez odpowiedź na żądanie `HEAD`:

```python
@bp.route('/login', methods=['POST', 'HEAD'])
def login():
    name = request.form.get('name')
    password = request.form.get('password')
    user = get_user(name)
    if user is not None and user.check_password(password):
        g.user = user
        return {'token': generate_token(name)}
    return json_error_response(404, 'No such account')
```

Sprawdźmy czy wszystko jest w porządku, metoda `OPTIONS` jest obsługiwana zawsze, niezależnie czy się ją zadeklaruje czy nie:

```shell-session
$ curl -IX OPTIONS http://127.0.0.1:5000/api/v1/login
HTTP/1.0 200 OK
Content-Type: text/html; charset=utf-8
Allow: POST, OPTIONS, HEAD
Content-Length: 0
Server: Werkzeug/1.0.1 Python/3.8.5
```

No to powinno być gites.

```shell-session
$ curl -IX HEAD http://127.0.0.1:5000/api/v1/login
HTTP/1.0 404 NOT FOUND
Content-Type: application/json
Content-Length: 35
Server: Werkzeug/1.0.1 Python/3.8.5
```

Ale nie jest. Leo, why?

Zastanówmy się. Co normalnie robi ta funkcja? Czyta dane zawarte w formularzu HTML i sprawdza, czy hasło się zgadza. Jeżeli się zgadza, to generuje token autoryzacyjny i odsyła go w słowniku pod kluczem `token`. A jak się nie zgadza? Ha! Ponieważ nie przesłaliśmy żadnych danych, to obiekt użytkownika nie został znaleziony i funkcja zwróciła `404 NOT FOUND`. Spodziewalibyście się państwo?

Aby to załatwić, to trzeba żądanie `HEAD` obsłużyć oddzielnie, na przykład tak:

```python
@bp.route('/login', methods=['POST', 'HEAD'])
def login():
    if request.method == 'HEAD':
        return {}
    name = request.form.get('name')
    password = request.form.get('password')
    user = get_user(name)
    if user is not None and user.check_password(password):
        g.user = user
        return {'token': generate_token(name)}
    return json_error_response(404, 'No such account')
```

Zwrócenie z tej funkcji pustego słownika wymusi typ zawartości `application/json`, a sama odpowiedź zostanie zwrócona z kodem `200 OK`, o co od początku nam chodziło. W szczególności nie chciałem, żeby zwracała jakikolwiek kod z zakresu błędów użytkownika (400 - 499), bo mi to nie pasowało do koncepcji stanu serwera.

Niewiele brakowało, a bym już zgłaszał błąd we Flasku. Na tym jednak polega bycie *seniorem*, że najpierw szuka się błędu w **swoim** kodzie, następnie w **swojej** logice, a dopiero na końcu zgłasza błędy w kodzie innych.

### Nie działa mi `autoescape` w Jinja2

Silnik szablonów Jinja2 ma fajną funkcję `autoescape`, która automatycznie zabezpiecza renderowany HTML zamieniając *niebezpieczne* znaki na ich bezpieczne odpowiedniki w postaci encji HTML. Domyślnie w *żywym* Jinja2 jest ona wyłączona, ale Flask ją włącza i nie trzeba nic ekstra robić. Ale żeby mieć fajne kolorowanie składni w VS Code zmieniłem rozszerzenie nazw plików szablonów na `.html.j2` i przestało mi działać!

Ano dlatego, że Flask włącza to tylko dla plików szablonów z [paroma ustalonymi rozszerzeniami](https://github.com/pallets/flask/blob/444550ab0c2ba8b1e003dee198b5628bc58302ce/src/flask/app.py#L809). I co teraz?

Ano teraz trzeba sobie zrobić własną klasę `Application`, która nadpisze metodę `select_jinja_autoescape`, na przykład tak:

```python
from flask import Flask


class MyApplication(Flask):

    def select_jinja_autoescape(self, filename):
        extra_autoescape = filename.endswith(['.html.j2', '.html.jinja2'])
        return super().select_jinja_autoescape(filename) or extra_autoescape
```

I już będzie działało.

#### Wisienka na czubku tortu - renderowanie zwięzłego HTML

Skoro już zaczęliśmy dłubać przy klasie aplikacji, to można przy okazji zrobić coś, żeby wyrenderowany HTML nie był aż tak rozwlekły, w końcu za te wszystkie spacje przesyłane to my płacimy (tak, wiem że `gzip` albo `brotli` zrobi z tym porządek, *jednakowoż tym niemniej*)!

Tu już nie będzie tak prosto, bo ustawienia Jinja2 są we Flasku 1.1 zapisane [jako słownik będący atrybutem klasy](https://github.com/pallets/flask/blob/444550ab0c2ba8b1e003dee198b5628bc58302ce/src/flask/app.py#L319). Możemy go nadpisać, ale zupełnie nie jest to *future proof* - jakakolwiek zmiana tego w kodzie Flaska będzie wymagała dostosowania naszego kodu, a to upierdliwe będzie. Ale zawsze możemy nadpisać to własnym deskryptorem! Na przykład tak:

```python
class MyApplication(Flask):

    @property
    def jinja_options(self):
        options = dict(super().jinja_options)
        options.update({
            'trim_blocks': True,
            'lstrip_blocks': True,
        })
        return options
```

I już, Jinja2 renderuje zwięzły HTML, a nasz kod tylko dodaje te ekstra ustawienia do ustawień domyślnych, więc jeżeli *oni* coś tam u siebie dodadzą, to jesteśmy kryci.

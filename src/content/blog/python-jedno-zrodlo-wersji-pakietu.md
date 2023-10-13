---
title: Python, jedno źródło wersji pakietu
pubDate: 2019-12-29T17:30:00.0000+01:00
tags:
    - python
author: Jarek
---

Jest kilka sposobów, żeby w skrypcie instalacyjnym pakietu pobrać wersję w sposób bezpieczny. Niepełną listę takich możliwości można znaleźć np. [w jednym z dokumentów PyPA](https://packaging.python.org/guides/single-sourcing-package-version/) (proszę zauważyć, że ostatnia propozycja nie jest taka całkiem bezpieczna, o czym jest wspomniane w notce). Ale oczywiście to nie koniec.

![Chrum, chrum](https://i.imgur.com/6scMUqQh.jpg)

[Kilka miesięcy temu](https://devlog.zgodowie.org/2019/4/6/neat-idea) wpadłem na pomysł, by do uzyskania tej wartości użyć AST, ale nie miałem jakoś specjalnie czasu, by do tego usiąść i to ogarnąć. I proszę, znalazłem przykład wykorzystania AST do tego w kodzie [pakietu pydal](https://github.com/web2py/pydal), choć nie w taki sposób jak zamierzałem.

```python
_version_re = re.compile(r"__version__\s+=\s+(.*)")

with open("pydal/__init__.py", "rb") as f:
    version = str(
        ast.literal_eval(_version_re.search(f.read().decode("utf-8")).group(1))
    )
```

Jest to trochę bezpieczniejszy sposób nr 3 z podanego wcześniej dokumentu PyPA (nie wykonuje się `exec()`) i ma on tę wyższość, że produkuje zwykły obiekt `str`, a nie słownik.

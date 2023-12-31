---
title: Bez italików w VS Code, powiadam!
pubDate: 2020-05-07T13:09:00
tags:
    - programowanie
    - vscode
    - edytor
author: Jarek
description: Są takie rzeczy, których nie jestem w stanie znieść i póki żyję nie dopuszczę ich do siebie. Jedną z nich są italiki w widoku kodu.
imageUrl: https://i.imgur.com/hdXOUkAl.jpg
isTechRelated: true
---

Są takie rzeczy, których nie jestem w stanie znieść i póki żyję nie dopuszczę ich do siebie. Jedną z nich są italiki w widoku kodu.

![Omnomnom](https://i.imgur.com/hdXOUkAl.jpg)

Niestety, wielu wariatów uznało, że będzie cudownie, jak w kodzie niektóre rzeczy będą kursywą (pies komentarze, ale np argumenty funkcji/metod!). I nieważne, że font użyty do wyświetlania nie ma glifu kursywy, więc po sztucznym pochyleniu go wygląda jak kupa.

Oczywiście pewnym rozwiązaniem byłoby wzięcie kodu rozszerzenia implementującego styl i zmodyfikowanie go tak, by wszystkie literki stały prosto jak... no, jak słup przy drodze. Tylko że to nie o to chodzi. Nie po to wybierałem do wyświetlania font, który nie ma kroku kursywy, żeby oglądać takie rzeczy &mdash; nie ma to nie ma i już. No ale tak to nie działa.

Za to działa co innego. To można sobie w ustawieniach edytora wymusić.

```json
"editor.tokenColorCustomizations": {
    "textMateRules": [
        {
            "scope": [
                "comment",
                "punctuation.definition.comment",
                "variable.language",
                "keyword.control.flow.python",
                "keyword.control.import.python",
                "variable.parameter"
            ],
            "settings": {
                "fontStyle": ""
            }
        }
    ]
},
```

I po krzyku. Ciekawe kiedy to wyłączą.

---
title: Opcjonalne typowanie Javascriptu
author: Jarek
pubDate: 2021-03-31T23:22:00
tags:
    - javascript
    - typescript
    - typing
description: Od wersji 3.6 Python ma opcjonalne deklaracje typów, z każdą wersją coraz lepsze. A co tam panie z Javascriptem?
---

Zacznijmy w ogóle od tego, że obowiązkowe deklarowanie typów w językach typowanych dynamicznie to jest nieporozumienie, dlatego abominacje takie jak TypeScript w ogóle mnie nie interesują - wzięli i zrobili z języka typowanego dynamicznie język typowany statycznie. Rozumiem po co to komu, ale zupełnie to nie ma przełożenia na to, czego ja szukam. A szukam czegoś takiego, jak jest w Pythonie - zadeklarujesz typy, to jest dobrze, nie zadeklarujesz to też jest dobrze. Takie "typowanie żeby pomóc edytorowi", ale w sumie nic więcej.

![Płonie](https://i.imgur.com/SmjCO9kh.jpg)

Takich _grubych misiów_ jest dwa: [TypeScript](https://www.typescriptlang.org/) od Microsoftu i [Flow](https://flow.org/en/) od Facebooka (jest jeszcze jakiś plankton, ale wcale nie lepszy). Na razie pominę kwestie osobiste, ale z każdym jest coś nie tak.

W TypeScripcie deklarowanie typów jest **obowiązkowe**. Jak zadeklarujesz że robisz w TS, to wszystko ma być w TS i nie ma przebacz. W opisie oficjalnym ma słowo _optional_, ale cała opcjonalność polega na tym, że od czasu do czasu nie trzeba deklarować typu, bo sam się domyśli. Na szczęście zazwyczaj nie trzeba pisać modułów proxy do zewnętrznych bibliotek, bo jest to popularne _coś_.

We Flow jak zadeklarujesz typowanie na poziomie modułu, to już musisz - ale możesz nie zadeklarować. Deklaracja odbywa się przez _pragmę_ w komentarzu i może nawet bym to jakoś przełknął, gdyby nie to, że takich zewnętrznych bibliotek które dostarczają definicji typów jest dosłownie parę, w tym React. Też od Facebooka. Efekt jest taki, że mając całkiem nietypowaną bibliotekę trzeba sobie dopisać moduł proxy, który te typy podefiniuje. Co zaoszczędzisz na nieco bardziej opcjonalnym typowaniu swojego kodu, to stracisz na typowaniu obcego kodu.

Wspomniane kwestie osobiste dotyczą tego, że jednej i drugiej firmy nie lubię, a nawet trudno mi powiedzieć której bardziej (nie pomaga na to nic, nawet fakt że dla każdej z nich coś w życiu robiłem za pieniądze). Dogmatyczny nie jestem, ale skoro żaden nie spełnia wszystkich wymagań, to po co się przymuszać?

### Alternatywa bez sensu

Co jest naprawdę i w pełni opcjonalne, to komentarze [JSDoc](https://jsdoc.app/). Składnia tego jest typowa dla komentarzy dokumentacyjnych, nieprzyjemna i rozwlekła.

```javascript
/**
 * @param {string} table
 * @param {number} days
 * @returns {import('..').Rate}
 */
export function getSaltRate(table, days) {
    const { low, high } = TYPE_TO_TABLE.get(table);
    /** @type {number} */
    let curingDays;
    if (days >= 8 && days < 11) {
        curingDays = CuringDays.EIGHT_TO_TEN;
    } else if (days > 10) {
        curingDays = CuringDays.ELEVEN_TO_THIRTEEN;
    } else {
        curingDays = DAYS[days - 1];
    }
    return { low: low.get(curingDays), high: high.get(curingDays) };
}
```

Wygląda to okropnie, pisze się to okropnie - ale jest całkowicie opcjonalne, nie wymaga żadnych dodatkowych kombinacji z konfiguracją _bundlera_, a co najważniejsze, spełnia swoją rolę w edytorze, to znaczy wyświetla spodziewane typy argumentów wejściowych i zadeklarowany typ zwracanej wartości. Nie powiem, żeby mi to odpowiadało, ale wszyscy inni są znacząco gorsi, w dodatku w wymaganiach nie było nic o _przyjemnej składni_, więc zasadniczo powinieniem uznać, że ostatecznie mam co chciałem.

No niby mam, ale jakieś takie to kulawe.

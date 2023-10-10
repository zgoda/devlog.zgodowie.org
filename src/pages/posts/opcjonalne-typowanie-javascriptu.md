---
title: Opcjonalne typowanie Javascriptu
author: jarek
date: 2021-03-31T23:22:00
tags:
  - javascript
  - typescript
  - typing
description: Od wersji 3.6 Python ma opcjonalne deklaracje typów, z każdą wersją coraz lepsze. A co tam panie z Javascriptem?
---

Zacznijmy w ogóle od tego, że obowiązkowe deklarowanie typów w językach typowanych dynamicznie to jest nieporozumienie, dlatego abominacje takie jak TypeScript w ogóle mnie nie interesują - wzięli i zrobili z języka typowanego dynamicznie język typowany statycznie. Rozumiem po co to komu, ale zupełnie to nie ma przełożenia na to, czego ja szukam. A szukam czegoś takiego, jak jest w Pythonie - zadeklarujesz typy, to jest dobrze, nie zadeklarujesz to też jest dobrze. Takie "typowanie żeby pomóc edytorowi", ale w sumie nic więcej.

->![Płonie](https://i.imgur.com/SmjCO9kh.jpg)<-

<!-- more -->

Takich *grubych misiów* jest dwa: [TypeScript](https://www.typescriptlang.org/) od Microsoftu i [Flow](https://flow.org/en/) od Facebooka (jest jeszcze jakiś plankton, ale wcale nie lepszy). Na razie pominę kwestie osobiste, ale z każdym jest coś nie tak.

W TypeScripcie deklarowanie typów jest **obowiązkowe**. Jak zadeklarujesz że robisz w TS, to wszystko ma być w TS i nie ma przebacz. W opisie oficjalnym ma słowo *optional*, ale cała opcjonalność polega na tym, że od czasu do czasu nie trzeba deklarować typu, bo sam się domyśli. Na szczęście zazwyczaj nie trzeba pisać modułów proxy do zewnętrznych modułóœ.

We Flow jak zadeklarujesz typowanie na poziomie modułu, to już musisz - ale możesz nie zadeklarować. Deklaracja odbywa się przez *pragmę* w komentarzu i może nawet bym to jakoś przełknął, gdyby nie to, że takich zewnętrznych bibliotek które dostarczają definicji typów jest dosłownie parę, w tym React. Też od Facebooka. Efekt jest taki, że mając całkiem nietypowaną bibliotekę trzeba sobie dopisać moduł proxy, który te typy podefiniuje. Co zaoszczędzisz na nieco bardziej opcjonalnym typowaniu swojego kodu, to stracisz na typowaniu obcego kodu.

Wspomniane kwestie osobiste dotyczą tego, że jednej i drugiej firmy nie lubię, a nawet trudno mi powiedzieć której bardziej (nie pomaga na to nic, nawet fakt że dla każdej z nich coś w życiu robiłem za pieniądze). Dogmatyczny nie jestem, ale skoro żaden nie spełnia wszsytkich wymagań, to po co się przymuszać?

### Alternatywa bez sensu

Co jest naprawdę i w pełni opcjonalne, to komentarze [JSDoc](https://jsdoc.app/). Składnia tego jest typowa dla komentarzy dokumentacyjnych, nieprzyjemna i rozwlekła.

```jsx
import '../typedefs';

/**
 * @typedef {Object} MessageListProps
 * @property {Map<string, Array<Message>>} messages all messages from application state
 * @property {string} currentTopic current selected topic
 * @property {string} userKey current user key (ID)
 */

function mapToProps(/** @type MessageListProps */ { messages, currentTopic, userKey }) {
  return ({ messages, currentTopic, userKey });
}

/**
 * Component that displays received messages.
 * 
 * @param {MessageListProps} props
 * @returns HTML `div` element that is a container for message list
 */
function MessageListBase({ messages, currentTopic, userKey }) {

  const topicMessages = messages.get(currentTopic) || [];

  return (
    <div class="message-list">
      {topicMessages.map(
        (/** @type Message */ message) => (
          <MessageItem
            message={message}
            key={message.date.toString()}
            userKey={userKey}
          />
        )
      )}
    </div>
  );
}
```

Wygląda to okropnie, pisze się to okropnie - ale jest całkowicie opcjonalne, nie wymaga żadnych dodatkowych kombinacji z konfiguracją *bundlera*, a co najważniejsze, spełnia swoją rolę w edytorze, to znaczy wyświetla spodziewane typy argumentów wejściowych i zadeklarowany typ zwracanej wartości. Nie powiem, żeby mi to odpowiadało, ale wszyscy inni są znacząco gorsi, w dodatku w wymaganiach nie było nic o *przyjemnej składni*, więc zasadniczo powinieniem uznać, że ostatecznie mam co chciałem.

No niby mam, ale jakieś takie to kulawe.

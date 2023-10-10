---
title: Podman, wschodząca gwiazda?
author: jarek
date: 2020-10-21T14:03:00
tags:
  - kontenery
  - programowanie
  - docker
  - podman
description: W półświatku kontenerów rządzi jak na razie Docker, ale Podman w wersji 2.1 jest już dla niego poważną konkurencją.
---

Uruchamianie aplikacji w kontenerach to od jakiegoś czasu standard, do czego walnie przyczyniła się stabilizacja systemów zarządzania grupami kontenerów (tzw *orkiestracji*) i w efekcie przyjęcie ich do powszechnie dostępnej oferty dostawców usług chmurowych. A jednocześnie dopiero całkiem niedawno do mainstreamu dołączył pierwszy konkurent dla Dockera, którego można nazwać *frontendem* i interfejsem użytkownika systemu kontenerowego, który każdy ma dostarczony wraz z kernelem. No, każdy kto używa Linuksa, ale zakładam że wszyscy jesteśmy dorośli.

->![Smokin'](https://i.imgur.com/yybNouzh.jpg)<-

<!-- more -->

[Podman](https://podman.io/) to nie jest taka nowa rzecz, pamiętam że był już dostępny w Fedorze 30, a znalazłem również wzmianki że był i w 28, czyli *w mainstreamie* dostępny jest od połowy 2018 roku. Całkowicie zastępuje popularnego Dockera, który - jakkolwiek dostępny nieodpłatnie - nie jest wolnym oprogramowaniem. Widziałem nawet taką prezentację (mniej-więcej właśnie z okolic 2018 roku), że należy Podmana zainstalować, zrobić alias `docker=podman` i zapomnieć. Nie jest tak całkiem różowo, ponieważ pomimo zgrubnej zgodności poleceń z Dockerem czasem one się zachowują nieco inaczej, a zazwyczaj mają również inne wyjście, co może być kłopotliwe jeżeli ktoś sobie skryptował polecenia Dockera i parsował wyjście. W przypadku Podmana 2.x jest to całkowicie zbędne, ponieważ dostarcza on publicznego API po HTTP, ale nie uprzedzajmy faktów.

Wczoraj wieczorem przypomniałem sobie o Podmanie za sprawą jakiegoś całkiem przypadkowego linku do trackera Podmana i postanowiłem dać mu ponownie szansę. W połowie 2019 roku próbowałem już raz, ale wtedy najważniejszą dla mnie rzeczą była *mini-orkiestracja*, jakiej dostarczał program `docker-compose`. [Podman-compose](https://github.com/containers/podman-compose) nadal nie jest do końca tym, czy można byłoby zastąpić to narzędzie, ale może coś się poprawiło?

Konstatując marny stan krajobrazu przeglądałem podsunięte mi przez wyszukiwarkę strony, aż znalazłem coś, co tchnęło we mnie nadzieję. Otóż jak się okazuje, w Podmanie możliwe jest definiowanie *podów* (hehe, niezłe odkrycie), które można [wyeksportować jako definicję podu Kubernetes w YAML, a następnie uruchomić je](https://www.redhat.com/sysadmin/compose-podman-pods) tak, się to robi z definicją środowiska `docker-compose`, chociaż używając innych poleceń. Wyglądałoby na to, że Podman dostarcza wbudowanej funkcjonalności do tego samego, w dodatku używając [składni opisu, która jest standaryzowana](https://kubernetes.io/docs/concepts/workloads/pods/)?

W ramach ćwiczeń spróbowałem odtworzyć w postaci podu przykładowe środowisko WordPressa, tak jak to jest opisane w podlinkowanym artykule. Pełen sukces!

->![Bekon](https://i.imgur.com/Dv0Xpx0h.png)<-

I co dla mnie najważniejsze, uruchomione jest to na koncie zwykłego użytkownika, a nie administratora. W moich własnych kontenerach staram się uruchamiać procesy jako zwykły użytkownik (oraz nie próbuję uciekać z kontenera do hosta, o ile klient tego otwarcie nie zażąda), co trochę łagodzi strach, ale przecież nie tylko własny kod uruchamiam, a [nieznany proces uruchomiony w kontenerze, który działa na roocie](https://blog.trailofbits.com/2019/07/19/understanding-docker-container-escapes/)... No, wiadomo co na ten temat można sądzić. Dość powiedzieć, że mam na koncie taki obraz, z którego dało się zamknąć lub ponownie uruchomić system hosta, ale klient za to zapłacił i zrobiliśmy to, bo taka była potrzeba.

## Są pewne braki

Nie wszystko jednak jest.

Najpopularniejsze proxy dla konteneryzowanych serwisów czyli [Traefik](https://traefik.io/traefik/) nie umie [wykrywać usług uruchomionych przez Podmana](https://github.com/traefik/traefik/issues/5730), a wzmiankowany ticket wisi tam już od jakiegoś roku.

Eksport definicji podu zawiera całą masę niepotrzebnych rzeczy, które trzeba usunąć ręcznie, a następnie przetestować czy nadal działa.

Środowisko uruchomione lokalnie przez `docker-compose` jest dobrym środowiskiem developerskim, ponieważ całe wyjście procesów uruchomionych w kontenerach jest widoczne w terminalu, a zatrzymanie środowiska wykonuje się zwykłym Ctrl+C. Pod uruchomiony przez Podmana nie udostępnia logów inaczej niż w wyniku polecenia `podman logs`, a zatrzymuje się go przez `podman pod stop <nazwa>`. Jak na środowisko developerskie to mało wygodne.

Tym niemniej podoba mi się i daje pewną nadzieję, że *praktyczny* monopol Dockera odejdzie do przeszłości.

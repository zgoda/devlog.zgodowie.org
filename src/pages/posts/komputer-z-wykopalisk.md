---
title: 'Komputer z wykopalisk'
date: 2019-11-24T15:32:00.000+01:00
draft: false
tags:
  - arm
  - docker
  - programowanie
  - projekty
  - linux
  - ipaq
author: jarek
vssue: false
---

Odkąd zostałem linuksiarzem, czyli już od jakichś 20 lat, chciałem mieć PDA z linuksem. Oczywiście, w początkach XXI wieku te urządzenia kosztowały nerkę (mniej więcej jak teraz iPhone), więc musiałem o nich zapomnieć. Ale teraz, gdy minęło trochę czasu i produkt typu PDA w ogóle zniknął z rynku zastąpiony coraz potężniejszymi smartfonami...

<!-- more -->

Za 40 złotych z przesyłką kupiłem IPaq'a h3970.

->![IPaq 1](https://1.bp.blogspot.com/-Ki7jcCHatS8/XdqPq-C8DhI/AAAAAAAAHF4/dqbHXVuX6MAsyvavaavv6YIU0ogt47ekACKgBGAsYHg/s800/IMG_20191118_225247.jpg)<-

->![IPaq 2](https://1.bp.blogspot.com/-RcTV2EtIUp4/XdqPq1IWJeI/AAAAAAAAHF4/fxCFHKAZdp89FU_Zhnk-3wrf2xOO8UqegCKgBGAsYHg/s800/IMG_20191118_224241.jpg)<-

Jak widać urządzenie jeszcze działa pod kontrolą Windows, ale da się na nim zainstalować linuksa i właśnie to zamierzam zrobić.

Żeby nie było za łatwo, to jedyną dystrybucją jaka da się na tym zainstalować w dzisiejszych czasach jest [Yocto](https://www.yoctoproject.org/). I to wcale nie nowe, bo ostatnią wersja która wspiera h3900 jest 1.7 (_dizzy_) z 2014 roku, ale to już jest tyko 5 lat różnicy, a nie 15.

Tym niemniej problemy się mnożą. Już na samym początku okazało się, że trzeba budować używając dystrybucji wspieranej przez konkretne wydanie Yocto, czyli w przypadku Ubuntu co najwyżej 14.04. OK, będziemy ciorać to na wirtualce używając czegoś a la [builder](https://github.com/YoeDistro/docker-yoe-build) z [YoeDistro](https://github.com/YoeDistro/yoe-distro), ale z Ubuntu 14.04 na pokładzie (z Debiana wspierany przez Yocto 1.7 jest tylko Wheezy, a tego YoeDistro nie dostarcza). Trzeba będzie tylko zbudować obraz i wrzucić go na hub Dockera, a potem dopisać konfigurację dla konkretnego sprzętu.

Stay tuned, będzie tego więcej.

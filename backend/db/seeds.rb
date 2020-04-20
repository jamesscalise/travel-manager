berlin = Destination.create(name: "Berlin")
kyoto = Destination.create(name: "Kyoto")
lisbon = Destination.create(name: "Lisbon")


kinkaku_ji = Site.create(name: "Kinkaku-Ji", destination: kyoto)
arashiyama = Site.create(name: "Arashiyama", destination: kyoto)

gulbenkian = Site.create(name: "Gulbenkian Museum", destination: lisbon)
pena_palace = Site.create(name: "Pena Palace", destination: lisbon)

museum_island = Site.create(name: "Museum Island", destination: berlin)
reichstag = Site.create(name: "Reichstag Building", destination: berlin)
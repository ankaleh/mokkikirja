# Kehitystyön ohjeet

Sovellus käyttää [Node.js](https://nodejs.org/)-ympäristöä ja tämän pakkausten hallintaan työkalua `npm`.
Molempien tulee olla asennettuina, jotta sovellus voi toimia.

1) Kloonaa repositorio:

    `git clone git@github.com:ankaleh/mokkikirja.git`

2) Projekti käyttää kolmea ympäristömuuttujaa, MONGODB_URI, SECRET JA PORT. Luo projektin backend-kansioon `.env`-niminen tiedosto ja lisää sinne nämä kolme muuttujaa arvoineen: 

    MONGODB_URI = [arvoksi tietokannan osoite]

    SECRET = [arvoksi mikä tahansa satunnainen merkkijono]

    PORT = [arvon on oltava 4000].

3) Asenna projektin riippuvudet ajamalla sekä projektin juurikansiossa että sen `frontend`-kansiossa komento

    `npm install`

4) Tämän jälkeen käytössäsi ovat projektin juurihakemistossa ajettavat komennot

- `npm run dev:backend`: käynnistää backendin sovelluskehitystilassa ja tarjoilee [Apollo Serverin Playgroundin](https://www.apollographql.com/docs/apollo-server/testing/build-run-queries/#graphql-playground) osoitteesta `http://localhost:4000/playground`

- `npm run dev:frontend`: käynnistää frontendin sovelluskehitystilassa ja tarjoilee sen osoitteesta `http://localhost:3000`

- `npm run build:ui`: paketoi frontendin build-kansioksi tuotantoa varten

- `npm run start`: käynnistää sovelluksen tuotantoversion osoitteeseen `http://localhost:4000`



# Ohjeet kehitystyöhön, kun sovellusta ajetaan Docker-konteissa

Sovellusta on mahdollista kehittää myös sen ollessa käynnissä Docker-konteissa. Volume-määritysten takia (ks. [docker-compose.dev.yml](../docker-compose.dev.yml)) kontit päivittyvät aina, kun koodia muutetaan.

Asenna [Docker](https://docs.docker.com/get-docker/) ja [Docker Compose](https://docs.docker.com/compose/install/). Jälkimmäistä tarvitaan sovelluksen eri osien (backendin, frontendin ja tietokannan) kontittamiseen yhtäaikaa siten, että konteilla on esim. Dockerin sisäinen yhteys (network) toisiinsa.

1) Kloonaa repositorio:

    `git clone git@github.com:ankaleh/mokkikirja.git`

2) Aja repositorion juuressa komento

    `docker-compose -f ./docker-compose.dev.yml up`

- Komento luo kolme imagea nimeltään "mokkikirja-backend-dev", "mokkikirja-frontend-dev" ja "mokkikirja-mongo" ja käynnistää niiden pohjalta kolme saman nimistä konttia. Mongo-image alustaa tietokannan [mongo-init.js](../backend/mongo-docker/mongo-init.js):n mukaan.

3) Frontend käynnistyy osoitteeseen [http://localhost:3000](http://localhost:3000). Apollo Serverin Playground on käytössä osoitteessa [http://localhost:4000/playground](http://localhost:4000/playground). 

## Kehitystyössä hyödyllisiä komentoja

### Konttien sammuttaminen, käynnistäminen ja poistaminen

- Sammuta kontti, esimerkiksi Mökkikirjan frontend:

    `docker stop  mokkikirja-frontend-dev`

- Käynnistä kontti uudelleen:

    `docker start  mokkikirja-frontend-dev`

- Poista kaikki kontit ja niiden välinen network ajamalla projektin juuressa:

    `docker-compose -f ./docker-compose.dev.yml down`

    - Tämä tuhoaa kontit, mutta jos haluat tuhota myös imagen, se täytyy tehdä erikseen komennolla:

        `docker image rm mokkikirja-frontend-dev`

 
### Tietokannan tarkastelu

- Mene mokkikirja-mongo-kontin sisään:

    `docker exec -it <mokkikirja-mongo> bash`

- Avaa MongoDB CLI alla olevan komennon avulla. Jos et ole vaihtanut [docker-compose.dev.yml:ssä](../docker-compose.dev.yml) annettujen ympäritstömuuttujien (MONGO_INITDB_ROOT_USERNAME ja MONGO_INITDB_ROOT_PASSWORD) arvoja, sijoita komennon KÄYTTÄJÄTUNNUS-sanan tilalle "root" ja SALASANA-sanan tilalle "example": 

    `mongo -u <KÄYTTÄJÄTUNNUS> -p <SALASANA>`

- Hae kontissa olevat tietokannat:

    `show dbs`

    - Listassa pitäisi näkyä mm. my_app_database-niminen tietokanta. Nimi on määritetty docker-compose.dev.yml:ssä ympäristömuuttujalla MONGO_INITDB_DATABASE.

- Ota yhteys haluamaasi tietokantaan. Jos et ole muuttanut MONGO_INITDB_DATABASE-muuttujan arvoa, pane komennon TIETOKANNAN_NIMI-sanan tilalle "my_app_database":

    `use <TIETOKANNAN_NIMI>`

- Hae tietokannan kokoelmat:

    `show collections`

- Käytössäsi ovat Mongo DB:n [dokumentaatiossa](https://docs.mongodb.com/manual/reference/method/) annetut komennot. Voit esimerkiksi hakea kaikki posts-kokoelman dokumentit komennolla

    `db.posts.find({})`

- Poistu tietokannasta ja kontista kahdella `exit`-komennolla.

# crypto-ticker

get a daiy email of the bitcoin price.

## install

- clone the repo
- `cp .env.sample to .env` then edit accordingly
- `docker-compose up -d`

## run

run `docker-compose run app bash` to enter the container, and then run `yarn run once` to get and email the currencys price.
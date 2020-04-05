# Covid Searcher

## API

`GET /v1/countries/total`

```json
"australia": {
"country_region": "Australia",
"last_update": "2020-04-04 02:23:22",
"lat": "-25.0",
"long_": "133.0",
"confirmed": "5330",
"deaths": "28",
"recovered": "649",
"active": "4653"
},
"austria": {
"country_region": "Austria",
"last_update": "2020-04-04 02:17:00",
"lat": "47.5162",
"long_": "14.5501",
"confirmed": "11524",
"deaths": "168",
"recovered": "2022",
"active": "9334"
},
  ...
```

Returns the latest information about total cases of countries.

`GET /v1/countries/:country/total`

```json
{
"country_region": "Australia",
"last_update": "2020-04-04 02:23:22",
"lat": "-25.0",
"long_": "133.0",
"confirmed": "5330",
"deaths": "28",
"recovered": "649",
"active": "4653"
}
```

Returns the latest information about total cases of an specific country

`GET /v1/countries/:country/time`

```json
"jan": [
{
"country_region": "Australia",
"last_update": "2020-01-22",
"confirmed": "0",
"deaths": "0",
"recovered": "",
"active": "",
"delta_confirmed": "0",
"delta_recovered": ""
},
{
"country_region": "Australia",
"last_update": "2020-01-23",
"confirmed": "0",
"deaths": "0",
"recovered": "",
"active": "",
"delta_confirmed": "0",
"delta_recovered": ""
},]
...
```

Returns data from an specific country per time

`GET /v1/countries/where/:field/smaller/:value`

```json
"australia": {
"country_region": "Australia",
"last_update": "2020-04-04 02:23:22",
"lat": "-25.0",
"long_": "133.0",
"confirmed": "5330",
"deaths": "28",
"recovered": "649",
"active": "4653"
},
"austria": {
"country_region": "Austria",
"last_update": "2020-04-04 02:17:00",
"lat": "47.5162",
"long_": "14.5501",
"confirmed": "11524",
"deaths": "168",
"recovered": "2022",
"active": "9334"
},
  ...
```

Returns countries where the value of `:field` is smaller than `:value`

- `:field` can be `confirmed`, `deaths`, `recovered`

- `:value` is a integer value

`GET /v1/countries/where/:field/greater/:value`

```json
"china": {
"country_region": "China",
"last_update": "2020-04-04 01:13:08",
"lat": "30.5928",
"long_": "114.3055",
"confirmed": "82518",
"deaths": "3330",
"recovered": "76923",
"active": "2265"
},
"france": {
"country_region": "France",
"last_update": "2020-04-04 02:17:00",
"lat": "46.2276",
"long_": "2.2137",
"confirmed": "65202",
"deaths": "6520",
"recovered": "14135",
"active": "44547"
},
...
```

Returns countries where the value of `:field` is greater than `:value`

- `:field` can be `confirmed`, `deaths`, `recovered`

- `:value` is a integer value

`GET /v1/countries/:country/where/:field/smaller/:value`

```json
  "jan": [
{
"country_region": "Australia",
"last_update": "2020-01-22",
"confirmed": "0",
"deaths": "0",
"recovered": "",
"active": "",
"delta_confirmed": "0",
"delta_recovered": ""
},
{
"country_region": "Australia",
"last_update": "2020-01-23",
"confirmed": "0",
"deaths": "0",
"recovered": "",
"active": "",
"delta_confirmed": "0",
"delta_recovered": ""
},]
  ...
```

Returns dates from an specific `:country` where the value of `:field` is smaller than `:value`

- `:country` is a country name

- `:field` can be `confirmed`, `deaths`, `recovered`

- `:value` is a integer value

`GET /v1/countries/:country/where/:field/greater/:value`

```json
"apr": [
{
"country_region": "Australia",
"last_update": "2020-04-02",
"confirmed": "5116",
"deaths": "24",
"recovered": "",
"active": "",
"delta_confirmed": "254",
"delta_recovered": ""
},
{
"country_region": "Australia",
"last_update": "2020-04-03",
"confirmed": "5330",
"deaths": "28",
"recovered": "",
"active": "",
"delta_confirmed": "214",
"delta_recovered": ""
}]
  ...
```
Returns dates from an specific `:country` where the value of `:field` is greater than `:value`

- `:country` is a country name

- `:field` can be `confirmed`, `deaths`, `recovered`

- `:value` is a integer value

`GET /v1/world/total/time`

```json
 "jan": [
{
"date": "2020-01-22",
"confirmed": "555",
"recovered": "28",
"deaths": "17",
"increase_rate": ""
},
{
"date": "2020-01-23",
"confirmed": "654",
"recovered": "30",
"deaths": "18",
"increase_rate": "17.83783783783784"
},]
  ...
```

Returns data from the world per time

`GET /v1/world/total/time/:date`

```json
{
"date": "2020-01-22",
"confirmed": "555",
"recovered": "28",
"deaths": "17",
"increase_rate": ""
}
```

Returns data from world of an specific date 

- `:date` is a date YYYY-MM-DD

`GET /v1/world/total`

```json
  {
  "date": "2020-03-31",
  "confirmed": "857487",
  "recovered": "178034",
  "deaths": "42107",
  "increase rate": "9.601912150978125"
  }
```

Returns the latest uptade from the world

`GET /v1/world/total/time/where/:field/smaller/:value`

```json
"jan": [
{
"date": "2020-01-22",
"confirmed": "555",
"recovered": "28",
"deaths": "17",
"increase_rate": ""
},
{
"date": "2020-01-23",
"confirmed": "654",
"recovered": "30",
"deaths": "18",
"increase_rate": "17.83783783783784"
},]
  ...
```

Returns from world where the value of `:field` is smaller than `:value`

- `:field` can be `confirmed`, `deaths`, `recovered`

- `:value` is a integer value

`GET /v1/world/total/time/where/:field/greater/:value`

```json
"jan": [
{
"date": "2020-01-25",
"confirmed": "1434",
"recovered": "39",
"deaths": "42",
"increase_rate": "52.39107332624867"
},
{
"date": "2020-01-26",
"confirmed": "2118",
"recovered": "52",
"deaths": "56",
"increase_rate": "47.69874476987448"
},]
  ...
```

Returns from world where the value of `:field` is bigger than `:value`

- `:field` can be `confirmed`, `deaths`, `recovered`

- `:value` is a integer value

## About API

The API get the data from a CSV file and parse to JSON, with [lodash](https://lodash.com/) make the process of this JSON file and send the response to user

## Datasources

The datasources are publics datasources from Github

- https://github.com/CSSEGISandData/COVID-19/blob/web-data/data/cases_country.csv

- https://github.com/CSSEGISandData/COVID-19/blob/web-data/data/cases_time.csv

- https://github.com/datasets/covid-19/blob/master/data/worldwide-aggregated.csv
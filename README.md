
# How to deploy:
```
docker-compose up --build
```

Then, go to http://localhost:8000/docs, and test an endpoint there.

Or, you can test an expoint by running following command.

```
curl -X 'GET' \
  'http://localhost:8000/search_all' \
  -H 'accept: application/json'
```


# How to use elasticsearch:

You can go to http://localhost:9200/_cat to explore the elasticsearch. 

The following url is a good reference for accessing elasticsearch over REST-API.

https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html

## Create an index

Refer to https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-create-index.html

## Create a document

Refer to https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html


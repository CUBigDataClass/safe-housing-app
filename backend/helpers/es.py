import urllib
import json
from elasticsearch import Elasticsearch , RequestsHttpConnection
from backend.config.settings import DevConfig

class Base():
    # Check if the index exists or not
    def connectES(esEndPoint):
        print('Connecting to the ES Endpoint {0}'.format(esEndPoint))
        try:
            esClient = Elasticsearch(
                hosts=[{'host': DevConfig.ES_HOST, 'port': DevConfig.ES_PORT}],
                use_ssl=False,
                verify_certs=True,
                connection_class=RequestsHttpConnection)
            print("esClient being returned")
            return esClient
        except Exception as E:
            print("Unable to connect to {0}".format(esEndPoint))
            print(E)
            exit(3)


    # Create Index/Database in elastic search
    def createIndex(esClient, index_name):
        request_body = {
            "settings": {
                "number_of_shards": 1,
                "number_of_replicas": 0
            }
        }


        if esClient.indices.exists(index=index_name):
            print(index_name, "already exists")
        else:
            res = esClient.indices.create(index=index_name, body=request_body)
            print(res)
            print("Creating Index for lambda")


    # Get index if it exists in the elastic search domain
    def get_index(esClient, index_name):
        if esClient.indices.exists(index=index_name):
            print(index_name, "exists")
        else:
            print(index_name, "Index does not exist")


    # Add documents to the index
    def add_documents_index(esClient, index_name, doc_table, id, item_body):
        if esClient.indices.exists(index=index_name):
            # add document to elastic search
            res = esClient.index(index=index_name, doc_type=doc_table, id=id, body=item_body)
            print(res)
        else:
            print(index_name, "Index does not exist")


    # Retrieve all documents from elasticsearch
    def get_document(esClient, index_name):
        res = esClient.search(index=index_name, body={"query": {"match_all": {}}})
        print("%d documents found" % res['hits']['total'])
        for doc in res['hits']['hits']:
            print(doc)
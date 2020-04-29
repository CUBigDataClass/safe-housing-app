from models.mongo_models.base_collections import *
from helpers.flask_response import json_response
from seeds.populate_unilocation import *
from services.propdetailapi import *
from bson.json_util import loads, dumps
import datetime
import re
from time import sleep
from kafka import KafkaProducer
from kafka import KafkaConsumer
import json

producer = KafkaProducer(bootstrap_servers=['localhost:9092'])


def create_pop_city_state():
    result = []
    pairs = get_city_state()
    # data = {'key':'test'}
    # for data in range(10):
    # data = json.dumps(data).encode('utf-8')
    # print(data)
    # producer.send('TestTopic', value=data)

    for pair in pairs:
        result.append(get_prop_details(pair[0],pair[1]).json())
        data = (get_prop_details(pair[0],pair[1]).json())
        data = json.dumps(data).encode('utf-8')
        print(data)
        producer.send('TestTopic', value=data)
    return result
    #need to go to kafka

print(create_pop_city_state())

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

def create_property():
    consumer = KafkaConsumer('TestTopic', bootstrap_servers=['localhost:9092'],enable_auto_commit=False)

    listings = []
    for messages in consumer:
        citi = json.loads(messages.value.decode('utf-8'))
        prop = citi['listings']
        y = []
        for list in prop:
            name =''
            list_date = ''
            photo = ''
            price = 0
            beds = 0
            baths = 0
            price = int(re.findall(r'\d+',list['price'])[0])
            beds = re.findall(r'\d+',list['beds'])
            if len(beds)>0:
                beds = int(beds[0])
            else:
                beds = 1
            baths = int(re.findall(r'\d+',list['baths'])[0])
            if 'name' not in list:
                name = list['address']
            else:
                name = list['name']
            if 'list_date' not in list:
                now = datetime.datetime.now()
                list_date = now.strftime("%Y-%m-%dT%H:%M:%SZ")
            else:
                list_date = list['list_date']
            if 'photo' not in list:
                photo = None
            else:
                photo = list['photo']

            x= {
            "property_id":list['property_id'],
            "listing_id":list['listing_id'] ,
            "prop_type": list['prop_type'],
            "last_update":list['last_update'] ,
            "address": list['address'] ,
            "prop_status": list['prop_status'] ,
            "price_raw": list['price_raw'],
            "list_date":list_date,
            "is_showcase": list['is_showcase'],
            "has_specials":list['has_specials'],
            "price":price,
            "beds":beds,
            "baths":baths ,
            "sqft": list['sqft'],
            "name": name,
            "photo":photo ,
            "short_price": list['short_price'],
            "photo_count":list['photo_count'] ,
            "loc": [round(float(list['lon']),4),round(float(list['lat']),4)],
            "has_leadform":list['has_leadform'],
            "source":list['source'] ,
            "page_no":list['page_no'],
            "rank":list['rank'],
            "list_tracking":list['list_tracking']
            }
            PropInfo.create(x)
        # listings.append(y)
        # print(listings, y)
        # for i in listings:
        #     print("Adding to listings", listings)
        #     for j in i:
        #         b = PropInfo.create(j)
    #         json_str = dumps(b.to_dict())
    #         result.append(json_str)
    # if len(result) :
    #     response = json_response({'ok'}, status=200)
    # else:
    #     response = json_response({'error'}, status=206)
    # return response

print(create_property())
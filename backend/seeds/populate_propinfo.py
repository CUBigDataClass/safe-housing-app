from backend.models.mongo_models.base_collections import *
from backend.helpers.flask_response import json_response
from backend.seeds.populate_unilocation import *
from backend.services.propdetailapi import *
from bson.json_util import loads, dumps
import datetime
import re
import random



# Obtain the Property details by quering for city and state
def create_pop_city_state():
    result = []
    pairs = get_city_state()
    for pair in pairs:
          result.append(get_prop_details(pair[0],pair[1]).json())
    return result

# Populate Property details as a document JSON to MongoDB store
def create_property():
    api_response = create_pop_city_state()
    photos_arr = populate_photos()
    i =0
    listings = []
    result = []
    for citi in api_response:
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
            if 'list_date' not in prop:
                now = datetime.datetime.now()
                list_date = now.strftime("%Y-%m-%dT%H:%M:%SZ")
            else:
                list_date = list['list_date']
            if 'photo' not in prop:
                photo = photos_arr[i]
                i = random.randint(0,14)
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
            y.append(x)
        listings.append(y)
    for i in listings:
        for j in i:
            b = PropInfo.create(j)
            json_str = dumps(b.to_dict())
            result.append(json_str)
    if len(result) :
        response = json_response({'ok'}, status=200)
    else:
        response = json_response({'error'}, status=206)
    return response



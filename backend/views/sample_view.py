
from flask import Blueprint, request
from backend.models.mongo_models.base_collections import *
from backend.helpers.flask_response import json_response
import random

heartbeat_app = Blueprint('heartbeat_app', __name__)


@heartbeat_app.route('/')
def heartbeat():
    return json_response({"status": "OK"})

# API to fetch the Property details and Recommendations based on Geolocation of the University and filter properties
@heartbeat_app.route('/university/fetch', methods=['GET', 'POST'])
def fetch():
    query_parameters = request.args
    if 'uni_name' in request.args:
        uni_name = query_parameters.get('uni_name')
    else:
        return "Error: No University Name field provided. Please specify the University Name."
    if 'price_min' in request.args:
        price_min = int(query_parameters.get('price_min'))
    else:
        return "Error: No Min Price field provided. Please specify the Filters."

    if 'price_max' in request.args:
        price_max = int(query_parameters.get('price_max'))
    else:
        return "Error: No Max Price field provided. Please specify the Filters."

    if 'radius' in request.args:
        radius = int(query_parameters.get('radius'))
    else:
        return "Error: No Radius field provided. Please specify the Filters."

    if 'beds_min' in request.args:
        beds_min = int(query_parameters.get('beds_min'))
    else:
        return "Error: No Min Bed count field provided. Please specify the Filters."

    if 'baths_min' in request.args:
        baths_min = int(query_parameters.get('baths_min'))
    else:
        return "Error: No Min Bath count field provided. Please specify the Filters."

    if 'beds_max' in request.args:
        beds_max = int(query_parameters.get('beds_max'))
    else:
        return "Error: No Max Bed field provided. Please specify the Filters."

    if 'baths_max' in request.args:
        baths_max = int(query_parameters.get('baths_max'))
    else:
        return "Error: No Max Bath field provided. Please specify the Filters."

    try:
        res = UniInfo.get_one({'name': uni_name}, kwargs={})
        json_str = res.to_dict()

        uni_long = json_str['loc']['coordinates'][0]
        uni_lat = json_str['loc']['coordinates'][1]
        state_code = json_str['state']
        city = json_str['city']


        props = PropInfo.objects(loc__near = [uni_long,uni_lat],loc__min_distance=radius,price__gte=price_min,price__lte=price_max,baths__gte=baths_min,baths__lte=baths_max,beds__gte=beds_min,beds__lte=beds_max)[:30]
        res1 = PropInfo.queryset_to_dict(props)
        if not res1:
            res1 = []
        res =[]
        if res1:
            for prop in res1:
                prop_long = prop['loc']['coordinates'][0]
                prop_lat = prop['loc']['coordinates'][1]
                recs = Recommendation.objects(loc__near=[prop_long,prop_lat],loc__min_distance=50)[:5]
                recos = Recommendation.queryset_to_dict(recs)
                [item.update({'type': 'restaurant'}) for item in recos]
                for item in recos:
                    item['Name']=item.get('Name',item['City'])[1:-1]
                    item['address']=item.get('address',item['City'])[1:-1]
                if recos:
                    prop['recommendation'] = recos
                else:
                    prop['recommendation'] = None


                school = School.objects(loc__near=[prop_long,prop_lat],loc__min_distance=50)[:5]
                schools = School.queryset_to_dict(school)
                [item.update({'type': 'school'}) for item in schools]
                [item.update({'rating': random.randint(3,5)}) for item in schools]
                for item in school:
                    item['school_name'] = item['school_name'][1:-1] if 'school_name' in item else item['city']
                    item['school_name'] = item['street_address'][1:-1] if 'street_address' in item else item['city']

                if schools:
                    prop['school'] =schools
                else:
                    prop['school'] = None
                res.append(prop)


        crime = Crime.get_one({'state':state_code, 'city':city})

        if crime:
            crime_details = crime.to_dict()
            if crime_details:
                res2 = {
                "crime_index" : float(crime_details.get('crime_index',30.00) ),
                "safety_index": float(crime_details.get('safety_index',60.00))
                }

        else:
            res2 = {
                "crime_index": 30.00,
                "safety_index": 60.00
            }


        walk = Walk.get_one({'state':state_code, 'city':city})
        if walk:
            walk_details = walk.to_dict()
            if walk_details:
                res3 = {
                    "walk_score": float(walk_details.get('walk_score',70.00)),
                    "transit_score": float(walk_details.get('transit_score', 50.00))
                }
        else:
            res3 = {
                "walk_score": 70.00,
                "transit_score":  50.00
            }


        response ={
            'loc':[uni_long,uni_lat],
            'properties' : res,
            'crime_scores' : res2,
            'walk_scores' : res3,
        }
        if props is None:
            response = {}
        else:
            response = json_response(response, status=200)
    except Exception as ex:
        response = json_response({'error': ex}, status=500)
    return response


# API to retrieve the list of universities to available to the application
@heartbeat_app.route('/university/list', methods=['GET', 'POST'])
def listings():
    try:
        res = UniInfo.get({})
        result = []
        for obj in res:
            x ={
                'id':obj.name,
                'name':obj.name
            }
            result.append(x)
        response ={'uni_list':result}

        if response is None:
            response = {}
        else:
            response = json_response(response, status=200)
    except Exception as ex:
        response = json_response({'error': ex}, status=500)
    return response



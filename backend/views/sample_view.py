from flask import Blueprint, request
from backend.models.mongo_models.base_collections import *
from backend.helpers.flask_response import json_response
from bson.json_util import dumps, loads


heartbeat_app = Blueprint('heartbeat_app', __name__)


@heartbeat_app.route('/')
def heartbeat():
    return json_response({"status": "OK"})


@heartbeat_app.route('/university/fetch', methods=['GET', 'POST'])
def fetch():
    query_parameters = request.args
    if 'uni_name' in request.args:
        uni_name = query_parameters.get('uni_name')
    else:
        return "Error: No University Name field provided. Please specify the University Name."
    if 'price_min' in request.args:
        price_min = query_parameters.get('price_min')
    else:
        return "Error: No Min Price field provided. Please specify the Filters."

    if 'price_max' in request.args:
        price_max = query_parameters.get('price_max')
    else:
        return "Error: No Max Price field provided. Please specify the Filters."

    if 'radius' in request.args:
        radius = query_parameters.get('radius')
    else:
        return "Error: No Radius field provided. Please specify the Filters."

    if 'beds_min' in request.args:
        beds_min = query_parameters.get('beds_min')
    else:
        return "Error: No Min Bed count field provided. Please specify the Filters."

    if 'baths_min' in request.args:
        baths_min = query_parameters.get('baths_min')
    else:
        return "Error: No Min Bath count field provided. Please specify the Filters."

    if 'beds_max' in request.args:
        beds_max = query_parameters.get('beds_max')
    else:
        return "Error: No Max Bed field provided. Please specify the Filters."

    if 'baths_max' in request.args:
        baths_max = query_parameters.get('baths_max')
    else:
        return "Error: No Max Bath field provided. Please specify the Filters."

    try:
        res = UniInfo.get_one({'name': uni_name}, kwargs={})
        json_str = res.to_dict()

        long = json_str['loc']['coordinates'][0]
        lat = json_str['loc']['coordinates'][1]
        state_code = json_str['state']
        city = json_str['city']

        props = PropInfo.objects(loc__geo_within_center = [[ long, lat],5],price__gte=price_min,price__lte=price_max,baths__gte=baths_min,baths__lte=baths_max,beds__gte=beds_min,beds__lte=beds_max)
        res1 = PropInfo.queryset_to_dict(props)
        if res1:
            res1 = res1[0:5]
        else:
            res1 = []
        res =[]
        if res1:
            for prop in res1:
                long = prop['loc']['coordinates'][0]
                lat = prop['loc']['coordinates'][1]
                recs = Recommendation.objects(loc__geo_within_center=[[long, lat], 50])
                recos = Recommendation.queryset_to_dict(recs)
                if recos:
                    prop['recommendation'] =recos[0:5]
                else:
                    prop['recommendation'] = None
                res.append(prop)



        crime = Crime.get_one({'state':state_code, 'city':city})
        crime_details = crime.to_dict()
        if crime_details:
            res2 = {
            "crime_index" : float(crime_details['crime_index']),
            "safety_index": float(crime_details['safety_index'])
            }
        else:
            res2 ={}

        walk = Walk.get_one({'state':state_code, 'city':city})
        walk_details = walk.to_dict()
        if walk_details:
            res3 = {
                "walk_score": float(walk_details['walk_score']),
                "transit_score": float(walk_details['transit_score'])
            }
        else:
            res3 ={}
        response ={
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



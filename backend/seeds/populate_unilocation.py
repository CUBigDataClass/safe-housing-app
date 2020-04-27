from backend.models.mongo_models.base_collections import *
from backend.helpers.flask_response import json_response
from bson.json_util import dumps


# Sample Usage
def readfile_list1():
    with open("../data/unilist1.txt") as fp:
        Lines = fp.readlines()
        y = []
        for line in Lines:
            splits = line.split('->')
            details = splits[0].split(',')
            splits = [x.strip() for x in splits]
            details = [x.strip() for x in details]
            x = {
                "name":details[0],
                "city":details[1],
                "state":details[2],
                "loc": [ round(float(splits[2]),4),round(float(splits[1]),4) ]
                }
            y.append(x)
    return y

def readfile_list2():
    with open("../data/unilist2.txt") as fp:
        Lines = fp.readlines()
        y = []
        for line in Lines:
            splits = line.strip().split(',')
            splits = [x.strip() for x in splits]
            x = {
                "name":splits[0],
                "city":splits[1],
                "state":splits[2],
                "loc": [round(float(splits[7]),4),round(float(splits[6]),4)]
                }
            y.append(x)
    return y

def create_uni():
    res = []
    y1 = readfile_list1()
    y2 = readfile_list2()
    y1=y1+y2
    for i in y1:
        b = UniInfo.create(i)
        json_str = dumps(b.to_dict())
        res.append(json_str)
    if len(res) == len(y1):
        response = json_response(res, status=200)
    else:
        response = json_response({'error'}, status=206)
    return response

# print(create_uni())

def get_city_state():
    city_state=[]
    users = UniInfo.get({})
    for i in range(0,1):
        city = users[i].city
        state = users[i].state
        if (city,state) not in city_state:
            city_state.append((city,state))
    return city_state



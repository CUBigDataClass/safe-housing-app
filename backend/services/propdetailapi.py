import requests
import datetime

def get_prop_details(city,state_code):
    url = "https://realtor.p.rapidapi.com/properties/list-for-rent"

    querystring = {"price_min":"0","baths_min":"0","beds_min":"0","radius":"100","sort":"relevance","state_code":state_code,"limit":"200","city":city,"offset":"0"}
    #querystring = {"price_min":"1000","price_max":"5000","radius":"5","beds_min":"1","sort":"relevance","listed_date_min":"2019-08-01T16%3A24%3A40Z","baths_min":"1","state_code":"NY","limit":"200","city":"New York City","offset":"0"}

    headers = {
        'x-rapidapi-host': "realtor.p.rapidapi.com",
        'x-rapidapi-key': "0c3b7b9f8cmsh73ab62614c1f205p1794d3jsn06608340c56f"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    return response
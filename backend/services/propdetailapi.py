import requests

# This function makes the query to the realtor API to get the list of properties for rent
def get_prop_details(city,state_code):
    url = "https://realtor.p.rapidapi.com/properties/list-for-rent"

    querystring = {"price_min":"0","baths_min":"0","beds_min":"0","radius":"100","sort":"relevance","state_code":state_code,"limit":"200","city":city,"offset":"0"}

    headers = {
        'x-rapidapi-host': "realtor.p.rapidapi.com",
        'x-rapidapi-key': "0c3b7b9f8cmsh73ab62614c1f205p1794d3jsn06608340c56f"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    return response
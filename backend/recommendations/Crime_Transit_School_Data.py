#!/usr/bin/env python
# coding: utf-8

# **Creating the School Index API using DataSet**

# In[ ]:


import pandas as pd


# In[ ]:


df= pd.read_excel("school2.xlsx")
df.head()


# In[ ]:


df_new = df.iloc[:][['NAME','STREET','CITY','STATE','ZIP', 'LAT','LON']]


# In[ ]:


df_new.tail()


# In[ ]:


school_list2=[]
school_list2=df_new.values.tolist()
print(school_list2)


# In[ ]:


import pymongo
from pymongo import MongoClient
client = MongoClient("34.83.108.19",27017)
db = client['gradHousing']
    
for i in range(len(school_list2)):
    article = {"school_name": school_list2[i][0],
            "street_address": school_list2[i][1],
            "city": school_list2[i][2],
            "state":school_list2[i][3],
            "zip":school_list2[i][4],  
             "loc": {"type":"Point",
                     "coordinates":[school_list2[i][6],school_list2[i][5]]},}
    articles = db.school
    result = articles.insert_one(article)


# **Data for crime and safety index**

# In[ ]:


df_crime= pd.read_excel("crimeindex.xlsx")
df_crime.head()


# In[ ]:


city_list=[]
city_list=df.values.tolist()
print(city_list)


# In[ ]:


import pymongo
from pymongo import MongoClient
client = MongoClient("34.83.108.19",27017)
db = client['gradHousing']
    
for i in range(len(city_list)):
    article = {"crime_index":city_list[i][1] ,
            "safety_index": city_list[i][2],
            "city": city_list[i][3],
             "state":city_list[i][4],  
            }
    articles = db.crimescore
    result = articles.insert_one(article)


# **Data for Transit score**

# In[ ]:


df_transit= pd.read_csv("transitscore.csv")
df_transit.head()


# In[ ]:


city_list_walkscore=[]
city_list_walkscore=df_transit.values.tolist()
print(city_list_walkscore)


# In[ ]:


for i in range(len(city_list_walkscore)):
    article = {"walk_score":city_list_walkscore[i][2] ,
            "transit_score": city_list_walkscore[i][4],
            "city": city_list_walkscore[i][0],
             "state":city_list_walkscore[i][1],  
            }
    articles = db.walkscore
    result = articles.insert_one(article)


# In[ ]:





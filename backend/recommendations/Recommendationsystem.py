#!/usr/bin/env python
# coding: utf-8

# # Yelp Recommendation System for Housing Project

# ### Setting up the environment for analysis

# In[ ]:


#Installing the Necessary packages
get_ipython().system('sudo apt install gdal-bin python-gdal python3-gdal ')
get_ipython().system('sudo apt install python3-rtree ')
get_ipython().system('pip install git+git://github.com/geopandas/geopandas.git')
get_ipython().system('pip install descartes ')
get_ipython().system('pip install folium ')
get_ipython().system('pip install plotly_express')


# In[1]:


#Importing the packages
import pandas as pd 
import numpy as np
import json
import folium
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score


# ### Exploratory Analysis

# In[2]:


#Reading the Yelp Business DataSet
df = pd.read_csv('yelp_business.csv')
df.head()


# In[3]:



df.shape


# In[4]:


df['Restaurants'] = df['categories'].str.contains('Restaurants')


# In[5]:


df_restaurants = df.loc[df.Restaurants == True]
df_restaurants.head()


# In[6]:


df_restaurants.shape


# **Sorting the Restaurants based on review count and Stars**

# In[20]:


top_restaurants = df_restaurants.sort_values(by=['review_count', 'stars'], ascending=False)[:1000]
top_restaurants.head()


# **Fetching the list of restaurants based on geoloacation**

# In[21]:


coords = top_restaurants[['longitude','latitude']]
distortions = []
K = range(1,100)
for k in K:
    kmeansModel = KMeans(n_clusters=k)
    kmeansModel = kmeansModel.fit(coords)
    distortions.append(kmeansModel.inertia_)


# **Checking the similarity of an object based on silhouette score**

# In[22]:


from sklearn.metrics import silhouette_score

sil = []
kmax = 50

# dissimilarity would not be defined for a single cluster, thus, minimum number of clusters should be 2
for k in range(2, kmax+1):
  kmeans = KMeans(n_clusters = k).fit(coords)
  labels = kmeans.labels_
  sil.append(silhouette_score(coords, labels, metric = 'euclidean'))


# In[23]:


sil


# **Fitting K-Means model on the data**

# In[24]:


kmeans = KMeans(n_clusters=5, init='k-means++')
kmeans.fit(coords)
y = kmeans.labels
print("k = 5", " silhouette_score ", silhouette_score(coords, y, metric='euclidean'))


# **Prediction based on location**

# In[25]:



top_restaurants['cluster'] = kmeans.predict(top_restaurants[['longitude','latitude']])
top_restaurants.head()


# In[38]:


top_restaurants_order = top_restaurants.sort_values(by=['review_count', 'stars'], ascending=False)
top_restaurants_order.head()


# **Function for recommendation based on geo location**

# In[39]:


def recommend_restaurants(df, longitude, latitude):
    # Predict the cluster for longitude and latitude provided
    cluster = kmeans.predict(np.array([longitude,latitude]).reshape(1,-1))[0]
    print(cluster)
   
    # Get the best restaurant in this cluster
    return  df[df['cluster']==cluster].iloc[0:30][['name','city','stars', 'latitude','longitude','address','categories']]


# **Connecting to Mongo DB**

# In[46]:


import pymongo
from pymongo import MongoClient
client = MongoClient("34.83.108.19",27017)
db = client['gradHousing']


# **Recommendation for North Carolina**

# In[40]:


north_carolina=recommend_restaurants(top_restaurants,35.152725,-80.827953)
north_carolina_list=[]
north_carolina_list=north_carolina.values.tolist()
north_carolina


# **Recommendation for Illinois**

# In[31]:


illinois=recommend_restaurants(top_restaurants,40.1105875,-88.2072697)
illinois_list=[]
illinois_list=illinois.values.tolist()
illinois
illinois = df_restaurants[df_restaurants.state == 'IL'].iloc[0:30][['name','city','stars', 'latitude','longitude','address','categories']].sort_values(by=[ 'stars'], ascending=False)


# **Recommendation for Arizona**

# In[41]:


arizona=recommend_restaurants(top_restaurants,-111.928001,32.424564)
arizona_list=[]
arizona_list=arizona.values.tolist()
arizona


# **Recommendation for Colorado**

# In[33]:


colorado=recommend_restaurants(top_restaurants,-8.392635,51.812438)
colorado_list=[]
colorado_list=arizona.values.tolist()
colorado


# **Recommendation for LasVegas**

# In[34]:


lasvegas=recommend_restaurants(top_restaurants,-115.287451,36.159483)
lasvegas_list=[]
lasvegas_list=arizona.values.tolist()
lasvegas


# **Pushing the Data to DataBase**

# In[ ]:


for i in range(len(north_carolina_list)):
    article = {"State": "North Carolina",
            "Name": north_carolina_list[i][0],
            "City": north_carolina_list[i][1],
             "Rating":north_carolina_list[i][2], 
             "address":north_carolina_list[i][5],
             "category":north_carolina_list[i][6],
             "loc":{"type":"Point",
                     "coordinates": [north_carolina_list[i][4],north_carolina_list[i][3]]},}
    articles = db.recommendations
    result = articles.insert_one(article)


# In[42]:


for i in range(len(lasvegas_list)):
    article = {"State": "LasVegas",
            "Name": lasvegas_list[i][0],
            "City": lasvegas_list[i][1],
            "Rating":lasvegas_list[i][2], 
            "address":lasvegas_list[i][5],
            "category":lasvegas_list[i][6],
             "loc": {"type":"Point",
                     "coordinates":[lasvegas_list[i][4],lasvegas_list[i][3]]},}
    articles = db.recommendations
    result = articles.insert_one(article)


# In[43]:


for i in range(len(arizona_list)):
    article = {"State": "Arizona",
            "Name": arizona_list[i][0],
            "City": arizona_list[i][1],
             "Rating":arizona_list[i][2],
             "address":arizona_list[i][5],
             "category":arizona_list[i][6],  
             "loc":{"type":"Point",
                     "coordinates": [arizona_list[i][4],arizona_list[i][3]]},}
    articles = db.recommendations
    result = articles.insert_one(article)


# In[44]:


for i in range(len(illinois_list)):
    article = {"State": "Illinois",
            "Name": illinois_list[i][0],
            "City": illinois_list[i][1],
             "Rating":illinois_list[i][2], 
            "address":illinois_list[i][5],
             "category":illinois_list[i][6],
             "loc":{"type":"Point",
                     "coordinates": [illinois_list[i][4],illinois_list[i][3]]},}
    articles = db.recommendations
    result = articles.insert_one(article)


# In[45]:


for i in range(len(colorado_list)):
    article = {"State": "Colorado",
            "Name": colorado_list[i][0],
            "City": colorado_list[i][1],
            "Rating":colorado_list[i][2],
            "address":colorado_list[i][5],
             "category":colorado_list[i][6],
             "loc":{"type":"Point",
                     "coordinates": [colorado_list[i][4],colorado_list[i][3]]},}
    articles = db.recommendations
    result = articles.insert_one(article)


# **Validation of Recommendation**

# In[1]:


# illinois_list=[]
# illinois_list=illinois.values.tolist()
# illinois

# lasvegas = df_restaurants[df_restaurants.state == 'NV'].iloc[0:30][['name','city','stars', 'latitude','longitude','address','categories']].sort_values(by=[ 'stars'], ascending=False)

# lasvegas_list=[]
# lasvegas_list=lasvegas.values.tolist()
# lasvegas



# colorado = df_restaurants[df_restaurants.state == 'CO'].iloc[0:2][['name','city','stars', 'latitude','longitude','address','categories']]
# colorado_list=[]
# colorado_list=colorado.values.tolist()
# colorado


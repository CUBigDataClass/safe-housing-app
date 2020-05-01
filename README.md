# GRADUATE SAFE HOUSING APP
​
I've setup project repo and created sampel heartbeat app - Check views/sample_view file for the api that has been created.
I've also created folders with logical meaning that requires data on 
​
​
### Redis Server Installation steps
Follow the link[https://cloud.google.com/community/tutorials/setting-up-redis]
​
Sections:
* Install  redis 
* Configure redis remote access
​
### ElasticSearch Server Installation steps
Follow the link[https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html]
​
Sections:
* Download and install the debian package manually
* SysV init vs systemd
​
#### Helpful links for common errors:
* https://stackoverflow.com/questions/19581059/misconf-redis-is-configured-to-save-rdb-snapshots
​
​
https://github.com/numberly/mongo-thingy
​
### MongoDB Server Instalation steps
Follow the link for ubuntu[https://hevodata.com/blog/install-mongodb-on-ubuntu/]
ODM tutorials:
* mongo-engine : [http://docs.mongoengine.org/tutorial.html]
* pymongo : [https://github.com/mongodb/mongo-python-driver]
​
Login to mongo server and run `mongod` if the server isn't running.
Use `mongo 34.82.47.46:27017` to connect to database from client and query results.


Steps to run the app locally:

	Backend: 
		cd backend
		pip3 install -r requirement.txt
		python3 app.py

	Frontend
		cd frontend
		npm install
		npm start

## The Graduate Housing Recommendator App is hosted at the link http://35.239.108.43:3000/

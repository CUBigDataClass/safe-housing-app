from models.mongo_models.base import *

class Page(Base):
    meta = {'collection': 'page', 'abstract': False}
    title = StringField(max_length=200, required=True)
    date_modified = DateTimeField(default=datetime.utcnow)


# Sample Usage
# page = Page.create({'title': 'MongoEngine2'})
# print(page)

# res = Page.get({'title': 'MongoEngine2'}, kwargs={'skip': 1, 'limit': 1})
# print(res.values_list('date_modified'))

# res = Page.get_one({'title': 'MongoEngine2'})
# print(res)

# Page.update_all({'title': 'MongoEngine2'}, {'title': 'MongoEngine3'})

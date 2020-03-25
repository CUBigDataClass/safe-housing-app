from mongoengine import *
from backend.config.settings import DevConfig
from datetime import datetime

connect(DevConfig.MONGO_DB, host=DevConfig.MONGO_HOST, port=DevConfig.MONGO_PORT)


# db_field: Specify a different field name
# required: Make sure this field is set
# default: Use the given default value if no other value is given
# unique: Make sure no other document in the collection has the same value for this field
# choices: Make sure the field’s value is equal to one of the values given in an array

class Base(Document):
    meta = {'abstract': True, 'strict': False}

    @classmethod
    def create(cls, data):
        model = cls(**data)
        model.save()
        return model

    # http: // docs.mongoengine.org / guide / querying.html  # filtering-queries
    @classmethod
    def get(cls, params, **kwargs):
        kwargs = kwargs.get('kwargs', {})
        order_by_clause = kwargs.get('order_by', None)
        skip = kwargs.get('skip', None)
        limit = kwargs.get('limit', None)

        if params:
            result = cls.objects(__raw__=params)
        else:
            result = cls.objects()

        if order_by_clause:
            result = result.order_by(order_by_clause)
        if skip and limit:
            result = result[skip:limit]
        elif skip:
            result = result[skip:]
        elif limit:
            result = result[:limit]

        return result.all()

    @classmethod
    def get_one(cls, params, **kwargs):
        order_by_clause = kwargs.get('kwargs', {}).get('order_by', None)

        result = cls.objects(__raw__=params)

        if order_by_clause:
            result = result.order_by(order_by_clause)

        return result.first()

    @classmethod
    def update_all(cls, params, data, **kwargs):
        is_upsert = kwargs.get('kwargs', {}).get('upsert', False)
        return cls.objects(__raw__=params).update(**data, upsert=is_upsert)

    def to_dict(self):
        return self.to_mongo().to_dict()

    @staticmethod
    def queryset_to_dict(data):
        return [item.to_mongo().to_dict() for item in data]




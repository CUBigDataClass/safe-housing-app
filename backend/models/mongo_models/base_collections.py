from backend.models.mongo_models.base import *

class UniInfo(Base):
    meta = {'collection': 'UniInfo', 'abstract': False,'strict': False}
    name = StringField(max_length=200, required=True)
    city = StringField(max_length=200, required=False)
    state = StringField(max_length=200, required=False)
    loc = PointField(required=True)

class PropInfo(Base):
    meta = {'collection': 'PropInfo', 'abstract': False,'strict': False}
    property_id = StringField(required=True)
    listing_id = StringField(required=True)
    prop_type = StringField(max_length=200, required=False)
    last_update = StringField(max_length=200, required=False)
    address = StringField(max_length=400,required=True)
    prop_status = StringField(max_length=200,required=True)
    price_raw = IntField(required=True)
    list_date = StringField(max_length=200, required=False)
    is_showcase = BooleanField(required=False)
    has_specials = BooleanField(required=False)
    price = IntField(required=True)
    beds = IntField(required=True)
    baths = IntField(required=True)
    sqft = StringField(max_length=200,required=False)
    name = StringField(max_length=200,required=False)
    photo = StringField(max_length=200,required=False)
    short_price = StringField(max_length=200,required=False)
    photo_count = IntField(required=True)
    loc = PointField(required=True)
    pet_policy = StringField(max_length=200,required=False)
    has_leadform = BooleanField(required=False)
    source =  StringField(max_length=200,required=False)
    page_no = IntField(required=True)
    rank = IntField(required=True)
    list_tracking = StringField(max_length=500,required=False)

class Crime(Base):
    meta = {'collection': 'crimescore', 'abstract': False, 'strict': False}
    crime_index = FloatField(required=True)
    safety_index = FloatField(required=True)
    city = StringField(max_length=200, required=True)
    state = StringField(max_length=200, required=True)

class Walk(Base):
    meta = {'collection': 'walkscore', 'abstract': False, 'strict': False}
    walk_score = FloatField(required=True)
    transit_score = FloatField(required=True)
    city = StringField(max_length=200, required=True)
    state = StringField(max_length=200, required=True)

class Recommendation(Base):
    meta = {'collection': 'recommendations', 'abstract': False, 'strict': False}
    State = StringField(max_length=200, required=True)
    Name = StringField(max_length=200, required=True)
    City = StringField(max_length=200, required=True)
    address = StringField(max_length=400, required=True)
    Rating = IntField(required=False)
    loc = PointField(required=True)

class School(Base):
    meta = {'collection': 'school', 'abstract': False, 'strict': False}
    school_name = StringField(max_length=200, required=True)
    street_address = StringField(max_length=400, required=True)
    city = StringField(max_length=200, required=True)
    state = StringField(max_length=200,required=True)
    zip = StringField(max_length=200,required=True)
    loc = PointField(required=True)
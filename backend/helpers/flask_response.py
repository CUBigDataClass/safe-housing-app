
import json
from flask import Response


def json_response(body='', **kwargs):
    body = json.dumps(body).encode('utf-8')
    status = kwargs.get('status', None) or 200
    response = Response(body, status=status)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    return response
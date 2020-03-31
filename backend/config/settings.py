import os
import configparser

class BaseConfig():
   API_PREFIX = '/api'
   TESTING = False
   DEBUG = False

   config = configparser.ConfigParser()

   @staticmethod
   def get_or_else(section, option, default_value):
      if BaseConfig.config.has_option(section, option):
         return BaseConfig.config.get(section, option,
                                  fallback=default_value)
      else:
         return os.environ.get(section, option, )


class DevConfig(BaseConfig):
   REDIS_HOST = '104.154.59.49'
   REDIS_DB = 0
   REDIS_PORT = 6379

   ES_HOST = '146.148.94.194'
   ES_PORT = 9200

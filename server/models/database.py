import psycopg2
from psycopg2.extras import RealDictCursor
from config.config import Config

def get_db_connection():
    try:
        conn = psycopg2.connect(Config.DB_URL, cursor_factory=RealDictCursor)
        print("Database Connection Successful")
        return conn
    except:
        print("Database Connection Failed")
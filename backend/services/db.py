import mysql.connector
from mysql.connector import Error

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='chidikeyz',
            password='chidikeyz',
            database='skilltrack'
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

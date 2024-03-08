import requests

def get_todos():
    response = requests.get("http://localhost:5000/")
    return response.json()

def add_todo(title):
    data = {"title": title}
    response = requests.post("http://localhost:5

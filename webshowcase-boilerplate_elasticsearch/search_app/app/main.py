import os
from fastapi import FastAPI
import requests
from faker import Faker
import json
import time
from pydantic import BaseModel


ELASTIC_URL = os.environ['ELASTIC_URL']

# populate dummy data
print('------------ Start populating dummy data ----------------')

## create index
INDEX_NAME = "myindex"
try:
    response = requests.get(ELASTIC_URL)
except:
    response = []

while not response:
    print('stuck here')
    time.sleep(2)
    try:
        response = requests.get(ELASTIC_URL)
    except:
        response = []

# response = requests.put(ELASTIC_URL+'/'+INDEX_NAME)
response = requests.put(ELASTIC_URL+'/project')

## create dummy document
# fake = Faker() # constuctor for fake data
# NUM_DOC = 10
# for i in range(NUM_DOC):
    # url = ELASTIC_URL+'/'+INDEX_NAME+'/_create/'+str(i+1)
    # data = json.dumps({"name":fake.name(),"address":fake.address()})
    # headers = {'Content-Type':'application/json'}
    # response = requests.post(url,data=data,headers=headers)
    # print(i,response.status_code)
    # print(url)
    # print(data)

print('------------ Finish populating dummy data ----------------')

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

class Project(BaseModel):
    userID: int
    courseID: int
    # projectImage: float
    projectName: str
    description: str
    # demoVideo:
    # thumbnailImage
    verified: bool

@app.post("/register_project/{id}")
async def create_register_project(project: Project,id: int):
    url = ELASTIC_URL+'/project/_create/'+str(id)
    data = json.dumps({"userID":project.userID, "courseID":project.courseID, "projectName":project.projectName, "description":project.description, "verified":project.verified})
    headers = {'Content-Type':'application/json'}
    response = requests.post(url,data=data,headers=headers)
    return json.dumps({"status":response.status_code})



@app.get("/search_all")
def search_all_items():

    url = ELASTIC_URL+'/project/_search?pretty'
    headers = {'Content-Type':'application/json'}

    try:
        response = requests.get(url,headers=headers)
        json_received = response.json()
        status_code = response.status_code
    except:
        json_received = {}
        status_code = 400


    return {"json": json_received, "status":str(status_code)}


    
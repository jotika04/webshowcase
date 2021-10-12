---
title : API

---
#

## User API

### Register

>POST /api/v1/user/register

Insert the guest information for the account.

```
Json Body Message
{
  "email": "string",
  "password": "string",
  "userFirstName": "string",
  "userLastName": "string",
  "username": "string"
}
```

Responds

On success :
* Response header is 200 OK 
* Body message contain user info in json 

On Error :
* Response header is 400 Bad Request
* Response header is 404 Not Found
* Response header is 500 Internal Server Error

### Login 

>POST /api/v1/user/login

Insert login referals to get into the user respective accounts.


```
json Response
{
  "email": "string",
  "password": "string",
  "userID": 0
}
```

On success :
* Response header is 200 OK and the response body contain the login info.

On Error : 
* Response header is 400 Bad Request
* Response header is 404 Not Found
* Response header is 500 Internal Server Error

### User Info API

>GET /api/v1/user/:userID

Get the user id to find the user's profile

Responses

On Success : 
* Respond header 200 OK

On Error :
* Respond header 400 Bad Request
* Respond header 404 Not Found
* Respond Header 500 Internal Server Error

## Profile API

### Update Profile 

>PATCH /api/v1/user/update-profile

Replaces the data on the database with a new one to change the old data.

```
Json body message
{
  "address": "string",
  "batchYear": 0,
  "phoneNum": "string",
  "userFirstName": "string",
  "userLastName": "string"
}
```

Responses

On Success :
* Response Header is 200 OK 
* Message body is put on the database

On Error :
* Response header is 400 Bad Request
* Response header is 404 Not Found
* Response header is 500 Internal Server Error

### Update Role 

>PATCH /api/v1/user/update-role

Changes the role of the user

```
Json message :
{
  "role": "string",
  "userID": 0
}
```

Responses :

On Success:
* Response header is 200 OK
* Change the role of the user on the database

On Error :
* Response header is 400 Bad Request
* Response header is 404 Not Found
* Response header is 500 Internal Server Error


## Project API

### Submit API

>POST /api/v1/project/submit

Submitting the user's project into the database.

```
Json Response
{
  "course": "string",
  "description": "string",
  "projectID": "string,
  "projectImage": "string",
  "projectName": "string",
  "projectThumbnail": "string",
  "projectVideo": "string",
  "userID": "string",
  "verified": "boolean", 
  "status": "Unchecked"
 }
```

On success : 
* Project is put on the database and the validator would be able to see it on their dashboard.
* Response header is 200 OK

On error :
* Response header is 400 Bad Request
* Response header is 404 Not Found
* Response header is 500 Internal Server Error

### Verify Project

The endpoint is for verify the project that was been submitted.

 >PATCH /api/v1/project/verify

```
Json Response 
{"projectid":"string", "verified": boolean, "status": Checked
```

On success : 
* Returns the verified parameter as true
* Response header is 200 OK

On error :
* Response header is 400 Bad Request
* Response header is 404 Not Found
* Response header is 500 Internal Server Error

### Reject Project

Rejecting the project for the user to correct it.

DELETE /api/v1/project/reject

```
json response
{
  "message": "string",
  "projectID": 0
}
```

On success : 
* Response header is 200 OK

On error :
* Response header is 400 Bad Request
* Response header is 404 Not Found
* Response header is 500 Internal Server Error



### List of unvalidated projects

>GET /api/v1/unverified-project

Takes the data of projects where the parameter of verified is false and the status is unchecked.d

```
json response
"{"data":[""{
  "course": "string",
  "description": "string",
  "projectID": "string,
  "projectImage": "string",
  "projectName": "string",
  "projectThumbnail": "string",
  "projectVideo": "string",
  "userID": "string",
  "verified": "boolean", 
  "status":"string"
 }"
```

On success :
* Gives list of unverified projects
* Response header is 200 OK

On error :
* Response header is 400 Bad Request
* Response header is 404 Not Found
* Response header is 500 Internal Server

### Project Details

>GET /api/v1/project/:projectID

See the project details by using project id.

```
Json Response
{
  "course": "string",
  "description": "string",
  "projectID": 0,
  "projectImage": "string",
  "projectName": "string",
  "projectThumbnail": "string",
  "projectVideo": "string",
  "userID": 0,
  "verified": true
}
```

On success :
* Return the project data that has been chosen.
* Response header is 200 OK

On error :
* Response header is 400 Bad Request
* Response header is 404 Not Found
* Response header is 500 Internal Server




## Notification API

### Notification 

> GET /api/v1/user/notification/:userID

Get all of the notification that has been sent to a user by using userID.

On success :
* Show the notifications of the specific user
* Response header is 200 OK

On error :
* Response header is 400 Bad Request
* Response header is 404 Not Found
* Response header is 500 Internal Server

### Read Notification

> DELETE /api/v1/user/notification/read/:notificationID

Delete the notification that is already seen.

```
json response
{
  "NotificationID":"string"
}
```

## Tokens

### New Access Token

> GET /api/v1/get-access-token

Take a new access token by using a refresh token.

```
Json response 
{
  "refresh_token": "string"
}
```
On success :
* Returns access token
* Response header is 200 OK

On error :
* Response header is 400 Bad Request
* Response header is 404 Not Found
* Response header is 500 Internal Server

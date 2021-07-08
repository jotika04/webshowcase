This is a boilerplate for a REST-API by using Go.

# How to run

```
docker-compose up --build
```

Now, you can go to http://127.0.0.1:3000/swagger/index.html

You can access the phpmyadmin through http://localhost:8080 
and login using the username 'root' and the password 'my-secret-pw'

```
Available Endpoints:
User:
http://127.0.0.1:3000/api/v1/user/register		: register
http://127.0.0.1:3000/api/v1/user/login			: login
http://127.0.0.1:3000/api/v1/user/get-access-token  	: get new access token

Profile:
http://127.0.0.1:3000/api/v1/user/:userID		: return user info
http://127.0.0.1:3000/api/v1/user/update-profile	: update user profile

Project:
http://127.0.0.1:3000/api/v1/project/:projectID		: return project info
http://127.0.0.1:3000/api/v1/project/submit		: submit project
http://127.0.0.1:3000/api/v1/unverified-project		: get unverified projects
http://127.0.0.1:3000/api/v1/project/verify    	: verify project

Notification:
http://127.0.0.1:3000/api/v1/user/notification/:userID	: return notifications

Admin:
http://127.0.0.1:3000/api/v1/user/update-role    	: update user role
```

# Reference
https://levelup.gitconnected.com/creating-a-swagger-documented-go-web-server-in-two-easy-steps-59f1118bd247

# Further reading
https://dev.to/koddr/build-a-restful-api-on-go-fiber-postgresql-jwt-and-swagger-docs-in-isolated-docker-containers-475j

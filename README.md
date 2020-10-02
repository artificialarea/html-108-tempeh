# HTML-108 Server

Deployed to: **https://glacial-forest-14425.herokuapp.com** _(requires Authorization)_

Corresponding client repo: **[html-108-app](https://github.com/artificialarea/html-108-app)**


## API Documentation
API TOKEN Authorization required

* **`POST`**
  * **`/api/tracks`** create new track via `/add-track` URL
  * **`/api/users`** create new user via `/register` URL
  
* **`GET`** 
  * **`/api/tracks`** get all tracks
  * **`/api/tracks?visible=true`** get all publicly visible tracks for community `/dashboard` URL
  * **`/api/tracks?userId=[:userId]`** get all tracks for signed-in user's `/my-dashboard` URL
  * **`/api/tracks/:trackId`** get particular track for `/track/:trackId` URL
  * **`/api/users`** get all users associated with `/api/tracks/?visible=true`
  * **`/api/users/:userId`** for user to log-in
  
* **`PATCH`**
  * **`/api/tracks/:trackId`** update track via `/track/:trackId` URL
  * **`/api/users`** update user profile
  
* **`DELETE`**
  * **`/api/tracks/:trackId`** delete track via `/dashboard` URL
  * **`/api/users`** delete profile

<br />

<br />

<hr />
Init boilerplate: https://github.com/artificialarea/node-postgres-boilerplate

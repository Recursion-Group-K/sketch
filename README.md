<h1 align="center">
  Etch A Sketch
  <br>
</h1>

## 🎨 Demo

![output](https://github.com/Recursion-Group-K/sketch/assets/66197642/7cf50fb7-c1bc-44d5-9295-ac27421384b7)

<br>

## Technology Used

| Category | Techonology |
|---------------|----------------------|
| Frontend Framework        | Vue.js   |
| Global State management   | Vuex     |
| 2d canvas library |         Konva.js |
| Server-side Framework | Django (Implemented in separate repo. See [sketch-backend](https://github.com/Recursion-Group-K/sketch-backend)  )     |
| Web API      | Django REST framework |
| Database | PostgreSQL (Heroku Addon) |

<br>

## Features

#### Sharing Drawings on X (Twitter)  
Allows users to draw on a canvas, save their artwork, and share it on X (Twitter).

![twitter](https://github.com/Recursion-Group-K/sketch/assets/66197642/74239dc8-3540-4097-bc7c-b02a898a1f9c)

#### Gallery 

All users can view the artworks created by authenticated users. Authenticated users have the option to choose whether to add their artwork to the gallery.

![gallery](https://github.com/Recursion-Group-K/sketch/assets/66197642/26265d58-5d17-4017-8796-c9fb628ecbe3)

#### Cloudinary Integration

User’s artworks are securely saved by uploading media files from server-side code to a cloud-based image management service.

![cloudinary](https://github.com/Recursion-Group-K/sketch/assets/66197642/dbedc4a9-d662-4956-8056-1bae60253ec1)

<br>

## Web API Endpoint

| HTTP   | URL                     | Required Information        | Authorization | Response (200)             |
| ------ | ----------------------- | --------------------------- | ------------- | -------------------------- |
| GET    | /api/                   | None                        | None          | None                       |
|        |                         |                             |               |                            |
| POST   | /api/token-auth         | username, password          | None          | Refresh_token, Access_token|
| GET    | /api/current_user       | None                        | Token         | Authenticated user info    |
|        |                         |                             |               |                            |
| GET    | /api/users              | None                        | Token         | All users info             |
| POST   | /api/users              | username, password, email?  | IsAdmin       | New user info              |
| GET    | /api/users/:id          | None                        | Token         | User info for :id          |
| PATCH  | /api/users/:id          | username                    | Token         | None                       |
| DELETE | /api/users/:id          | None                        | Token         | None                       |
|        |                         |                             |               |                            |
| GET    | /api/drawings           | None                        | Token         | All drawings info          |
| POST   | /api/drawings           | Registration info           | Token         | New drawing info           |
| GET    | /api/drawings/?user=:id | ?user=:id parameter         | Token         | Drawings list by user ID   |
| GET    | /api/drawings/:id       | None                        | Token         | Drawing info for :id       |
| PATCH  | /api/drawings/:id       | Update info                 | Token         | None                       |
| DELETE | /api/drawings/:id       | None                        | Token         | None                       |

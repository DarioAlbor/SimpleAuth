# SimpleAuth 🔒

[Spanish](README.md) <img src="https://flagicons.lipis.dev/flags/4x3/ar.svg" width="20"/> / [English](README_en.md) <img src="https://flagicons.lipis.dev/flags/4x3/us.svg" width="20"/>

## 📖 About the project

SimpleAuth is a project using authentication and session management, allowing for secure registration, login, and active sessions using JWT. It also allows for changing profile pictures, changing passwords (hashed with MD5), real-time viewing of connected/disconnected users, and soon password recovery and account verification via email.

## 💻 Technologies used

- **Frontend:** React.js, Chakra-UI
- **Backend:** Node.js, Express
- **Authentication:** JWT
- **Database:** MongoDB

## 🚀 How to deploy

- `git clone https://github.com/DarioAlbor/SimpleAuth.git`

## Frontend
- `cd client`
- `cd src/utils/apiroutes.js` Modify the route with your backend
- `yarn`
- `yarn start`
## Backend
- `cd server`
- Modify `.env.example` with your data and rename it to `.env`
- `npm install`
- `npm run dev`

## 📬 Contact

You can contact me via my [LinkedIn](https://www.linkedin.com/in/albordario/).

## 📷 Images

| ![User Profile](./imagesgit/index.png) | ![Login](./imagesgit/signin.png) |
|:---------------------------------------:|:-------------------------------:|
| User Profile                            | Login                           |
|                                         |                                |
| ![Register](./imagesgit/signup.png)   | ![Change Profile Image](./imagesgit/changeimage.png) |
| Register                                | Change Profile Image            |
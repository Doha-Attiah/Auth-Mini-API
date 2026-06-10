#  Auth Mini API

Minimal Express + MongoDB API built to practice Authentication & Authorization concepts .

This project focuses on understanding:

- Authentication
- Authorization
- JWT
- Cookies
- Role Middleware
- Rate Limiting
- XSS Protection
- Validation



---


#  Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Argon2
- JSON Web Token (JWT)
- Cookie Parser
- Express Validator
- Express Rate Limit
- XSS
- Morgan
- Dotenv

---

#  Project Structure

```txt
auth-mini-api/
├── app.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── src/
    ├── models/
    │   └── User.js
    │
    ├── controllers/
    │   ├── auth.controller.js
    │   └── protected.controller.js
    │
    ├── middlewares/
    │   ├── auth.js
    │   ├── role.js
    │   └── validate.js
    │
    └── routes/
        ├── auth.routes.js
        └── protected.routes.js
```

---

#  Environment Variables

Create `.env`

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/auth-mini-api
JWT_SECRET_KEY=auth_mini_api_secret
JWT_EXPIRES_IN=1d
```

Check `.env.example` for reference.

---

#  Installation

Install dependencies:

```bash
npm install
```

Run server:

```bash
npm run watch
```

Server:

```txt
http://localhost:3000
```

---

#  Postman Documentation

Collection Documentation:

https://documenter.getpostman.com/view/54437524/2sBXwsK9q3


---

#  Authentication Routes

## Signup

```http
POST /api/v1/auth/signup
```

Example:

```json
{
"name":"Doha",
"email":"doha@gmail.com",
"password":"12345678"
}
```

Creates user and hashes password using Argon2.

---

## Login

```http
POST /api/v1/auth/login
```

Example:

```json
{
"email":"doha@gmail.com",
"password":"12345678"
}
```

Verifies password using:

```js
argon2.verify()
```

Returns JWT inside:

```txt
httpOnly Cookie
```

Cookie name:

```txt
accessToken
```

---

## Profile

```http
GET /api/v1/auth/profile
```

Protected route.

Requires valid cookie.

---

## Logout

```http
POST /api/v1/auth/logout
```

Clears auth cookie.

---

#  Protected Routes

## Any Authenticated User

```http
GET /api/v1/me/welcome
```

```http
GET /api/v1/me/account-summary
```

---

## Admin Only

```http
GET /api/v1/admin/overview
```

```http
GET /api/v1/admin/users
```

```http
DELETE /api/v1/admin/users/:id
```

---

#  How To Test In Postman

## Step 1 — Signup

Send:

```http
POST /api/v1/auth/signup
```

Example body:

```json
{
"name":"Doha",
"email":"doha@gmail.com",
"password":"12345678"
}
```

---

## Step 2 — Login

Send:

```http
POST /api/v1/auth/login
```

After login:

JWT is automatically stored in:

```txt
Cookies
```

Postman sends cookies automatically.

Use the same collection/session.

---

## Step 3 — Test Auth Route

Send:

```http
GET /api/v1/auth/profile
```

Expected:

```txt
200 OK
```

Without cookie:

```txt
401 Unauthorized
```

---

## Step 4 — Test Protected Routes

User:

```http
GET /api/v1/me/welcome
```

```http
GET /api/v1/me/account-summary
```

Expected:

```txt
200 OK
```

---

User tries:

```http
GET /api/v1/admin/overview
```

Expected:

```txt
403 Forbidden
```

---

Admin:

Login again after changing:

```json
"role":"admin"
```

Expected:

```txt
200 OK
```

for all protected routes.

---

#  Role Access Matrix

| Route | User | Admin |
|---|---|---|
| Welcome | ✅ | ✅ |
| Account Summary | ✅ | ✅ |
| Admin Overview | ❌ 403 | ✅ 200 |
| Get Users | ❌ 403 | ✅ 200 |
| Delete User | ❌ 403 | ✅ 200 |

---

#  Security Features

## Password Hashing

Implemented using:

```txt
Argon2
```

Passwords are never stored as plain text.

---

## JWT Cookies

JWT stored inside:

```txt
httpOnly Cookie
```

---

## Rate Limiting

Applied on:

```txt
Signup
Login
```

Login uses stricter limit.

After repeated attempts:

```json
{
"success":false,
"message":"Too many login attempts"
}
```

---

## Validation

Implemented using:

```txt
express-validator
```

Invalid input returns:

```txt
400 Bad Request
```

---

## XSS Protection

Global middleware registered.

Example:

Input:

```html
<script>alert('xss')</script>
```

Stored:

```txt
&lt;script&gt;
```

instead of executable script.

---


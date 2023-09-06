# UniExplorers Backend

## .env which works with Docker
```ini
CLIENT=pg
PORT=8080
DATABASE=uniexplorers
PG_USER=postgres
PASSWORD=postgres
HOST=db
PG_PORT=5432
```

## Routes

### `/`
#### `GET`
Returns `Hello World`

### `/users`
#### `GET`
Returns all users (currently)

Expected response: JSON array of user objects

```json
[
    {
        "id": 1,
        "email": "test@test.com",
        "password": "bcrypt_hashed_password",
        "university": "university_name",
        "is_admin": true,
        // nullable params
        "is_alumni": null, // boolean
        "year_on_exchange": null, // int
        "exchange_duration": null // int
    }
]
```
#### `POST`
Expected parameters

`email`: email account identifying user

`password`: will be bcrypt hashed

`university`: currently expects a string

Expected response: JSON array of new user

```json
[
    {
        "id": 1,
        "email": "test@test.com",
        "password": "bcrypt_hashed_password",
        "university": "university_name",
        "is_admin": true,
        // nullable params
        "is_alumni": null, // boolean
        "year_on_exchange": null, // int
        "exchange_duration": null // int
    }
]
```

### `/login`

#### `POST`
Expected parameters

`email`: email account identifying user

`password`: password

Expected reponse

Successful login: `HTTP 200`

Any login error: `HTTP 400`

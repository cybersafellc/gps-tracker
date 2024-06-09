# API Spec

## Created User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "example",
  "password": "example",
  "name": "example",
  "phone": "example",
  "email": "example@mail.com"
}
```

Responses Body Success :

```json
{
  "status": 200,
  "message": "successfully created",
  "data": {
    "username": "example",
    "name": "example"
  },
  "refrence": null,
  "error": false
}
```

Responses Body Error :

```json
{
  "status": 400,
  "message": "username already exist",
  "data": null,
  "refrence": null,
  "error": true
}
```

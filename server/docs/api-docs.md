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

## User Login

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "example",
  "password": "example"
}
```

Responses Body Success :

```json
{
  "status": 200,
  "message": "successfully login",
  "data": {
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzODMyNjk4Njg2MTU1NWUxNjQxYS1mOWJmLTQxZjMtOTI1Yi1hYjYwMDVjODA0N2IxNzE3OTc3MDY3MDQ1IiwiaWF0IjoxNzE3OTkyMTk5LCJleHAiOjE3MTg1OTY5OTl9.04XBZ_9LRof2ATYHkb7j83X3l2rcsdfssO70nEbTaqTPr0s",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzODMyNjk4Njg2MTU1NWUxNjQxYS1mOWJmLTQxZjMtOTI1Yi1hYjYwMDVjODA0N2IxNzE3OTc3MDY3MDQ1IiwiaWF0IjoxNzE3OTkyMTk5LCJleHAiOjE3MTc5OTI0OTl9.elIdFyFoct86myncKw8x1HyEogMdsdfTyjN3d3xurVVqcOc"
  },
  "refrence": null,
  "error": false
}
```

Responses Body Error :

```json
{
  "status": 400,
  "message": "username and password not match",
  "data": null,
  "refrence": null,
  "error": true
}
```

## User Verify Access Token

Endpoint : GET /api/users/verify-token

Headers :

- Authorization : access_token

Responses Body Success :

```json
{
  "status": 200,
  "message": "access_token verified",
  "data": null,
  "refrence": null,
  "error": false
}
```

Responses Body Error :

```json
{
  "status": 400,
  "message": "please provided valid access_token!",
  "data": null,
  "refrence": null,
  "error": true
}
```

## User Refresh Token

Endpoint : GET /api/users/refresh-token

Headers :

- Authorization : refresh_token

Responses Body Success :

```json
{
  "status": 200,
  "message": "successfully get new access_token",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzODMyNjk4Njg2MTU1NWUxNjQxYS1mOWJmLTQxZjMtOTI1Yi1hYjYwMDVjODA0N2IxNzE3OTc3MDY3MDQ1IiwiaWF0IjoxNzE3OTkyNjY2LCJleHAiOjE3MTc5OTI5NjZ9.bXhnvvPKhmSezmWK-sqYsasdMSOZmBRwo-4VeWYAPeWOG20"
  },
  "refrence": null,
  "error": false
}
```

Responses Body Error :

```json
{
  "status": 400,
  "message": "please provided valid refresh_token!",
  "data": null,
  "refrence": null,
  "error": true
}
```

## Generated Tracking Token or Url

Endpoint : POST /api/trackings

Headers :

- Authorization : access_token

Request Body :

```json
{
  "device_name": "hp sidia"
}
```

Responses Body Success :

```json
{
  "status": 200,
  "message": "successfully genereted url",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cmFja2luZ19pZCI6Ijc1MDE4NjY1OTk3YzczNmIzZi0zN2EwLTRhMDYtYTRlYy1jMTJjZmZiYTU3ZTgiLCJpYXQiOjE3MTc5OTMwMzh9.TSDO3FXu0PbMtfN7LyLAWe12tAPcQviqQ198WGGasdaPco8"
  },
  "refrence": null,
  "error": false
}
```

Responses Body Error :

```json
{
  "status": 400,
  "message": "device name already exist",
  "data": null,
  "refrence": null,
  "error": true
}
```

## Get Tracking Token or Url

Endpoint : GET /api/trackings

Headers :

- Authorization : access_token

Responses Body Success :

```json
{
  "status": 200,
  "message": "successfully responses",
  "data": [
    {
      "id": "75018665997c736b3f-37a0-4a06-a4ec-c12cffba57e8",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cmFja2luZ19pZCI6Ijc1MDE4NjY1OTk3YzczNmIzZi0zN2EwLTRhMDYtYTRlYy1jMTJjZmZiYTU3ZTgiLCJpYXQiOjE3MTc5OTMwMzh9.TSDO3FXu0PbMtfN7LyLAWe12tAPcQviqQ198WGGasdaPco8",
      "date": "2024-06-10T04:17:18.000Z",
      "status": false,
      "device_name": "hp sidia"
    }
  ],
  "refrence": null,
  "error": false
}
```

## Post Point Information

Endpoint : POST /api/tracker

Headers :

- Authorization : tracking_token

Request Body Request :

```json
{
  "lat": 1,
  "long": 1,
  "accuracy": 1
}
```

Responses Body Success :

```json
{
  "status": 200,
  "message": "success",
  "data": null,
  "refrence": null,
  "error": false
}
```

Responses Body Error :

```json
{
  "status": 400,
  "message": "please provided valid tracking_token!",
  "data": null,
  "refrence": null,
  "error": true
}
```

## Tracking Token Verify

Endpoint : GET /api/tracker/verify-token

Headers :

- Authorization : tracking_token

Responses Body Success :

```json
{
  "status": 200,
  "message": "tracking_token verified",
  "data": null,
  "refrence": null,
  "error": false
}
```

Responses Body Error :

```json
{
  "status": 400,
  "message": "please provided valid tracking_token",
  "data": null,
  "refrence": null,
  "error": true
}
```

## Get Tracking History By Tracking ID

Endpoint : GET /api/trackings/history?tracking_id=<'tracking id'>

Headers :

- Authorization : access_token

Responses Body Success :

```json
{
  "status": 200,
  "message": "successfully responses",
  "data": [
    {
      "id": "2975042224119edd2cb1-e9f9-4910-a063-52b3e431e77a",
      "tracking_id": "75018665997c736b3f-37a0-4a06-a4ec-c12cffba57e8",
      "lat": 1,
      "long": 1,
      "accuracy": 1,
      "date": "2024-06-10T04:38:19.000Z"
    },
    {
      "id": "4953205441490030ab21-af8d-4886-97ff-d605d62e15f5",
      "tracking_id": "75018665997c736b3f-37a0-4a06-a4ec-c12cffba57e8",
      "lat": 1,
      "long": 1,
      "accuracy": 1,
      "date": "2024-06-10T04:38:25.000Z"
    },
    {
      "id": "49785893769939e9e9d-5335-42bc-8782-0d3c964d8530",
      "tracking_id": "75018665997c736b3f-37a0-4a06-a4ec-c12cffba57e8",
      "lat": 1,
      "long": 1,
      "accuracy": 1,
      "date": "2024-06-10T04:38:31.000Z"
    },
    {
      "id": "7929374922864c49da6a-7115-4be9-a6f9-6922125df541",
      "tracking_id": "75018665997c736b3f-37a0-4a06-a4ec-c12cffba57e8",
      "lat": 1,
      "long": 1,
      "accuracy": 1,
      "date": "2024-06-10T04:38:36.000Z"
    },
    {
      "id": "799613136309a5c7302a-bb35-4d9f-a9ad-75e33e07be73",
      "tracking_id": "75018665997c736b3f-37a0-4a06-a4ec-c12cffba57e8",
      "lat": 1,
      "long": 1,
      "accuracy": 1,
      "date": "2024-06-10T04:39:16.000Z"
    },
    {
      "id": "812451460555f4a20f6a-d5c3-47ab-b02d-8e56c4384fb1",
      "tracking_id": "75018665997c736b3f-37a0-4a06-a4ec-c12cffba57e8",
      "lat": 1,
      "long": 1,
      "accuracy": 1,
      "date": "2024-06-10T04:38:28.000Z"
    }
  ],
  "refrence": null,
  "error": false
}
```

Responses Body Error :

```json
{
  "status": 400,
  "message": "tracking id does not exits",
  "data": null,
  "refrence": null,
  "error": true
}
```

## Get Tracking History Tracking By ID

Endpoint : GET /api/trackings/history?id=<'id'>

Headers:

- Authorization : access_token

Responses Body Success :

```json
{
  "status": 200,
  "message": "successfully responses",
  "data": {
    "id": "2975042224119edd2cb1-e9f9-4910-a063-52b3e431e77a",
    "tracking_id": "75018665997c736b3f-37a0-4a06-a4ec-c12cffba57e8",
    "lat": 1,
    "long": 1,
    "accuracy": 1,
    "date": "2024-06-10T04:38:19.000Z"
  },
  "refrence": null,
  "error": false
}
```

Responses Body Error :

```json
{
  "status": 400,
  "message": "history id does not exist",
  "data": null,
  "refrence": null,
  "error": true
}
```

## Get Live Tracking

Endpoint : GET /api/trackings?live=<'tracking_id'>

Headers :

- Authorization : access_token

Responses Body Succcess :

```json
{
  "status": 200,
  "message": "successfully responses",
  "data": {
    "tracking_id": "75018665997c736b3f-37a0-4a06-a4ec-c12cffba57e8",
    "lat": 1,
    "long": 1,
    "accuracy": 1,
    "date": "2024-06-10T04:39:16.000Z"
  },
  "refrence": null,
  "error": false
}
```

Responses Body Error :

```json
{
  "status": 400,
  "message": "tracking id does not exist",
  "data": null,
  "refrence": null,
  "error": true
}
```

## Delete Tracking

Endpoint : DELETE /api/trackings

Headers :

- Authorization : access_token

Request Body :

```json
{
  "tracking_id": "75018665997c736b3f-37a0-4a06-a4ec-c12cffba57e8"
}
```

Responses Body Success :

```json
{
  "status": 200,
  "message": "successfully deleted",
  "data": {
    "id": "75018665997c736b3f-37a0-4a06-a4ec-c12cffba57e8"
  },
  "refrence": null,
  "error": false
}
```

Responses Body Error :

```json
{
  "status": 400,
  "message": "tracking id does not exist",
  "data": null,
  "refrence": null,
  "error": true
}
```


# User Management API

## video 
 https://youtu.be/rOzHRlIBqgI

This Node.js application provides a set of API endpoints for managing user details, including fetching user details, updating user details, uploading and retrieving user images, inserting new users, and deleting users.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [GET /user/details](#get-userdetails)
  - [PUT /user/update](#put-userupdate)
  - [GET /user/image](#get-userimage)
  - [POST /user/insert](#post-userinsert)
  - [DELETE /user/delete](#delete-userdelete)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following dependencies installed:

- Node.js
- npm or yarn
- MongoDB (or another database of your choice)

### Installation

1. Clone the repository to your local machine:

   

2. Navigate to the project folder:

3. Install the required dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up your MongoDB database and configure the database connection in the `dbConnect.js` file.

5. Configure Cloudinary (used for image uploads) by providing your Cloudinary credentials in the `.env` file.

6. env file setup

format like :

PORT=4000
ACCESS_TOKEN_PRIVATE_KEY=e88f27478505704c9ea33bf34f8f55de30e875b015a1b92925862b7af6f5a6513069a2a48c144d3983502fed987c5ad622cae3f1b8e89e201b79361b9f156b55
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

7. Start the server:

nodemon or node index.js

Your API server should now be running at `http://localhost:4000`.

## API Endpoints

### GET /data/details

Fetches details of a specific user given the `user_id` as a query parameter.

#### Request:

- Method: GET
- Endpoint: `/user/details`
- Query Parameters:
  - `user_id` (UUID): The unique identifier of the user.

#### Response:

- Status Code: 200 OK
- Body: User details in JSON format.

### PUT /data/update

Updates the details of a specific user given the new details in the request body.

#### Request:

- Method: PUT
- Endpoint: `/data/update`
- Request Body: User details to be updated.

#### Response:

- Status Code: 200 OK
- Body: Success message and updated user details in JSON format.

### GET /data/image

Retrieves the image of a specific user given the `user_id` as a query parameter.

#### Request:

- Method: GET
- Endpoint: `/data/image`
- Query Parameters:
  - `user_id` (UUID): The unique identifier of the user.

#### Response:

- Status Code: 200 OK
- Body: User image in url format.

### POST /data/insert

Inserts a new user into the database.

#### Request:

- Method: POST
- Endpoint: `/data/insert`
- Request Body: User details to be inserted.

#### Response:

- Status Code: 200 OK
- Body: Success message and inserted user details in JSON format.

### DELETE /data/delete

Deletes a user from the database given the `user_id` as a query parameter.

#### Request:

- Method: DELETE
- Endpoint: `/user/delete`
- Query Parameters:
  - `user_id` (UUID): The unique identifier of the user.

#### Response:

- Status Code: 200 OK
- Body: Success message.

## Usage

You can use a tool like Postman to interact with the API endpoints. Make sure to include the required data and follow the API documentation for each endpoint.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.


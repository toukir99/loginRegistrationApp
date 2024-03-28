# Registration and Authentication API

This repository contains Node.js APIs for user registration, authentication, profile management, and account deletion. The APIs are available in two versions: one built with MySQL and Sequelize, and the other with MongoDB and Mongoose. Both versions handle encryption for sensitive information such as passwords.

## Features

1. **Registration API**: Allows users to create an account with the following information:
   - First Name
   - Last Name
   - Email
   - Password (encrypted)
   - National ID (NID)
   - Profile Photo
   - Age
   - Marital Status
   - Auth Token

2. **Login API**: Enables users to log in using their email and password. Upon successful authentication, a random UUID is generated and stored for future use.

3. **Update API**: Allows users to update their profile information. Users can only update their own profiles, identified by `user_id`.

4. **Delete API**: Allows users to delete their account. Similar to the update API, users can only delete their own accounts, identified by `user_id`.

5. **View Profile API**: Enables users to view their profile information. Password information is excluded from the response for security purposes.

## Implementation Details

- **MySQL Version**: Utilizes MySQL database for data storage and Sequelize ORM for database operations.
- **MongoDB Version**: Utilizes MongoDB database for data storage and Mongoose ODM for database operations.
- **Encryption**: Passwords are encrypted using a Crypto library before being stored in the database.
- **Photo Upload**: Profile photos are uploaded using Multer library and stored in local storage or GridFS (for MongoDB). The file path is saved in the database.
- **ACID Properties**: Database transactions ensure that if an insertion or update fails in one table (MySQL) or collection (MongoDB), it won't affect the other, maintaining ACID properties.
- **Generic Responses**: Both success and failure responses are handled with appropriate HTTP status codes (200 for success).
- **User Authentication**: Upon successful login, a random UUID is generated and stored for future login sessions.
- **Security**: User authentication ensures that users can only update or delete their own accounts, enhancing security.
- **User Profile Privacy**: Passwords are excluded from profile responses to prevent sensitive information exposure.

## Technologies Used

### MySQL Version
- Node.js
- MySQL
- Sequelize
- Multer (for file upload)
- Crypto (for password encryption)
- Express.js (for API routing)

### MongoDB Version
- Node.js
- MongoDB
- Mongoose
- Multer (for file upload)
- Crypto (for password encryption)
- Express.js (for API routing)

## API Routes

1. **Registration API**: `POST auth/register`
2. **Login API**: `POST auth/login`
3. **Update API**: `PUT /profile/:user_id`
4. **Delete API**: `DELETE /profile/:user_id`
5. **View Profile API**: `GET /profile`

## Installation and Usage

1. Clone this repository.
2. For MySQL version:
   - Navigate to the `mysql` directory.
   - Install dependencies using `npm install`.
   - Configure your MySQL database connection in the `config.js` file.
   - Run the server using `npm start`.
3. For MongoDB version:
   - Navigate to the `mongodb` directory.
   - Install dependencies using `npm install`.
   - Run MongoDB locally or provide connection URI in `config.js`.
   - Run the server using `npm start`.


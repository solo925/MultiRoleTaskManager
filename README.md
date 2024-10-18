# TEACH2GIVE Group 7 Project

## About the Project

This repository contains the source code for **TEACH2GIVE Group 7**, a collaborative project that implements CRUD operations within a web-based application. The project is designed to help users create, view, and delete posts, with different permission levels for users and administrators. The goal is to allow users to contribute and interact with posts while ensuring proper access control through role-based permissions.

## Project Features

- **User Authentication**: Secure login and registration system.
- **Role-Based Access Control**:
  - **Admin**: Full access to create, view, update, and delete posts.
  - **User**: Can create and view posts but cannot delete posts created by others.
- **Post Management**
  - Users can create and view posts.
  - Admins can manage (create, update, delete) any posts.
- **Responsive UI**: A mobile-friendly interface designed for a seamless experience across all devices.

## Technologies Used

### Frontend

- **HTML5**, **CSS3**, **JavaScript** for the structure and styling of the web pages.
- **React.js** (or another framework you may have used) to build the user interface.

### Backend

- **Node.js** and **Express.js** for creating server-side logic.
- **Postgressql** for storing data in a NoSQL database.
<!-- - **Mongoose** for managing database operations. -->
- **JWT** (JSON Web Tokens) for user authentication and session management.

## Project Structure

```plaintext
├── client              # Frontend code
│   ├── public          # Static files
│   ├── src             # React components
│   └── package.json    # Dependencies for frontend
├── server              # Backend code
│   ├── controllers     # Logic for handling requests
│   ├── models          # Database schemas
│   ├── routes          # API endpoints
│   ├── server.js       # Main server file
│   └── package.json    # Dependencies for backend
├── .env                # Environment variables
├── README.md           # Project documentation
└── package.json        # Project dependencies

```

## Collaboration

We have 5 branches.Each team member works on a specific branch, following the group project guidelines.

### Branches Overview

main: The default branch containing the main application code.
branch_Stephen: Contains code developed by Stephen.
branch_Solomon: Contains contributions from Solomon.
branch_Grace: Contains contributions from Grace.
branch_Ocharo: Contains contributions from Ocharo.

### Branch Strategy

All development takes place on individual branches.
Once features are tested and complete, they are merged into the main branch via pull requests.

## Getting Started

A quick guide on how to get things running

### Prerequisites

Before you begin, ensure you have the following tools installed on your local machine:

1. Node.js (v14+)
2. MongoDB for the database

### Installation

Clone the repository:

bash
Copy code
`git clone https://github.com/Stephen100Mwangi/TEACH2GIVE-Group7.git`
`cd TEACH2GIVE-Group7`

Install dependencies:

#### Backend dependencies

bash
Copy code
`cd server`
`npm install`

#### Frontend dependencies

bash
Copy code
`cd client`
`npm install`

#### Set up environment variables

Create a .env file in the root directory and configure the following:

env
Copy code
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Run the application

1. Start the backend server

`cd server`
`npm start`
2. Start the frontend server

`cd client`
`npm start`
The app should be accessible at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

#### Usage

1. Register and Login:
Navigate to the registration page to create a new account.
Use your credentials to log in.
2. Creating Posts:
After logging in, click on the "Create Post" button.
Enter the post details and submit.
3. Viewing Posts:
All users can view posts created by other users.
4. Deleting Posts (Admin Only):
Admin users can delete any posts by clicking the delete button next to the post.
Regular users cannot delete posts created by others.

## Contributing

We welcome contributions from all team members and external contributors! Here’s how you can contribute:

1. Fork the repository

2. Create a new branch:

On the bash - Inside integrated terminal
`git checkout -b feature/YourFeature`
3. Commit your changes:

`git commit -m "Add your message"`
4. Push to the branch

`git push origin feature/YourFeature`
5. Create a Pull Request

`Submit a pull request to the main branch for review.`

## Issues

If you encounter any issues or have suggestions for improvement, feel free to submit an issue via the Issues tab.

## License

This project is licensed under the [text](https://opensource.org/license/mit) MIT License - see the LICENSE file for details.

## Acknowledgements

Special thanks to all contributors from Group 7:
Stephen Mwangi
Solomon Onyango
Grace Mbugua
Ocharo Michael

## Task Management

![alt text](my-profit-tutor-v30bSAWzp4I-unsplash.jpg)

## Sample Tests
<!-- To be populated -->

# Users Dashboard Web Application

This is a web application that provides a user interface for register, logging in, viewing users from a database, searching,  deleting and updating user information. The application is built using Next.js, Node.js, MongoDB, TypeScript, Tailwind CSS, React, React Hook Form, Yup, NextAuth.js, Zustand, and Mongoose. It uses NextAuth.js for user authentication and authorization, Zustand for state management, and Tailwind CSS for styling.

The application is deployed on Vercel and can be accessed at [https://users-dashboard-next.netlify.app/login](https://users-dashboard-next.netlify.app/login).

![Overview](/public/images/users.png)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yusufie/users-dashboard.git`
2. Navigate to the project directory: `cd users-dashboard`
3. Install the project dependencies: `npm install`
4. Create a `.env.local` file in the root directory of the project.
5. Create a MongoDB database and add the database URI to the `.env.local` file.
6. Add the following environment variables to the `.env.local` file:
```
MONGODB_URI=<your mongodb uri>
```
7. Start the server: `npm run dev`
8. The application should now be running on `http://localhost:3000`.
9. Open your web browser and go to `http://localhost:3000` to view the application.

## Usage

Once the application is running, you can use it as follows:

1. Open the browser and go to the login page.
2. If you have not registered, click the "Sign Up" link to register.
3. On the registration page, enter your name, email, and password.
4. Click the "Sign Up" button to register.
5. After successful registration, you will be redirected to the login page.
6. Enter your email and password to log in.
7. After successful login, you will be redirected to the user list page.
8. On the user list page, you can see a list of registered users.
9. To search for a user, enter the user's name in the search box.
10. To delete a user, click the "Delete" button next to the user's information.
11. To view and update user details, click the link provided for each user.
12. On the user update page, you can update the user's basic informations, name, email, phone, role, and account status.
13. Click the "Update User" button to update the user's information.

## Technologies

The project is built using the following technologies:

- Next.js
- Node.js
- MongoDB
- TypeScript
- React
- React Hook Form
- Yup
- NextAuth.js
- Zustand
- Mongoose
- Tailwind CSS


## Features

The application includes the following features:

- User authentication and authorization using NextAuth.js
- Login functionality with email and password
- User list page to view all registered users
- Search functionality to search for users by name
- Ability to delete users
- User update page to view and update user information
- Update user's basic information, name, email, phone, role, and account status.

## Contributing

Contributions to this project are welcome. If you find any issues or want to add new features, please submit a pull request or open an issue.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

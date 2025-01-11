# KoinX Internship Assignment Backend Project

This repository contains the backend implementation for the KoinX internship assignment. The project is built using **Node.js** and **Express.js** to handle server-side logic efficiently.

## Features

- **RESTful API**: Exposes a set of APIs to handle various functionalities required for the assignment.
- **Scalable Architecture**: Organized codebase following MVC (Model-View-Controller) principles for better scalability and maintainability.
- **Database Integration**: Integrated with MongoDB.
- 

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the required variables such as:
     ```env
     MONGODB_CONNECTION_STRING=<your-database-url>
     PORT=3000
     COINGECKO_API_URL=
     COINGECKO_API_KEY=
     ```

4. Start the server:

   ```bash
   npm start
   ```

## Project Structure

```
src  
├── app.ts                  # Main application setup  
├── controllers/  
│   └── coin.controller.ts  # Handles incoming HTTP requests and responses  
├── models/  
│   └── coin.model.ts       # Defines the data structure and validation logic  
├── repositories/  
│   └── coin.repository.ts  # Interfaces with the database or data sources  
├── routes/  
│   └── coin.routes.ts      # Defines API routes and their mappings to controllers  
├── server.ts               # Server setup and startup script  
└── services/  
    └── coin.service.ts     # Contains business logic for the application  
```


## Dependencies

- **Node.js**
- **Express.js**
- **MongoDB**
- **Axios**
- **Coingecko API**

## Contribution Guidelines

Feel free to fork the repository and submit pull requests. All contributions are welcome and appreciated!

## Contact

For any queries, please contact:

**Yash Jaiswal**
- [LinkedIn](https://www.linkedin.com/in/yash-jaiswal-aaa8112ab/)
- [GitHub](https://github.com/Yash-jaiswal2509)
- [Portfolio](https://yash-jaiswal-portfolio-0825.vercel.app/)
- Email: yashjaiswal2509@gmail.com

---

This project is developed as part of an internship assignment for KoinX.


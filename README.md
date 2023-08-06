# Todo List

This project is developed using PHP 8.2, Laravel, Composer, npm, and React, on a Windows environment. It consists of a client-server architecture with a React frontend and a Laravel backend. You can run the project locally or use Docker for containerization.

## Local Development Setup

### Prerequisites

- PHP 8.2
- Composer
- Node.js and npm
- Laravel

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd path/to/client
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

   The client will be available at [http://localhost:3000](http://localhost:3000).

### Backend Setup

1. Navigate to the server directory:

   ```bash
   cd path/to/server
   ```

2. Install the required PHP dependencies:

   ```bash
   composer install
   ```

3. Set up the Laravel environment and run migrations:

   ```bash
   php artisan key:generate
   php artisan migrate
   ```

4. Start the Laravel development server:

   ```bash
   php artisan serve
   ```

   The server will be available at [http://localhost:8000](http://localhost:8000).

## Docker Development Setup

If you prefer to use Docker, you can build and run the entire stack using Docker Compose.

1. Build the Docker images:

   ```bash
   docker-compose build
   ```

2. Start the Docker containers:

   ```bash
   docker-compose up
   ```

   This will start the client, server, and database containers. You can access the client at [http://localhost:3000](http://localhost:3000) and the server at [http://localhost:8000](http://localhost:8000) (or the respective ports you have configured).

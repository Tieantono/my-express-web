# Express.js Web App

## About
A simple Express.js application with MySQL database.

## Requirements
* Node.js (recommended version: 20)
* MySQL (recommended version: 8)
* Code Editor (i.e. VS Code and its supported extensions like TypeScript)

## Getting Started
### Development
To start develop the project:
1. Open a terminal.
2. Run `npm ci`.
3. Run `npm run dev`.

> This project is using `TypeScript` and `nodemon`, so all your file changes will be automatically compiled into `dist` folder.

### Build
To build the application for server environment (staging, production, etc.):
1. Open a terminal.
2. Run `npm run build`.
3. Copy the `package-lock.json` into the server.
4. Run `npm ci` on the server.
5. Run `node index.js` on the server.

> You can use the above steps for virtual machine deployment setups. Other deployment method on different platform might be different. Please read the documentation provided by the host provider, i.e. cloud provider.

## Project Structure
* `src`: The root of source codes directory. All codes are written in TypeScript.
    * `functions`: Store the reusable functions.
    * `interfaces`: Store the object definition in `interface` or `class`.
    * `middlewares`: Store the custom Express.js middleware implementations.
    * `routes`: Store the custom Express.js routes.
    * `index.js`: The entry point of the Express.js application.
    * `MySqlPool.ts`: Store reusable MySQL connection pool function.
* `.env`: Store the application's settings. For local development, create a new `.env.local` on each developer machine independently.
* `nodemon.json`: Store the nodemon configurations.
* `tsconfig.json`: Store the TypeScript configurations.

## Configurations
* `PORT`: The Express.js application's port number.
* `MYSQL_HOST`: The MySQL hostname or IP address.
* `MYSQL_PORT`: The MySQL port number.
* `MYSQL_USER`: The MySQL username.
* `MYSQL_PASSWORD`: The MySQL password.
* `MYSQL_DB`: The MySQL database name.
* `JWT_SECRET`: The JWT secret setting for token creation.
* `JWT_ISSUER`: The JWT issuer setting.
* `JWT_AUDIENCE`: The JWT audience setting.
* `JWT_EXPIRATION_TIME`: The JWT expiration time setting. You can denote the time unit by using `s` for second, `m` for minute, and `h` for hour, i.e. `1h` means the token expirity is 1 hour.

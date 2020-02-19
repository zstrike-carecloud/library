# Welcome to my Library Server!

This server provides the CRUD operations for the library-ui project repo

## GETTING STARTED

1. You will need MySQL installed and Running on your machine as well as NPM

2. Run `npm ci` or `npm i` in the project directory

3. Set the following variables in your terminal profile or preceding inline to the `npm start` command

```
BOOKS_CONNECTION_HOST  
BOOKS_CONNECTION_USER  
BOOKS_CONNECTION_PASSWORD  
BOOKS_CONNECTION_DB  
```

For reference, mine are set as:
```
export BOOKS_PORT='3001'
export BOOKS_CONNECTION_HOST='localhost'
export BOOKS_CONNECTION_USER='root'
export BOOKS_CONNECTION_PASSWORD='password'
export BOOKS_CONNECTION_DB='library' 
```

(Don't forget to run source on whichever terminal profile you are using or simply close and reopen your terminal after saving)

4. Next, you'll need to create the `library` database connection (or whatever you set in `BOOKS_CONNECT_DB`)

**NOTE**: I used [MySQL Workbench](https://dev.mysql.com/downloads/mysql/) to interface with my database.

**NOTE**: when using mysql locally, I ran into auth issues which were solved by running:  
```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';```

## You're almost there!

5. Run `npm start` and the server should start!


TODO List:

Set up seed data
Finish validators
Add descriptive error messages to validators
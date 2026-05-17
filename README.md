This is how to run it

firs download the dependency
npm install


docker compose up -d 

Here are the DB development settings:
"development": {
    "username": "unistay",
    "password": "unisecret",
    "database": "unistayDB",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "timestamps": false
    }

so mysql -unisstay -p unisecret


then 
npm run dev


And here is the swagger
http://localhost:3000/api-docs/

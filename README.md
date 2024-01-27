# Grocerry Manage and Booking



npm install 
npm start 

pre-requisite:postgress

Run the migrations with npx sequelize-cli db:migrate

docker image: prashantv1/grocery-booking-api
postregss image :docker run -e POSTGRES_PASSWORD=password   -e POSTGRES_USER=postgres   -e POSTGRES_DB=grocery_db  -p 5432:5432  postgres:latest


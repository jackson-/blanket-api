# Blanket API challenge

## Steps to install and run
You can either foolow these steps to build the project yourself or you can use the premade API I've built at `https://blanket-api.herokuapp.com/`.

*Step 1*  
Clone and `cd` into the project directory
`git clone https://github.com/jackson-/blanket-api && cd blanket-api`

*Step 2*  
Install all dependencies
`npm i` or `yarn`

*Step 3*  
Create a .env file for the database and app configuration. Here's an example below.

```
DB_NAME=blanket
DB_USER=postgres
DB_PWD=<YOUR PASSWORD>
PORT=5000
NODE_ENV=DEV
LOGGING=0
GEOCODE_KEY=<YOUR API CODE HERE>
```  

Also, make sure that  your postgres database is running

*Step 4*  
Go into your postgres command line and install the eathdistance extension
for the blanket-api database.
`CREATE EXTENSION cubed; CREATE EXTENSION earthdistance;`

*Step 5*  
Run the app and start making requests!
`npm run dev` or `yarn dev`

## Making requests
Here's all the endpoints available in the app. Also "base-url" will refer to "localhost:5000" or "https://blanket-api.herokuapp.com" depending on which API you're using.

### Health check
To give the API a quick health check do a GET request to `<base-url>/api/health-check`. You should receive a 200 with a message saying "OK" or else something is wrong.

### Find all restaurants
If you do a GET request to `<base-url>/api/restaurants` you should see a listing of all the restaurants.

### Find a restaurant by ID and view its ratings
If you do a GET request to `<base-url>/api/restaurants/view/:id` you should see a restaurant object with a property called ratings

### Search restaurants by location
You can search by address or latitude and longitude coordinates for restaurants in your area. Do a request to `<base-url>/api/restaurants/search`. This endpoint will parse the query params in the URL for an `address` property and convert that into coordinates or take the `lat` and `lng` properties you already provided. Please
do not put any commas in your `address`. The `distance` property determines the radius (miles) to search within.

### Create a restaurant
To create a restaurant do a POST request to
`<base-url>/api/restaurants/`. This endpoint is expecting the body object to contain four properties. `name`, `description`, `lat`, and `lng`.

### Rate a restaurant
To rate a restaurant do a POST request to
`<base-url>/api/restaurants/rate`. This endpoint is expecting the body object to contain four properties. `restaurantId`, `score`, and `review`. `score` should be a decimal from 0-10. `restaurantId` can be found as the `id` property on the 
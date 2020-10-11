# Backend Microservice To Support And Simplify Applications

A simple stateless microservice in Nodejs, with three major functionalities -

 * Authentication
 * JSON patching
 * Image Thumbnail Generation


## Setup

The API requires:
 * [Node.js](https://nodejs.org/en/download/)
 * [Express](https://expressjs.com/)
 * [Mocha](https://mochajs.org/) - For testing

To get up and running: 

**1.** Clone the repo.
```
git clone https://github.com/oyugirachel/NodejsStatelessMicroservice
.git
```

**2.**  ```cd``` into repo. Use the same directory name(below) if you do not change it.
```
cd NodejsStatelessMicroservice
```

**3.**  Setup the application by installing its dependencies with
```
npm install
```

**4.**  The app gets up and running on port 3000 with ```npm start```.

**5.**  **Important** Create a ```.env``` file and set ```jwtSecret``` to any secret phrase you want.
 

## Testing the API routes.

Since this is mostly an API with post and patch requests, testing will be done with [Postman](https://www.getpostman.com/)

### Authentication
This is a mock authentication so you can pass in any username or password to login.
 1. Set the request to **POST** and the url to _/api/users/login_. 
 2. In the **Body** for the Postman request, select **x-www-form-urlencoded**.
 3. You will be setting 2 keys (for username and password). Set the ```username``` key to any name. Set ```password``` to any password (minimum of 6 characters).
 4. Hit ```Send```. You will get a result in this format:
 ```
 {
    "user": "moi",
    "authorized": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaSIsImlhdCI6MTUzMjAwNDkwMSwiZXhwIjoxNTMyMDI2NTAxfQ.sonItbpZ_yKsRLDXNfDqwN6yN5VbdMVDhgKAMxDmPFY"
}
 ```


 ### JSON patching
Apply json patch to a json object, and return the resulting json object.
 1. Set the request to **PATCH** and the url to _/api/patch-object_.
 2. Set the key ```jsonObject``` to an object you would like to patch. Set the key ```jsonPatchObject``` to the object you want to use to patch the ```jsonObject```.
 ```
 Examples:
 jsonObject
 { "user": { "firstName": "Albert", "lastName": "Einstein" } }

 jsonPatchObject
 [{"op": "replace", "path": "/user/firstName", "value": "Leonardo"}, {"op": "replace", "path": "/user/lastName", "value": "da Vinci"}]
 ```
 3. Since this is a secure route, for testing, you will have to set the token in the ```Header```. Set key as ```token``` and value as token you received from **Authentication**.
 4. Expected result should be:
 ```
 { "user": { "firstName": "Leonardo", "lastName": "da Vinci" } }
 ```


 ### Image Thumbnail Generation
This request contains a public image URL. It downloads the image, resizes to 50x50 pixels, and returns the resulting thumbnail.
 1. Set the request to **POST** and the url to _/api/create-thumbnail_.
 2. Set the key ```imageUrl``` to a public image url.
 3. Since this is a secure route, for testing, you will have to set the token in the ```Header```. Set key as ```token``` and value as token you received from **Authentication**.
 4. Image will be downloaded and converted to a thumbnail of size 50x50 pixels with a sample result as below:
 ```
 {
    "converted": true,
    "user": "moi",
    "success": "Image has been resized",
    "thumbnail": "./public/images/resized/"
}
```


## Unit Testing

Unit testing is done using Mocha (https://mochajs.org).

Run ```npm test``` from the application's root directory.

I used nyc to add coverage to mocha tests by following the Quick Start at (https://istanbul.js.org/)

Adding coverage to your mocha tests could not be easier:

$ npm install --save-dev nyc

Now, simply place the command nyc in front of your existing test command in package.json, for example:

{
  "scripts": {
    "test": "nyc mocha"
  }
}

## Logging

All logs are saved in ```hackerbay.log``` in the application's root.


## Built With

 * [Node.js](https://nodejs.org)
 * [Express](https://expressjs.com/)
 * [Mocha](https://mochajs.org/) - For testing


## Results

 1. Test: All tests specified in test.js with [Mocha](https://mochajs.org/) are running well (use: npm test)
 
 2. Istanbul_ coverage is working using nyc at https://istanbul.js.org/ to generate code test coverage reports.

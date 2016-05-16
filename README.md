# Module_5

Week 5
<!-- 
1. Fork this repository.

2. Initialize your project using npm to create a **package.json** file.

3. Extend the **trucks.js** file by adding to the methods you already created with these new ones:

   `addTruck` This method takes one parameter, a truck object, and adds it to the foodTrucks array. Sample usage:
   
   `trucks.addTruck(newTruck);`
   
   `removeTruck` This method takes one parameter, an name associated with a food truck. It should remove the given truck object from the foodTrucks array. Sample usage:
   
   `trucks.removeTruck(name);` -->
   
4. In your server's **index.js**, add to the same routes your created in Module_4 by adding the following routes:

   `/trucks` This will be a **POST** route (do not replace the GET version of this route) that uses the trucks module to add a truck to the foodTrucks list.
   
   `/trucks/:name` This will be a **DELETE** route (do not replace your GET version of this route) that uses the trucks module to remove a truck from the foodTrucks list.

5. Refactor all your routes into a separate, Express router module. This code will go into **truckRoutes.js** in the routes folder. This module should be required into your server file and used accordingly. Sample usage:

   `var truckRouter = require('./routes/trucksRoutes');`
   
6. Your project must include using the /public files from the origina repo and the static files (e.g. **index.html**) inside it so that visiting the `/` , or root path should display a form that calls and works with the routes you implement for your server.

7. Include your **.eslintrc** file as part of your repo. Your code should be lint-free based on your lint configuration.

8. Use a **.gitignore** file in your project locally, adding 'node_modules' to the file to prevent the inclusion of node_modules in your repo.


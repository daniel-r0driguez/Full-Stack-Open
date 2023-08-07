// In this part, our focus shifts towards the backend: that is, towards implementing functionality on the server side of the stack.

// We will be building our backend on top of NodeJS, which is a JavaScript runtime based on Google's Chrome V8 JavaScript engine.

// This course material was written with version v18.13.0 of Node.js. Please make sure that your version of Node is at least as new as the version used in the material (you can check the version by running node -v in the command line).

// As mentioned in part 1, browsers don't yet support the newest features of JavaScript, and that is why the code running in the browser must be transpiled with e.g. babel. 
// The situation with JavaScript running in the backend is different. The newest version of Node supports a large majority of the latest features of JavaScript, so we can use the latest features without having to transpile our code.

// Use the (npm init) command to automatically generate a package.json file at the root of the project.
// This json file contains information about the project.

// Add a "start" entry to the "scripts" section.
// Now the application can be run using as a npm script.

// Even though the execution of the project works when it is started by calling node index.js from the command line, it's customary for npm projects to execute such tasks as npm scripts.
///////////////////////////////////////////////////
// Simple Web Server

// Made some changes to lecture-app/index.js
// In the first row, the application imports Node's built-in web server module. This is practically what we have already been doing in our browser-side code, but with a slightly different syntax
// import http from 'http'

// These days, code that runs in the browser uses ES6 modules. Modules are defined with an export and taken into use with an import.
// However, Node.js uses so-called CommonJS modules. The reason for this is that the Node ecosystem had a need for modules long before JavaScript supported them in the language specification.

// Node supports now also the use of ES6 modules, but since the support is yet not quite perfect we'll stick to CommonJS modules.

// The code uses the createServer method of the http module to create a new web server. An event handler is registered to the server that is called every time an HTTP request is made to the server's address http://localhost:3001.
//////////////////////////////////////////////////
// Express

// Implementing our server code directly with Node's built-in http web server is possible. However, it is cumbersome, especially once the application grows in size.

// Many libraries have been developed to ease server-side development with Node, by offering a more pleasing interface to work with the built-in http module.
// These libraries aim to provide a better abstraction for general use cases we usually require to build a backend server. By far the most popular library intended for this purpose is express.

// Install express and make it a dependency of the project by using the (npm install express) command.

// The source code for the dependency is installed in the node_modules directory located at the root of the project.
// In addition to express, you can find a great number of other dependencies in the directory.

// These are the dependencies of the express library and the dependencies of all of its dependencies, and so forth. These are called the transitive dependencies of our project.

// We can update the dependencies of the project with the command (npm udpate)

// Likewise, if we start working on the project on another computer, we can install all up-to-date dependencies of the project defined in package.json by running this next command in the project's root directory...
// (npm install)
/////////////////////////////////////////////////////
// Web and express

// The event handlers in an express .get() method accepts two parameters.
// The first request parameter contains all of the information of the HTTP request, and the second response parameter is used to define how the request is responded to.

// In our code, the request is answered by using the send method of the response object.
// Calling the method makes the server respond to the HTTP request by sending a response containing the string <h1>Hello World!</h1> that was passed to the send method.
// Since the parameter is a string, express automatically sets the value of the Content-Type header to be text/html. The status code of the response defaults to 200.

// You can start the interactive node-repl by typing in node in the command line. The repl is particularly useful for testing how commands work while you're writing application code.
/////////////////////////////////////////////////////
// nodemon

// If we make changes to the application's code we have to restart the application to see the changes.
// We restart the application by first shutting it down by typing Ctrl+C and then restarting the application.
// Compared to the convenient workflow in React where the browser automatically reloaded after changes were made, this feels slightly cumbersome.

// The solution to this problem is nodemon:
// nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

// Install nodemon by defining it as a development dependency with the command:
// (npm install --save-dev nodemon)

// This causes the package.json to have "devDependencies" section.

// By development dependencies, we are referring to tools that are needed only during the development of the application, e.g. for testing or automatically restarting the application, like nodemon.
// These development dependencies are not needed when the application is run in production mode on the production server (e.g. Fly.io or Heroku).

// To start the application with nodemon, enter this command:
// (node_modules/.bin/nodemon index.js)

// The command can get quite long to type all the time.
// Create a dedicated npm script for it.
// Under the "scripts" entry enter "dev": ("nodemon index.js")

// In the script there is no need to specify the node_modules/.bin/nodemon path to nodemon, because npm automatically knows to search for the file from that directory.

// We can now start the server in development mode with the command:
// (npm run dev)

// Unlike with the start and test scripts, we also have to add run to the command because it is a non-native script.
/////////////////////////////////////////////////////
// REST

// Let's expand our application so that it provides the same RESTful HTTP API as json-server.
// Representational State Transfer, aka REST, was introduced in 2000 in Roy Fielding's dissertation. REST is an architectural style meant for building scalable web applications.

// We are not going to dig into Fielding's definition of REST or spend time pondering about what is and isn't RESTful.
// Instead, we take a more narrow view by only concerning ourselves with how RESTful APIs are typically understood in web applications.
// The original definition of REST is not even limited to web applications.


// We mentioned in the previous part that singular things, like notes in the case of our application, are called resources in RESTful thinking.
// Every resource has an associated URL which is the resource's unique address.

// One convention for creating unique addresses is to combine the name of the resource type with the resource's unique identifier.

// If we define the resource type of note to be notes, then the address of a note resource with the identifier 10, has the unique address www.example.com/api/notes/10.

/*
    URL     |   verb    |   functionality
notes/10    |   GET     | fetches a single resource
notes       |   GET     | fetches all resources in the collection
notes       |   POST    | creates a new resource based on the request data
notes/10    |   DELETE  | removes the identified resource
notes/10    |   PUT     |   replaces the entire identified resource with the request data
notes/10    |   PATCH   | replaces a part of the identified resource with the request data
*/

// This is how we manage to roughly define what REST refers to as a uniform interface, which means a consistent way of defining interfaces that makes it possible for systems to cooperate.
////////////////////////////////////////////////////
// Fetching a single resource

// Let's expand our application so that it offers a REST interface for operating on individual notes. First, let's create a route for fetching a single resource.

// The unique address we will use for an individual note is of the form notes/10, where the number at the end refers to the note's unique id number.

// We can define parameters for routes in express by using the colon syntax.

// Now app.get('/api/notes/:id', ...) will handle all HTTP GET requests that are of the form /api/notes/SOMETHING, where SOMETHING is an arbitrary string.

// The now familiar find method of arrays is used to find the note with an id that matches the parameter. The note is then returned to the sender of the request.
// When we test our application by going to http://localhost:3001/api/notes/1 in our browser, we notice that it does not appear to work, as the browser displays an empty page. This comes as no surprise to us as software developers, and it's time to debug.

// The issue is that we were receiving a string '1' instead of a number 1, meaning no note with a '1' was found.

// Now fetching an individual resource works.
// However, there's another problem with our application.

// If we search for a note with an id that does not exist, the server responds with 200 OK

// The reason for this behavior is that the note variable is set to undefined if no matching note is found. 
// The situation needs to be handled on the server in a better way. If no note is found, the server should respond with the status code 404 not found instead of 200.

// The if-condition leverages the fact that all JavaScript objects are truthy, meaning that they evaluate to true in a comparison operation. However, undefined is falsy meaning that it will evaluate to false.

// Our application works and sends the error status code if no note is found. However, the application doesn't return anything to show to the user, like web applications normally do when we visit a page that does not exist.
// We do not need to display anything in the browser because REST APIs are interfaces that are intended for programmatic use, and the error status code is all that is needed.
////////////////////////////////////////////////////
// Deleting resources

// Next, let's implement a route for deleting resources.
// Deletion happens by making an HTTP DELETE request to the URL of the resource.

// If deleting the resource is successful, meaning that the note exists and is removed, we respond to the request with the status code 204 no content and return no data with the response.

// There's no consensus on what status code should be returned to a DELETE request if the resource does not exist. The only two options are 204 and 404. For the sake of simplicity, our application will respond with 204 in both cases.
////////////////////////////////////////////////////
// Postman

// So how do we test the delete operation? HTTP GET requests are easy to make from the browser.
// We could write some JavaScript for testing deletion, but writing test code is not always the best solution in every situation.

// Many tools exist for making the testing of backends easier. One of these is a command line program curl. However, instead of curl, we will take a look at using Postman for testing the application.

// The backend server appears to respond correctly. By making an HTTP GET request to http://localhost:3001/api/notes we see that the note with the id 2 is no longer in the list, which indicates that the deletion was successful.
////////////////////////////////////////////////////
// The Visual Studio Code REST client

// If you use Visual Studio Code, you can use the VS Code REST client plugin instead of Postman.

// Once the plugin is installed, using it is very simple. We make a directory at the root of the application named requests. We save all the REST client requests in the directory as files that end with the .rest extension.

// Using the REST plugin is very easy.
/////////////////////////////////////////////////////
// The WebStorm HTTP Client

// If you use IntelliJ WebStorm instead, you can use a similar procedure with its built-in HTTP Client. Create a new file with extension .rest and the editor will display your options to create and run your requests. 
// You can learn more about it by following this guide (https://www.jetbrains.com/help/webstorm/http-client-in-product-code-editor.html)
/////////////////////////////////////////////////////
// Receiving data

// Next, let's make it possible to add new notes to the server. 
// Adding a note happens by making an HTTP POST request to the address http://localhost:3001/api/notes, and by sending all the information for the new note in the request body in JSON format.

// To access the data easily, we need the help of the express json-parser that is taken to use with command app.use(express.json()).

// The event handler function can access the data from the body property of the request object.
// Without the json-parser, the body property would be undefined.
// The json-parser functions so that it takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.

// A potential cause for issues is an incorrectly set Content-Type header in requests. This can happen with Postman if the type of body is not defined correctly.

// The server will not be able to parse the data correctly without the correct value in the header. It won't even try to guess the format of the data since there's a massive amount of potential Content-Types.

// Important sidenote
// Sometimes when you're debugging, you may want to find out what headers have been set in the HTTP request. 
// One way of accomplishing this is through the get method of the request object, that can be used for getting the value of a single header.
// The request object also has the headers property, that contains all of the headers of a specific request.

// Problems can occur with the VS REST client if you accidentally add an empty line between the top row and the row specifying the HTTP headers. 
// In this situation, the REST client interprets this to mean that all headers are left empty, which leads to the backend server not knowing that the data it has received is in the JSON format.

// You will be able to spot this missing Content-Type header if at some point in your code you print all of the request headers with the console.log(request.headers) command.

// What exactly is happening in that line of code? notes.map(n => n.id) creates a new array that contains all the ids of the notes.
// Math.max returns the maximum value of the numbers that are passed to it.
// However, notes.map(n => n.id) is an array so it can't directly be given as a parameter to Math.max. The array can be transformed into individual numbers by using the "three dot" spread syntax (...).
////////////////////////////////////////////////////
// About HTTP request types

// The HTTP standard talks about two properties related to request types, safety and idempotency.

// In particular, the convention has been established that the GET and HEAD methods SHOULD NOT have the significance of taking an action other than retrieval. These methods ought to be considered "safe".

// Safety means that the executing request must not cause any side effects on the server. By side effects, we mean that the state of the database must not change as a result of the request, and the response must only return data that already exists on the server.

// The HTTP standard also defines the request type HEAD, which ought to be safe. In practice, HEAD should work exactly like GET but it does not return anything but the status code and response headers. The response body will not be returned when you make a HEAD request.

// Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property

// This means that if a request does not generate side effects, then the result should be the same regardless of how many times the request is sent.

// If we make an HTTP PUT request to the URL /api/notes/10 and with the request we send the data { content: "no side effects!", important: true }, the result is the same regardless of how many times the request is sent.

// Like safety for the GET request, idempotence is also just a recommendation in the HTTP standard and not something that can be guaranteed simply based on the request type. However, when our API adheres to RESTful principles, then GET, HEAD, PUT, and DELETE requests are used in such a way that they are idempotent.

// POST is the only HTTP request type that is neither safe nor idempotent. If we send 5 different HTTP POST requests to /api/notes with a body of {content: "many same", important: true}, the resulting 5 notes on the server will all have the same content.
//////////////////////////////////////////////////
// Middleware

// The express json-parser we took into use earlier is a so-called middleware.

// Middleware are functions that can be used for handling request and response objects.
// The json-parser we used earlier takes the raw data from the requests that are stored in the request object, parses it into a JavaScript object and assigns it to the request object as a new property body.

// In practice, you can use several middlewares at the same time. When you have more than one, they're executed one by one in the order that they were taken into use in express.
// Let's implement our own middleware that prints information about every request that is sent to the server.

// At the end of the function body, the next function that was passed as a parameter is called. The next function yields control to the next middleware.

// You use middleware like this:
// app.use(requestLogger)

// Middleware functions are called in the order that they're taken into use with the express server object's use method. Notice that json-parser is taken into use before the requestLogger middleware, because otherwise request.body will not be initialized when the logger is executed!

// Let's add the following middleware after our routes. This middleware will be used for catching requests made to non-existent routes. For these requests, the middleware will return an error message in the JSON format.




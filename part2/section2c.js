// Getting data from server | Section 2.c
// For a while now we have only been working on "frontend", i.e. client-side (browser) functionality.
// We will begin working on "backend", i.e. server-side functionality in the third part of this course.
// Nonetheless, we will now take a step in that direction by familiarizing ourselves with how the code executing in the browser communicates with the backend.

// Let's use a tool meant to be used during software development called JSON Server to act as our server.

// Use the command "npm install -g json-server" to install a JSON globally on the computer.
// This global installation requires admin privileges, which means that it is not possible on faculty computers or freshman laptops.

// After installing run the following command to run the json-server.
// The json-server starts running on port 3000 by default; but since projects created using create-react-app reserve port 3000, we must define an alternate port, such as port 3001, for the json-server.
// The --watch option automatically looks for any saved changes to db.json

// Enter this command: "npx json-server --port 3001 --watch db.json" in the root directory of the app. This will start the JSON server.

// Going forward, the idea will be to save the notes to the server, which in this case means saving them to the json-server.
// The React code fetches the notes from the server and renders them to the screen
// Whenever a new note is added to the application, the React code also sends it to the server to make the new note persist in "memory".
////////////////////////////////////////////////////
// The browser as a runtime environment
// Our first task is fetching the already existing notes to our React application from the address http://localhost:3001/notes.

// In the part0 example project, we already learned a way to fetch data from a server using JavaScript.
// The code in the example was fetching the data using XMLHttpRequest, otherwise known as an HTTP request made using an XHR object.
// This is a technique introduced in 1999, which every browser has supported for a good while now.

// The use of XHR is no longer recommended, and browsers already widely support the fetch method, which is based on so-called promises, instead of the event-driven model used by XHR.

// JavaScript engines, or runtime environments follow the asynchronous model.
// In principle, this requires all IO operations (with some exceptions) to be executed as non-blocking.
// This means that code execution continues immediately after calling an IO function, without waiting for it to return.

// When an asynchronous operation is completed, or, more specifically, at some point after its completion, the JavaScript engine calls the event handlers registered to the operation.

// Currently, JavaScript engines are single-threaded, which means that they cannot execute code in parallel.
// As a result, it is a requirement in practice to use a non-blocking model for executing IO operations.
// Otherwise, the browser would "freeze" during, for instance, the fetching of data from a server.

// Another consequence of this single-threaded nature of JavaScript engines is that if some code execution takes up a lot of time, the browser will get stuck for the duration of the execution.
////////////////////////////////////////////////////
// NPM
// We could use the previously mentioned promise-based function fetch to pull the data from the server.
// Fetch is a great tool. It is standardized and supported by all modern browsers (excluding IE).

// That being said, we will be using the axios library instead for communication between the browser and server.
// It functions like fetch but is somewhat more pleasant to use. Another good reason to use axios is our getting familiar with adding external libraries, so-called npm packages, to React projects.

// Nowadays, practically all JavaScript projects are defined using the node package manager, aka npm.
// The projects created using create-react-app also follow the npm format.
// A clear indicator that a project uses npm is the package.json file located at the root of the project.

// We now want to use axios. Theoretically, we could define the library directly in the package.json file, but it is better to install it from the command line.

// Run this command: "npm install axios" in the project root directory.

// Axios is now included among the other dependencies.

// In addition to adding axios to the dependencies, the npm install command also downloaded the library code.
// As with other dependencies, the code can be found in the node_modules directory located in the root.

// Let's make another addition. Install json-server as a development dependency (only used during development) by executing the command

// Use this command: "npm install json-server --save-dev" in the project root directory.
// A small addition will have to be made to the scripts part of the package.json file.
// Add this entry: ' "server": "json-server -p3001 --watch db.json" '

// Now we can run the json-server from the project root directory without having to pass parameters.
// Use this command: "npm run server"

// The server will not run if a port is already being occupied.

// We've used the command "npm install" twice, but with slight differences.

// Commands
// ================
// npm install axios
// npm install json-server --save-dev

// Axios was installed as a runtime dependency of the application because the execution of the program requires the existence of the library.
// On the other hand, json-server was installed as a development dependency (--save-dev), since the program itself doesn't require it. It is used for assistance during software development.
////////////////////////////////////////////////////
// Axios and promises
// Now we are ready to use axios. Going forward, json-server is assumed to be running on port 3001.

// To run json-server and your react app simultaneously, you may need to use two terminal windows.
// One to keep json-server running and the other to run react-app.

// Axios' method get returns a promise.
// The documentation on Mozilla's site states: A Promise is an object representing the eventual completion or failure of an asynchronous operation.

// A promise is an object that represents an asynchronous operation. A promise can have three distinct states:
// 1. The promise is pending: It means that the final value (one of the following two) is not available yet.
// 2. The promise is fulfilled: It means that the operation has been completed and the final value is available, which generally is a successful operation. This state is sometimes also called resolved.
// 3. The promise is rejected: It means that an error prevented the final value from being determined, which generally represents a failed operation.

// If, and when, we want to access the result of the operation represented by the promise, we must register an event handler to the promise. This is achieved using the method then().

// The JavaScript runtime environment calls the callback function registered by the then method providing it with a response object as a parameter. 
// The response object contains all the essential data related to the response of an HTTP GET request, which would include the returned data, status code, and headers.

// Storing the promise object in a variable is generally unnecessary, and it's instead common to chain the then method call to the axios method call, so that it follows it directly

// Let's try and request the notes from our local server and render them, initially as the App component.
// Please note that this approach has many issues, as we're rendering the entire App component only when we successfully retrieve a response.

// This method could be acceptable in some circumstances, but it's somewhat problematic. Let's instead move the fetching of the data into the App component.
// What's not immediately obvious, however, is where the command axios.get should be placed within the component.
////////////////////////////////////////////////////
// Effect-hooks
// Effect-hooks
// We have already used state hooks that were introduced along with React version 16.8.0, which provide state to React components defined as functions - the so-called functional components. 
// Version 16.8.0 also introduces effect hooks as a new feature.

// The official docs say: The Effect Hook lets you perform side effects on function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.

// As such, effect hooks are precisely the right tool to use when fetching data from a server.
// Let's remove the fetching of data from index.js. Since we're going to be retrieving the notes from the server, there is no longer a need to pass data as props to the App component.

// First, the body of the function defining the component is executed and the component is rendered for the first time.
// At this point render 0 notes is printed, meaning data hasn't been fetched from the server yet.

// The effect call-back function is executed immediately after rendering.
// The execution of the function results in effect being printed to the console, and the command axios.get initiates the fetching of data from the server as well as registers the following function as an event handler for the operation.

// When data arrives from the server, the JavaScript runtime calls the function registered as the event handler, which prints promise fulfilled to the console and stores the notes received from the server into the state using the function setNotes(response.data).

// As always, a call to a state-updating function triggers the re-rendering of the component. As a result, render 3 notes is printed to the console, and the notes fetched from the server are rendered to the screen.

// We can see that the function useEffect() takes two parameters. The first is a function (the effect itself).
// According to documentation: By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.

// So by default, the effect is always run after the component has been rendered. In our case, however, we only want to execute the effect along with the first render.

// The second parameter of useEffect() is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component.
// There are many possible use cases for an effect hook other than fetching data from the server.

// Think back to the sequence of events we just discussed. Which parts of the code are run? In what order? How often? Understanding the order of events is critical!
///////////////////////////////////////////////////
// The development runtime environment

// The JavaScript code making up our React application is run in the browser. The browser gets the JavaScript from the React dev server, which is the application that runs after running the command npm start.

// The dev-server transforms the JavaScript into a format understood by the browser. Among other things, it stitches together JavaScript from different files into one file. We'll discuss the dev-server in more detail in part 7 of the course.

// The React application running in the browser fetches the JSON formatted data from json-server running on port 3001 on the machine. The server we query the data from - json-server - gets its data from the file db.json.

// At this point in development, all the parts of the application happen to reside on the software developer's machine, otherwise known as localhost. The situation changes when the application is deployed to the internet. We will do this in part 3.

// Altering data in server | Section 2.d

// When creating notes in our application, we would naturally want to store them in some backend server.

// The json-server package claims to be a so-called REST or RESTful API in its documentation

// The json-server does not exactly match the description provided by the textbook definition of a REST API, but neither do most other APIs claiming to be RESTful.

// It's important to familiarize ourselves at this point with some of the conventions used by json-server and REST APIs in general.
// In particular, we will be taking a look at the conventional use of routes, aka URLs and HTTP request types, in REST.
/////////////////////////////////////////////////////
// Rest

// In REST terminology, we refer to individual data objects, such as the notes in our application, as resources. Every resource has a unique address associated with it - its URL.

// According to a general convention used by json-server, we would be able to locate an individual note at the resource URL notes/3, where 3 is the id of the resource.
// The notes URL, on the other hand, would point to a resource collection containing all the notes.
// Resources are fetched from the server with HTTP GET requests.
// For instance, an HTTP GET request to the URL notes/3 will return the note that has the id number 3. An HTTP GET request to the notes URL would return a list of all notes.

// Creating a new resource for storing a note is done by making an HTTP POST request to the notes URL according to the REST convention that the json-server adheres to.

// json-server requires all data to be sent in JSON format.
// What this means in practice is that the data must be a correctly formatted string and that the request must contain the Content-Type request header with the value application/json.
/////////////////////////////////////////////////////
// Sending Data to the Server

// We create a new object for the note but omit the id property since it's better to let the server generate ids for our resources!

// The object is sent to the server using the axios post method. The registered event handler logs the response that is sent back from the server to the console.
// Quite often it is useful to inspect HTTP requests in the Network tab of Chrome developer tools, which was used heavily at the beginning of part 0.

// Since the data we sent in the POST request was a JavaScript object, axios automatically knew to set the appropriate application/json value for the Content-Type header.

// The new note is not rendered to the screen yet. This is because we did not update the state of the App component when we created the new note.
// To fix it, we need to update the states of the App component.

// The new note returned by the backend server is added to the list of notes in our application's state in the customary way of using the setNotes function and then resetting the note creation form.

// Once the data returned by the server starts to have an effect on the behavior of our web applications, we are immediately faced with a whole new set of challenges arising from, for instance, the asynchronicity of communication.

// This necessitates new debugging strategies, console logging and other means of debugging become increasingly more important.
// We must also develop a sufficient understanding of the principles of both the JavaScript runtime and React components. Guessing won't be enough.
////////////////////////////////////////////////////
// Changing the Importance of Notes

// We will add a button to every note that can be used for toggling its importance.

// This line:
// const changedNote = { ...note, important: !note.important } may appear weird.

// All it does is create a new object, which copies all the properties from the note object.
// When we add properties inside the curly braces after the spread object, e.g. { ...note, important: true }, then the value of the important property of the new object will be true.

// Another thing worth mentioning is why we didn't just use this piece of code to modify the note object for the server.

// const note = notes.find(n => n.id === id)
// note.important = !note.important
// axios.put(url, note).then(response => {...}

// Well since the find() method returns a reference to the element it finds, note is a reference to an item in the notes array in the component's state.
// And as we recall we must never mutate state directly in React.

// It's also worth noting that the new object changedNote is only a so-called shallow copy, meaning that the values of the new object are the same as the values of the old object.
// If the values of the old object were objects themselves, then the copied values in the new object would reference the same objects that were in the old object.
///////////////////////////////////////////////////
// Extracting Communication with the Backend into a Separate Module

// The App component has become somewhat bloated after adding the code for communicating with the backend server.
// In the spirit of the single responsibility principle, we deem it wise to extract this communication into its own module.
///////////////////////////////////////////////////
// Cleaner Syntax for Defining Object Literals.

// In older versions of JavaScript we had to define an object like this.

/**
 * const name = 'Leevi';
 * const age = 0;
 * 
 * const person = {
 *  name: name,
 *  age: age
 * };
 */

// However, since both the property fields and the variable names in the object are the same, it's enough to simply write the following in ES6 JavaScript:

/**
 * const person = { name, age };
 */

// The result is identical for both expressions. They both create an object with a name property with the value Leevi and an age property with the value 0.
/////////////////////////////////////////////////////
// Promises and Errors

// If our application allowed users to delete notes, we could end up in a situation where a user tries to change the importance of a note that has already been deleted from the system.
// We will simulate this by making the getAll function of the note service return a "hardcoded" note that does not actually exist on the backend server.

// When we try to change the importance of the hardcoded note, we see the following error message in the console. The error says that the backend server responded to our HTTP PUT request with a status code 404 not found.

// We had previously mentioned that a promise can be in one of three different states. When an HTTP request fails, the associated promise is rejected. Our current code does not handle this rejection in any way.
// The rejection of a promise is handled by providing the then method with a second callback function, which is called in the situation where the promise is rejected.

// The more common way of adding a handler for rejected promises is to use the catch method.

/**
 * axios
 *  .get('http://example.com/probably_will_fail')
 *  .then(response => {
 *      console.log('success!')
 *  })
 *  .catch(error => {
 *      console.log('fail')
 *  })
 */

// If the request fails, the event handler registered with the catch method gets called.
// The catch method is often utilized by placing it deeper within the promise chain.
// When our application makes an HTTP request, we are in fact creating a promise chain

// The catch method can be used to define a handler function at the end of a promise chain, which is called once any promise in the chain throws an error and the promise becomes rejected.
///////////////////////////////////////////////////////////////////////
// Full stack developer's oath
// Here is the update oath.

// Full stack development is extremely hard, that is why I will use all the possible means to make it easier

// I will have my browser developer console open all the time
// I will use the network tab of the browser dev tools to ensure that frontend and backend are communicating as I expect
// I will constantly keep an eye on the state of the server to make sure that the data sent there by the frontend is saved there as I expect
// I progress with small steps
// I will write lots of console.log statements to make sure I understand how the code behaves and to help pinpoint problems
// If my code does not work, I will not write more code. Instead, I start deleting the code until it works or just return to a state when everything was still working
// When I ask for help in the course Discord or Telegram channel or elsewhere I formulate my questions properly, see here how to ask for help


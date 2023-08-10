// Deploying app to Internet

// We will now connect the frontend to our own backend.

// In the previous part, the frontend could ask for the list of notes from the json-server we had as a backend, from the address http://localhost:3001/notes. Our backend has a slightly different URL structure now, as the notes can be found at http://localhost:3001/api/notes. Let's change the attribute baseUrl in the src/services/notes.js like so.

// However, the app does not work. We get this error:
// Access to XMLHttpRequest at 'http://localhost:3001/api/notes' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
////////////////////////////////////////////////////
// Same origin policy and CORS

// The issue lies with a thing called same origin policy. A URL's origin is defined by the combination of protocol (AKA scheme), hostname, and port.

/** Example
 * http://example.com:80/index.html
 * 
 * protocol: http
 * host: example.com
 * port: 80
 */

// When you visit a website (i.e http://catwebsites.com), the browser issues a request to the server on which the website (catwebsites.com) is hosted.
// The response sent by the server is an HTML file that may contain one or more references to external assets/resources hosted either on the same server that catwebsites.com is hosted on or a different website.

// When the browser sees reference(s) to a URL in the source HTML, it issues a request. If the request is issued using the URL that the source HTML was fetched from, then the browser processes the response without any issues.

// However, if the resource is fetched using a URL that doesn't share the same origin(scheme, host, port) as the source HTML, the browser will have to check the Access-Control-Allow-origin response header.

// The same-origin policy is a security mechanism implemented by browsers in order to prevent session hijacking among other security vulnerabilities.

// In order to enable legitimate cross-origin requests (requests to URLs that don't share the same origin) W3C came up with a mechanism called CORS(Cross-Origin Resource Sharing). 

// According to Wikipedia:
// Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos. Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy.

// The problem is that, by default, the JavaScript code of an application that runs in a browser can only communicate with a server in the same origin. Because our server is in localhost port 3001, while our frontend is in localhost port 3000, they do not have the same origin.

// Keep in mind, that same-origin policy and CORS are not specific to React or Node. They are universal principles regarding the safe operation of web applications.

// We can allow requests from other origins by using Node's cors middleware.
////////////////////////////////////////////////////
// Application to the Internet

// Now that the whole stack is ready, let's move our application to the internet.

// There are an ever-growing number of services that can be used to host an app on the internet. The developer-friendly services like PaaS (i.e. Platform as a Service) take care of installing the execution environment (eg. Node.js) and could also provide various services such as databases.

// We are now introducing two services Fly.io and Render that both have a (limited) free plan. Fly.io is our "official" hosting service since it can be for sure used also on the parts 11 and 13 of the course. Render will be fine at least for the other parts of this course.

// Note that despite using the free tier only, Fly.io might require one to enter the credit card details. At the moment Render can be used without a credit card.
// Render might be a bit easier to use since it does not require any software to be installed on your machine.
////////////////////////////////////////////////////
// Frontend production build

// So far we have been running React code in development mode. In development mode the application is configured to give clear error messages, immediately render code changes to the browser, and so on.

// When the application is deployed, we must create a production build or a version of the application which is optimized for production.

// A production build of applications created with create-react-app can be created with the command npm run build.
/////////////////////////////////////////////////////
// Serving static files from the backend

// One option for deploying the frontend is to copy the production build (the build directory) to the root of the backend repository and configure the backend to show the frontend's main page (the file build/index.html) as its main page.

// Unlike when running the app in a development environment, everything is now in the same node/express-backend that runs in localhost:3001.
// When the browser goes to the page, the file index.html is rendered. That causes the browser to fetch the production version of the React app.
// Once it starts to run, it fetches the json-data from the address localhost:3001/api/notes.
/////////////////////////////////////////////////////
// The whole app to the internet


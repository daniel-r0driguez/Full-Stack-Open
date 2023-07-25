// Adding styles to React app | Section 2.e

// We will now see how to add styles to a React application.

// First, we will add CSS to our application the old-school way; in a single file without using a CSS preprocessor (although this is not entirely true as we will learn later on).

// CSS rules comprise of selectors and declarations. The selector defines which elements the rule should be applied to. The selector above is h1, which will match all of the h1 header tags in our application.

// However, using element types for defining CSS rules is slightly problematic. If our application contained other li tags, the same style rule would also be applied to them.

// If we want to apply our style specifically to notes, then it is better to use class selectors.

// In regular HTML, classes are defined as the value of the class attribute:
// <li class="note">some text...</li>

// In React we have to use the className attribute instead of the class attribute.
// <li className='note'> ... </li>
/////////////////////////////////////////////////////
// Improved error message
// We previously implemented the error message that was displayed when the user tried to toggle the importance of a deleted note with the alert method. Let's implement the error message as its own React component.

// Let's add a new piece of state called errorMessage to the App component. Let's initialize it with some error message so that we can immediately test our component.

// When the error occurs we add a descriptive error message to the errorMessage state. At the same time, we start a timer, that will set the errorMessage state to null after five seconds.
/////////////////////////////////////////////////////
// Inline styles
// React also makes it possible to write styles directly in the code as so-called inline styles.

// The idea behind defining inline styles is extremely simple. Any React component or element can be provided with a set of CSS properties as a JavaScript object through the style attribute.

// CSS rules are defined slightly differently in JavaScript than in normal CSS files. Let's say that we wanted to give some element the color green and italic font that's 16 pixels in size. In CSS, it would look like this:

/**
 * {
 *  color: green;
 *  font-style: italic;
 *  font-style: 16px;
 * }
 */

// But as a React inline-style object it would look like this:

/**
 * {
 *  color: 'green';
 *  fontStyle: 'italic';
 *  fontSize: 16;
 * }
 */

// Every CSS property is defined as a separate property of the JavaScript object.
// Numeric values for pixels can be simply defined as integers.
// One of the major differences compared to regular CSS, is that hyphenated (kebab case) CSS properties are written in camelCase.

// Inline styles come with certain limitations. For instance, so-called pseudo-classes can't be used straightforwardly.
// Inline styles and some of the other ways of adding styles to React components go completely against the grain of old conventions.

// Traditionally, it has been considered best practice to entirely separate CSS from the content (HTML) and functionality (JavaScript).

// The philosophy of React is, in fact, the polar opposite of this.
// Since the separation of CSS, HTML, and JavaScript into separate files did not seem to scale well in larger applications, React bases the division of the application along the lines of its logical functional entities.

// The structural units that make up the application's functional entities are React components.
// A React component defines the HTML for structuring the content, the JavaScript functions for determining functionality, and also the component's styling; all in one place.
// This is to create individual components that are as independent and reusable as possible.
////////////////////////////////////////////////////
// Couple of important remarks

// At the end of this part there are a few more challenging exercises.
// At this stage, you can skip the exercises if they are too much of a headache, we will come back to the same themes again later. The material is worth reading through in any case.

// Let's try setting the initial state of the notes state to null instead of an empty array.
// The app ends up breaking down.

// It does so because even though the app is supposed to get the data from the server, the useEffect (hook) is only executed after the first render, meaning that the line:

// notesToShow = notes
// notesToShow.map(note => ...)

// ...gets executed. Since notesToShow is null, .map is not a valid property to access.

// Another thing to keep in mind is the second parameter of useEffet(), which specifies how often the effect is run.
//  The principle is that the effect is always executed after the first render of the component and when the value of the second parameter changes.

// If the second parameter is an empty array [], it's content never changes and the effect is only run after the first render of the component. This is exactly what we want when we are initializing the app state from the server.

// However, there are situations where we want to perform the effect at other times, e.g. when the state of the component changes in a particular way.


// Forms | Section 2.b
// We will expand the application by allowing users to add new notes.

// Controlled component
// Since we assigned a piece of the App component's state as the value attribute of the input element, the App component now controls the behavior of the input element.

// To enable editing of the input element, we have to register an event handler that synchronizes the changes made to the input with the component's state.

// Remember that we should never mutate state directly in React!
////////////////////////////////////////////////////
// Filtering Displayed Elements
// Let's add some new functionality to our application that allows us to only view the important notes.

// In JavaScript 'val1 == val2' does not always work as expected.
// That is why when performing comparisons, it's safer to exclusively use 'val1 === val2' 
// A more complex state, debugging, React apps | Section 1.D

// Complex State

// It is forbidden in React to mutate state directly, since it can result in unexpected side effects.
// Changing state has to always be done by setting the state to a new object.
// If properties from the previous state object are not changed, they need to simply be copied, which is done by copying those properties into a new object and setting that as the new state.
/////////////////////////////////////////////////////
// Rules of Hooks
// The useState function (as well as the useEffect function introduced later on in the course) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component.
// This must be done to ensure that the hooks are always called in the same order, and if this isn't the case the application will behave erratically.

// To recap, hooks may only be called from the inside of a function body that defines a React component
////////////////////////////////////////////////////
// Event Handling Revisited

// Event handlers must always be a function or a reference to a function. The button will not work if the event handler is set to a variable of any other type.

// Any other data type will not work. Be careful of passing function calls instead of actual functions or function references.

// However, you can make an event handler a function that returns another function.
// Even though it may seem that it breaks the rules that an event handler can't be a function call, the function call is actually returning a function, which makes the event handler a function. Using this method, the event handler can accept parameters.
/////////////////////////////////////////////////////
// Do NOT Define Components Within Components

// Never ever define componentes inside of other components.
// The method provides no benefits and leads to many unpleasant problems. 
// The biggest problems are because React treats a component defined inside of another component as a new component in every render. This makes it impossible for React to optimize the component.
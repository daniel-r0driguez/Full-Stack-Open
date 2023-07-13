// Component state, event handlers | Section 1.C
// Note: This script will not work on its own. It is purely for note taking purposes.

// Component helper functions
const Hello = (props) => {
    const bornYear = () => {
        const yearNow = new Date().getFullYear()
        // Notice how the person's age does not need to be passed as a parameter to the bornYear() function.
        // This is because it can directly access all props (block scope) that are passed to the component.
        return yearNow - props.age
    }

    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
            <p>So you were probably born in {bornYear()}
            </p>
        </div>
    )
}

// In Java it is not common to see one function defined inside another function.
// However in JavaScript, this is a commonly-used technique.
////////////////////////////////////////////////////
// Destructing

// Take for example this code, in which we separate the object's data into two separate variables.
const Hello1 = (props) => {
    // Now we can simply use the name and age variables for this component.
    const name = props.name
    const age = props.age

    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

// Destructing however makes the assignment of variables even easier by extracting and gathering the values of an object's properties into separate variables.
const Hello2 = (props) => {
    // props = {
    // name: 'Arto Hellas',
    // age: 35,
    // }

    // If the object we are destructing has the values "name" and "age", then the line...
    // ..."const {name, age} = props" assigns the values 'Arto Hellas' to name and 35 to age.
    const { name, age } = props
    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

// Destructing can even be taken further...
// Now the props that are passed to the component are now directly destructed into the variables name and age.
const Hello3 = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p> Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

// In short, Destructing an object essentially means stripping down the object and gathering all it's data into separate variables that can be worked with.
/////////////////////////////////////////////////////
// Page re-rendering
// What if we wanted to create a counter where the value increased as a function of time or at the click of a button?

// View the changes done to my-app/src/App.js and my-app/src/index.js
/////////////////////////////////////////////////////
// Stateful component

// Now state will be added to our components using React's state hook.

// index.js will be...
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// App.js will be...
import { useState } from 'react' // this imports the useState function

const App = () => {
    const [ counter, setCounter ] = useState(0)

    setTimeout(
        () => setCounter(counter + 1),
        1000
    )

    return (
        <div>{counter}</div>
    )
}

export default App
/////////////////////////////////////////////////////
// Event Handling


/////////////////////////////////////////////////////
// An event handler is a function

// An event handler is supposed to be either a function or a function reference, but when we write...
// <button onClick={setCounter(counter + 1)}>...
// ...that is actually a function call.

// Usually defining event handlers in JSX-templates is not a good idea.
/////////////////////////////////////////////////////
// Passing state - to child components

// It's recommended to write React components that are small and reusable across the application and even across projects.
////////////////////////////////////////////////////
// Changes in state cause rerendering


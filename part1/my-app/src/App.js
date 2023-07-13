// In React, the individual things rendered in braces must be primitive values such as numbers or strings.

// React also allows for arrays to be rendered if and only if the array contents are a primitive type.


// This is a React component. React components MUST start with a capital letter. Otherwise the component won't render.
// The {props} parameter lets us know that this component accepts an object.
function Hello (props) {
  console.log(props);
  return (
    <>
      <p>Hello {props.name} you are {props.age} years old.</p>
    </>
  );
}

// This is also a React component.
const App = () => {
  const friends = [{name: 'Jake', age: 15}, {name: 'Daisy', age: 20}];
  return (
    // It is important to make sure every React component has one root element. For example, if the outermost <div> element was removed, the result is an error message.
    // Another work around is returning an array of elements, although this isn't best practice and makes the code look ugly.
    // However, fragments can also be used, which essentially wraps the child elements with an empty element as shown in the Hello component. This gets rid of the extra div root elements for each React component.
    <div>
      <h1>Greetings</h1>
      {/* The React component created before can be used multiple times. */}
      <Hello name={friends[0].name} age={friends[0].age}/>
      <Hello name={friends[1].name} age={friends[1].age}/>
    </div>
  );
}

// This section contains notes from the Part 1, Section C (Component State, Event Handlers).
const Counter = (props) => {
  const {counter} = props;
  return (
    <div>{counter}</div>
  )
}
export default Counter;
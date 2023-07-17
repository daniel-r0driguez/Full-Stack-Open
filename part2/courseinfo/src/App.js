import Course from './components/Course';

const App = () => {
  const course = {
    id: 1,

    name: 'Half Stack application development',

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Test Course',
        exercises: 15,
        id: 4
      }
    ],

    getTotal: function() {
      return this.parts.reduce((sum, part) => {
        return sum + part.exercises;
      }, 0);
    }
  }

  return <Course course={course} />
}

export default App;
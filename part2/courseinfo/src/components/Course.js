import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({course}) => {
    return (
        <div>
            <Header text={course.name}/>
            <Content parts={course.parts}/>
            <Total total={course.getTotal()}/>
        </div>
    );
};

export default Course;
import Header from './Header';
import Content from './Content';

const Course = ({course}) => {
    return (
        <div>
            <Header text='Half Stack application development'/>
            <Content parts={course.parts}/>
        </div>
    );
};

export default Course;
import Header from './Header';
import Content from './Content';

const Course = ({course}) => {
    const header = course.name;
    const content = course.parts;

    return (
        <div>
            <Header header={header}></Header>
            <Content content={content}></Content>
        </div>
        )
}

export default Course
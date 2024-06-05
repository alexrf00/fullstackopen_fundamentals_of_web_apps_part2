import Part from './Part';

const Content = ({content}) => {
    console.log(content)
   
    return (<div>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>{content.map((part)=>(<Part key={part.id} part={part}></Part>))}</ul>
         </div>)
}

export default Content

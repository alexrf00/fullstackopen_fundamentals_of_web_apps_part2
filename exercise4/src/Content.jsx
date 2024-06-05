import Part from './Part';

const Content = ({content}) => {
    console.log(content)
   
    return (<div>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>{content.map((part)=>(<Part key={part.id} part={part}></Part>))}</ul>
                <b>total of {content.reduce((sum,part)=>part.exercises+sum,0)}</b>
         </div>)
}

export default Content

import Part from './Part'
const Content = (props) => {
    const parts=[...props.parts]
    return (
        <div>
            <Part part={parts[0].name} excercise={parts[0].exercises} />
            <Part part={parts[1].name} excercise={parts[1].exercises} />
            <Part part={parts[2].name} excercise={parts[2].exercises} />
        </div>
    )
}
export default Content;
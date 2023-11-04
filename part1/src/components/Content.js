import Part from './Part'
const Content = (props) => {
    const parts=[...props.parts]
    const exercises = [...props.exercises]
    return (
        <div>
            <Part part={parts[0]} excercise={exercises[0]} />
            <Part part={parts[1]} excercise={exercises[1]} />
            <Part part={parts[2]} excercise={exercises[2]} />
        </div>
    )
}
export default Content;
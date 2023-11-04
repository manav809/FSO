import Part from './Part'
const Content = (props) => {
    return (
        <div>
            <Part part={props.part1} excercise={props.excercise1} />
            <Part part={props.part2} excercise={props.excercise2} />
            <Part part={props.part3} excercise={props.excercise3} />
        </div>
    )
}
export default Content;
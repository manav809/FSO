const Total = (props) => {
    return (
        <>
            <p>Number of excercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
        </>
    )
}
export default Total;
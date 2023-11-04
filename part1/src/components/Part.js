const Part = (props) => {
    console.log(props);
    return (
        <>
            <p>{props.part} {props.excercise}</p>
        </>
    )
}

export default Part;
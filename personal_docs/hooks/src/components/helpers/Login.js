import React  from "react";

const Login = (props) => {
    return (
        <input onChange = {(event) => {props.setUsername(event.target.value)}} />
    )
}

export default Login
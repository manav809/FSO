import React, { useEffect } from 'react';

const Text = ({returnComment}) => {
    useEffect(() => {
        console.log("This function was called")
    }, [returnComment])
    return <div>{returnComment('hello')}</div>
}

export default Text
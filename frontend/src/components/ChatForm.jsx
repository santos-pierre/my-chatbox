import React from 'react';
import { useForm } from "react-hook-form";

export default ({onSubmit}) => {
    const {register, handleSubmit} = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="message" ref={register}/>

            <button type="submit">Send</button>
        </form>
    )
}
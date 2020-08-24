import React from 'react';
import { useForm } from "react-hook-form";

export default ({onSubmitMessage}) => {
    const {register, handleSubmit} = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmitMessage)} className="bg-teal-500 w-full px-5 py-3 flex justify-around rounded-b">
            <input type="text" name="message" className="w-3/4 bg-teal-300 text-gray-800 p-2 focus:shadow-outline-teal rounded focus:outline-none" ref={register}/>
            <button type="submit" >
                <svg viewBox="0 0 20 20" fill="currentColor" className="paper-airplane w-12 h-12 transform rotate-90 text-white hover:text-cool-gray-200 transition-colors ease-in-out duration-300">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
            </button>
        </form>
    )
}
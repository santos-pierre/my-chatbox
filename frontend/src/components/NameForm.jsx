import React from "react";
import { useForm } from "react-hook-form";


export default ({onSubmitName}) => {
    const {register, handleSubmit} = useForm();

    return (
        <form className="flex items-center justify-center flex-col space-y-3 h-1/3 xl:w-3/6 lg:w-4/6 md:w-5/6 w-full" onSubmit={handleSubmit(onSubmitName)}>
          <label htmlFor="name" className="text-4xl font-semibold">Choose a name</label>
          <input className="shadow appearance-none border border-teal-400 rounded xl:w-4/6 w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-teal" id="name" type="text" name="name" ref={register}/>
        </form>
    )
}
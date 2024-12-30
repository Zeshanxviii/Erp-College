import { useForm, SubmitHandler } from "react-hook-form"

interface Input {
    username : string
    password : string
}

const StudentLogin = () => {

    const { register, handleSubmit } = useForm<Input>()
    const onSubmit: SubmitHandler<Input> = (data) => console.log(data)
  
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>User Name</label>
        <input {...register("username")} />
        <label>Password</label>
        <input {...register("password")} />
        <input type="submit" />
      </form>
    )
}

export default StudentLogin

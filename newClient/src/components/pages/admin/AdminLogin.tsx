import { useForm, SubmitHandler } from "react-hook-form";

interface Input {
 username : String;
 password : string;
}

export default function AdminLogin() {
  const { register, handleSubmit } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = data => console.log(data);

  return (
    <>
    <h1>Admin Login Page</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>User name</label>
      <input {...register("username")} />
      <label>Password</label>
      <input {...register("password")} />
      <input type="submit" />
    </form>
    </>
  );
}

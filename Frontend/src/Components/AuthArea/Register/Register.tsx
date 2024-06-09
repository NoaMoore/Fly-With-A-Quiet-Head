import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authService } from "../../../Services/AuthService";
import "./Register.css";
import { notify } from "../../../Utils/Notify";
import useTitle from "../../../Utils/UseTitle";

function Register(): JSX.Element {

    useTitle("Register");

    const { register, handleSubmit } = useForm<UserModel>();

    const navigate = useNavigate();
    
    async function send(user: UserModel) {
        try {
            await authService.register(user);
            const fullName = user.firstName + " " + user.lastName;
            notify.success("Welcome " + fullName);
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(send)}>

                <label>First name:</label>
                <input type="text" {...register("firstName")} required />

                <label>Last name:</label>
                <input type="text" {...register("lastName")} required/>

                <label>Email:</label>
                <input type="email" {...register("email")} required />

                <label>Password:</label>
                <input type="password" {...register("password")} required min="4"/>

                <button>Register</button>

            </form>

        </div>
    );
}

export default Register;

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { appStore } from "../../../Redux/Store";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./Login.css";
import useTitle from "../../../Utils/UseTitle";

function Login(): JSX.Element {

    useTitle("Login");

    const { register, handleSubmit } = useForm<CredentialsModel>();

    const navigate = useNavigate();
    
    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            const firstName = appStore.getState().user.firstName;
            notify.success(`Welcome back ${firstName}!`); 
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>

                <label>Email:</label>
                <input type="email" {...register("email")} required />

                <label>Password:</label>
                <input type="password" {...register("password")} required min="4"/>

                <button>Login</button>

            </form>

        </div>
    );
}

export default Login;

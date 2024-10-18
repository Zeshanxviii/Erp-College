import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAdminStore from "../../../store/Actions/adminActions";
import useErrorStore from "../../../store/Actions/useErrorStore";

const AdminLogin = () => {
    const [translate, setTranslate] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { adminSignIn } = useAdminStore((state) => ({
        adminSignIn: state.adminSignIn,
    }));
    const navigate = useNavigate();
    const { setErrors, clearErrors, errors } = useErrorStore((state) => ({
        setErrors: state.setErrors,
        clearErrors: state.clearErrors,
        errors: state.errors,
    }));
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setTranslate(true); // Ensure this doesn't cause unnecessary re-renders
        }, 1000);
        
        return () => clearTimeout(timer); // Clean up timer on unmount
    }, []); // Empty array ensures this runs only once
    

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Login function called");
        e.preventDefault();
        setLoading(true);
        clearErrors();
        console.log("Loading state set to true");
        try {
            await adminSignIn({ username, password }, navigate);
            console.log("Sign-in successful");
        } catch (error) {
            // Set the error in the error store
            setErrors({ usernameError: "Invalid username or password." });
        } finally {
            setLoading(false); // Moved to finally to ensure it's called regardless
            setUsername("");
            setPassword("");
        }
    }

    return (
        <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center">
            <div className="grid grid-cols-2">
                <div
                    className={`h-96 w-96 bg-white flex items-center justify-center ${translate ? "translate-x-[12rem]" : ""} duration-1000 transition-all rounded-3xl shadow-2xl`}
                >
                    <h1 className="text-[3rem] font-bold text-center">
                        Admin
                        <br />
                        Login
                    </h1>
                </div>
                <form
                    onSubmit={login}
                    className={`${loading ? "h-[27rem]" : "h-96"} w-96 bg-[#2c2f35] flex flex-col items-center justify-center ${translate ? "-translate-x-[12rem]" : ""} duration-1000 transition-all space-y-6 rounded-3xl shadow-2xl`}
                >
                    <h1 className="text-white text-3xl font-semibold">Admin</h1>
                    <div className="space-y-1">
                        <p className="text-[#515966] font-bold text-sm">Username</p>
                        <div className="bg-[#515966] rounded-lg w-[14rem] flex items-center">
                            <input
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    clearErrors(); // Clear errors on input change
                                }}
                                value={username}
                                type="text"
                                required
                                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                                placeholder="Username"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[#515966] font-bold text-sm">Password</p>
                        <div className="bg-[#515966] rounded-lg px-2 flex items-center">
                            <input
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    clearErrors(); // Clear errors on input change
                                }}
                                value={password}
                                required
                                type={showPassword ? "text" : "password"}
                                className="bg-[#515966] text-white rounded-lg outline-none py-2 placeholder:text-sm"
                                placeholder="Password"
                            />
                            {showPassword ? (
                                <VisibilityIcon
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="cursor-pointer"
                                />
                            ) : (
                                <VisibilityOffIcon
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
                    >
                        Login
                    </button>
                    {loading && (
                        <div>Loading...</div> // Replace with your spinner component
                    )}
                    {errors && (
                        <p className="text-red-500">
                            {errors.usernameError || errors.passwordError}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFaculty } from "../../context/index"; // Update this import path as needed
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import Spinner from "../../../utils/Spinner";

const FacultyLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { facultySignIn, state } = useFaculty();
    const [error, setError] = useState({});


    useEffect(() => {
        if (state.errors) {
            setError(state.errors);
            setLoading(false);
            setUsername("");
            setPassword("");
        }
    }, [state.errors]);

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        await facultySignIn({ username, password }, navigate);
        setLoading(false);
    };

    return (
        <div className="bg-white flex mt-40 justify-center">
                <form
                    onSubmit={login}
                    className={`${loading ? "h-[27rem]" : "h-96"
                        } w-96  flex flex-col items-center justify-center duration-1000 transition-all space-y-6 rounded-3xl shadow-2xl`}>
                    <h1 className="text-Black text-3xl ">Faculty</h1>
                    <div className="space-y-1">
                        <div className="rounded-lg w-[14rem] flex items-center">
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                type="text"
                                required
                                className=" text-gray px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                                placeholder="Username"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="bg-[#515966] rounded-lg px-2 flex w-[14rem]  items-center">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                type={showPassword ? "text" : "password"}
                                className=" bg-[#515966] text-white rounded-lg outline-none py-2  placeholder:text-sm"
                                placeholder="Password"
                            />
                            {/* {showPassword ? (
                                <VisibilityIcon
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="cursor-pointer"
                                />
                            ) : (
                                <VisibilityOffIcon
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="cursor-pointer"
                                />
                            )} */}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]">
                        Login
                    </button>
                    {loading && (
                        <Spinner
                            message="Logging In"
                            height={30}
                            width={150}
                            color="#ffffff"
                            messageColor="#fff"
                        />
                    )}
                    {(error.usernameError || error.passwordError) && (
                        <p className="text-red-500">
                            {error.usernameError || error.passwordError}
                        </p>
                    )}
                </form>
            </div>
    );
};

export default FacultyLogin;
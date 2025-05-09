import { useEffect, useState } from "react";
import { HiOutlineKey } from "react-icons/hi";
import { RiUser3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserThunk } from "../../store/userSlice/thunk";
export default function Login() {
    const [login, setLogin] = useState({
        username: "",
        password: "",
    });
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.user);
    
    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    function onchangeHandler(e) {
        const { name, value } = e.target;
        setLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleOnClick() {
        const response = await dispatch(loginUserThunk(login));
        if (response?.payload?.success) {
            navigate("/");
        }
    }

    return (
        <div className="flex items-center h-screen justify-center w-full">
            <div className="flex flex-col gap-2 justify-center bg-gray-700 w-[20rem] p-3">
                <h1 className="font-medium">Login Here</h1>
                <div className="w-full">
                    <label className="input validator">
                        <RiUser3Line className="opacity-50" />
                        <input
                            type="input"
                            onChange={onchangeHandler}
                            required
                            placeholder="Username"
                            name="username"
                            pattern="[A-Za-z][A-Za-z0-9\-]*"
                            minLength="3"
                            maxLength="30"
                            title="Only letters, numbers or dash"
                        />
                    </label>
                    <p className="validator-hint hidden">
                        Must be 3 to 30 characters
                        <br />containing only letters, numbers or dash
                    </p>
                </div>
                <div className="w-full">
                    <label className="input validator">
                        <HiOutlineKey className="opacity-50" />
                        <input
                            onChange={onchangeHandler}
                            type="password"
                            required
                            placeholder="Password"
                            name="password"
                        />
                    </label>
                    <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                    </p>
                </div>
                <p className="text-[12px]">
                    Don't have an account?{" "}
                    <Link to={"/signup"} className="text-[10px] text-blue-500">
                        Create Account
                    </Link>
                </p>
                <button className="btn-primary bg-neutral" onClick={handleOnClick}>
                    Login
                </button>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import { HiOutlineKey } from "react-icons/hi";
import { RiUser2Line, RiUser3Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { signupUserThunk } from "../../store/userSlice/thunk";
import { useDispatch, useSelector } from "react-redux";

export default function Signup() {
    const [signup, setSignup] = useState({
        username: "",
        password: "",
        fullName: "",
        gender: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.user);
    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    function onchangeHandler(e) {
        setSignup((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleOnClick() {
        dispatch(signupUserThunk(signup))
    }

    return (
        <div className=" flex items-center h-screen justify-center w-full  ">
            <div className="flex flex-col gap-2  justify-center bg-gray-700 w-[20rem] p-3">
                <h1 className="font-medium">Signup Here</h1>
                <div className="w-full">
                    <label className="input validator ">
                        <RiUser2Line className=" opacity-50" />
                        <input
                            type="input"
                            onChange={onchangeHandler}
                            required
                            placeholder="Fullname"
                            name="fullName"
                        // pattern="[A-Za-z][A-Za-z0-9\-]*"
                        // minLength="3"
                        // maxLength="30"
                        // title="Only letters, numbers or dash"

                        />
                    </label>
                    <p className="validator-hint  hidden">
                        Must be 3 to 30 characters
                        <br />containing only letters, numbers or dash
                    </p>

                </div> <div className="w-full">
                    <label className="input validator ">
                        <RiUser3Line className=" opacity-50" />
                        <input
                            type="input"
                            onChange={onchangeHandler}
                            required
                            placeholder="Username"
                            name="username"
                        // pattern="[A-Za-z][A-Za-z0-9\-]*"
                        // minLength="3"
                        // maxLength="30"
                        // title="Only letters, numbers or dash"

                        />
                    </label>
                    <p className="validator-hint  hidden">
                        Must be 3 to 30 characters
                        <br />containing only letters, numbers or dash
                    </p>

                </div>
                <div className="w-full">
                    <label className="input validator ">
                        < HiOutlineKey className=" opacity-50" />
                        <input
                            onChange={onchangeHandler}
                            type="password"
                            required
                            placeholder="Password"
                            name="password"
                        // minLength="8"
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        />
                    </label>
                    <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                    </p>
                </div>

                <div className="flex gap-2">
                    <label className="text-[12px] flex gap-1 items-center">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            className="radio radio-primary"
                            onChange={onchangeHandler}
                        // defaultChecked
                        />
                        Male
                    </label>
                    <label className="text-[12px] flex gap-1 items-center">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            className="radio radio-primary"
                            onChange={onchangeHandler}
                        />
                        Female
                    </label>
                </div>

                <p className="text-[12px]">
                    Already have an account ?
                    {" "}
                    <Link to={"/login"} className="text-[10px] text-blue-500">
                        Log In Account
                    </Link>
                </p>
                <button onClick={handleOnClick}>Sign Up</button>
            </div>
        </div>
    )
}
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { getProfileUserThunk } from "../store/userSlice/thunk";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            await dispatch(getProfileUserThunk());
        })();
    }, [dispatch]);

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} /> {/* Add Toaster here */}
        </div>
    )
}
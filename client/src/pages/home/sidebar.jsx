import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk, getOtherUserThunk } from "../../store/userSlice/thunk";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setSelectedUser } from "../../store/userSlice/slice";
import { getMessageThunk } from "../../store/messageSlice/thunk";

export default function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { otherUserProfile: userlist, userProfile } = useSelector((state) => state.user);
    const { selectedUser } = useSelector((state) => state.user);
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        (async () => {
            if (isAuthenticated && userProfile) {
                await dispatch(getOtherUserThunk());
            }
        })();
    }, [dispatch, isAuthenticated, userProfile]);
    



    const handleUserClick = (user) => {
        dispatch(setSelectedUser(user));
        dispatch(getMessageThunk(user._id));
    };

    async function handleLogout() {
        const response = await dispatch(logoutUserThunk());
        if (response?.payload?.success) {
            navigate("/login");
        }
    }

    return (
        <div className="p-4 h-screen flex flex-col bg-gray-800 text-white border-r border-gray-700 w-80">
            {/* Header and Search */}
            <div className="mb-4">
                <h1 className="text-xl font-bold mb-3">User List</h1>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search"
                    />
                    <IoSearch className="absolute top-2.5 right-3 text-gray-400" size={20} />
                </div>
            </div>

            {/* Scrollable user list */}
            <div className="flex-1 overflow-y-auto space-y-3">
                {Array.isArray(userlist) && userlist.length > 0 ? (userlist?.map((user) => (
                    <div
                        key={user._id}
                        onClick={() => handleUserClick(user)}
                        className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 ${user?._id === selectedUser?._id
                            ? "bg-blue-600"
                            : "hover:bg-gray-700"
                            }`}
                    >
                        <div className="avatar">
                            <div className="w-12 h-12 rounded-full ring ring-offset-2 ring-blue-500">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    alt="User Avatar"
                                />
                            </div>
                        </div>
                        <p className="text-lg font-medium">{user?.fullName}</p>
                    </div>
                ))) : (
                    <p className="text-gray-400">No users found</p>
                )}
            </div>

            {/* Logged-in user block fixed at the bottom */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-12 h-12 rounded-full ring ring-offset-2 ring-blue-500">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                alt="Logged-in User Avatar"
                            />
                        </div>
                    </div>
                    <h2 className="text-lg font-semibold">{userProfile?.fullName}</h2>
                </div>
                <button
                    onClick={handleLogout}
                    className="btn btn-primary btn-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
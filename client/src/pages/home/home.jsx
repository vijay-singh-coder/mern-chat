import { useDispatch, useSelector } from "react-redux";
import MessageContainer from "./messageContainer"
import Sidebar from "./sidebar"
import Loading from "../../components/loading";
import { useEffect } from "react";
import { socketInitialize, setOnlineUsers } from "../../store/socketSlice/slice";
import { setMessages } from "../../store/messageSlice/slice";
export default function Home() {

    const dispatch = useDispatch();
    const { isAuthenticated, userProfile } = useSelector((state) => state.user);
    const { socket } = useSelector((state) => state.socket);

    useEffect(() => {
        if (!isAuthenticated) return;
        dispatch(socketInitialize(userProfile?._id));
    }, [isAuthenticated, dispatch, userProfile]);

    useEffect(() => {
        if (!socket) return;
        socket.on("onlineuser", (onlineUsers) => {
            dispatch(setOnlineUsers(onlineUsers));
        });
        socket.on("newMessage", (newMessage) => {
            dispatch(setMessages(newMessage));
        });
        return () => {
            socket.close();
        };
    }, [socket]);

    if (!isAuthenticated) {
        return <Loading />;
    }

    return (
        <div className="flex">
            <Sidebar />
            <MessageContainer />
        </div>
    )
}
import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk, sendMessageThunk } from "../../store/messageSlice/thunk";

export default function MessageContainer() {
    const [formState, setFormState] = useState({ message: "" });
    const dispatch = useDispatch();
    const chatContainerRef = useRef(null);

    const { selectedUser } = useSelector((state) => state.user);
    const { messages } = useSelector((state) => state.message);

    useEffect(() => {
        if (selectedUser?._id) {
            dispatch(getMessageThunk(`${selectedUser?._id}`));
        }
    }, [dispatch, selectedUser]);

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
    }, [messages]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(
            sendMessageThunk({
                recieverId: selectedUser?._id,
                message: formState.message,
            })
        );

        setFormState({ message: "" });
    };


    return (
        <div className="flex flex-col h-screen w-full border-l border-gray-700 bg-gray-900 text-white">
            <div className="flex items-center gap-4 p-4 bg-blue-800 text-white shrink-0">
                <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-offset-2 ring-blue-500">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            alt="Avatar"
                        />
                    </div>
                </div>
                <p className="text-lg font-semibold">{selectedUser?.fullName || "Select a user"}</p>
            </div>

            <div ref={chatContainerRef} className="flex flex-col gap-3 p-4 overflow-y-auto flex-grow bg-gray-800">
                {Array.isArray(messages) && messages.length > 0 ?
                    (
                        messages?.map((message) => (
                            <div
                                key={`${message._id}-${message.senderId}`}
                                className={`p-3 rounded-lg text-white max-w-xs break-words ${message.senderId === selectedUser?._id
                                    ? "bg-blue-600 self-start"
                                    : "bg-green-600 self-end"
                                    }`}
                            >
                                {message.message}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No messages found</p>
                    )}
            </div>

            <form
                className="flex items-center gap-3 p-3 border-t border-gray-700 bg-gray-800"
                onSubmit={handleSubmit}
            >
                <input
                    className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="message"
                    placeholder="Type your message..."
                    value={formState.message}
                    onChange={handleChange}
                />
                <button
                    className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                    type="submit"
                >
                    <FiSend size={20} />
                </button>
            </form>
        </div>
    );
}
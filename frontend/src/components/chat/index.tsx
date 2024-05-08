'use client';
import { useChatActions, useChatState } from "@/providers/chatProvider";
import { IChat } from "@/providers/chatProvider/context";
import { useState } from "react";

const Chat = ({
    taskId
}: {
    taskId: string;
}) => {
    const { chats, chat } = useChatState();
    const { postChat, getChats } = useChatActions();

    const sendMessage = () => {
        if (chat) {
            // setMessages([...messages, { text: message, user: 'me' }]);
            // setMessage('');
        }
    };

    return (
        <div>
            <div>
                {chats?.map((message, index) => (
                    <div key={index}>
                        {/* <span>{message.user}</span> */}
                        <span>{chat?.content}</span>
                    </div>
                ))}
            </div>
            <input
                title="new_message"
                type="text"
                value={chat?.content}
            // onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;
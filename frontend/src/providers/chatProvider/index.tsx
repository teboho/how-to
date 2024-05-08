"use client";
import { getAxiosInstace } from "@/utils";
import { message } from "antd";
import React, { useEffect, useMemo, useReducer } from "react";
import { useAuthState } from "../authProvider";
import * as chatActions from "./actions";
import { ChatActionsContext, ChatStateContext, ChatStateContext_Default, IChat } from "./context";
import chatReducer from "./reducer";

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { loginObj } = useAuthState();
    const [state, dispatch] = useReducer(chatReducer, ChatStateContext_Default);


    useEffect(() => {
        if (!loginObj) {
            clearChatState();
        }
    }, [loginObj]);

    useEffect(() => {
        if (loginObj && (!state.chats || state.chats.length)) {
            getChats();
        }
    }, []);

    useEffect(() => {
        if (loginObj && (!state.chats || state.chats.length)) {
            getChats();
        }
    }, [loginObj]);

    const instance = useMemo(() => {
        const accessToken = loginObj?.accessToken;
        if (accessToken) {
            return getAxiosInstace(accessToken)
        } else {
            return getAxiosInstace("");
        }
    }, [loginObj]);

    const getChat = (id: string) => {
        dispatch(chatActions.getChatRequestAction());
        const endpoint = "api/services/app/Chat/Get?id=" + id;
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(chatActions.getChatSuccessAction(response.data.result))
                } else {
                    dispatch(chatActions.getChatErrorAction())
                }
            })
            .catch(err =>
                dispatch(chatActions.getChatErrorAction())
            );
    }
    const postChat = (chat: IChat) => {
        dispatch(chatActions.postChatRequestAction());
        const endpoint = "api/services/app/Chat/Create"
        instance.post(endpoint, chat)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(chatActions.postChatSuccessAction(response.data.result));
                    appendStateChat(response.data.result);
                    messageApi.success("Chat created successfully");
                } else {
                    dispatch(chatActions.postChatErrorAction())
                }
            })
            .catch(err =>
                dispatch(chatActions.postChatErrorAction())
            );
    }
    const putChat = (chat: IChat) => {
        dispatch(chatActions.putChatRequestAction());
        const endpoint = "api/services/app/Chat/Update";
        instance.put(endpoint, chat)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(chatActions.putChatSuccessAction(response.data.result));
                    updateStateChat(response.data.result);
                } else {
                    dispatch(chatActions.putChatErrorAction())
                }
            })
            .catch(err =>
                dispatch(chatActions.putChatErrorAction())
            );
    }
    const deleteChat = (chat: IChat) => {
        dispatch(chatActions.deleteChatRequestAction());
        const endpoint = "api/services/app/Chat/Delete";
        instance.delete(endpoint, { data: chat })
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(chatActions.deleteChatSuccessAction())
                } else {
                    dispatch(chatActions.deleteChatErrorAction())
                }
            })
            .catch(err =>
                dispatch(chatActions.deleteChatErrorAction())
            );
    }
    const getChats = () => {
        dispatch(chatActions.getChatsRequestAction());
        const endpoint = "api/services/app/Chat/GetAll";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(chatActions.getChatsSuccessAction(response.data.result.items))
                } else {
                    dispatch(chatActions.getChatsErrorAction())
                }
            })
            .catch(err =>
                dispatch(chatActions.getChatsErrorAction())
            );
    }
    const getMyChats = () => {
        dispatch(chatActions.getChatsRequestAction());
        const endpoint = "api/services/app/Chat/GetMyChats";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(chatActions.getChatsSuccessAction(response.data.result))
                } else {
                    dispatch(chatActions.getChatsErrorAction())
                }
            })
            .catch(err =>
                dispatch(chatActions.getChatsErrorAction())
            );
    }
    const completeChat = (chatId: string) => {
        dispatch(chatActions.putChatRequestAction());
        const endpoint = "api/services/app/Chat/Complete?chatId=" + chatId;
        instance.put(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(chatActions.putChatSuccessAction(response.data.result));
                    updateStateChat(response.data.result);
                } else {
                    dispatch(chatActions.putChatErrorAction())
                }
            })
            .catch(err =>
                dispatch(chatActions.putChatErrorAction())
            );
    }
    const updateStateChat = (chat: IChat) => {
        const chats = state.chats;
        if (chats) {
            const index = chats.findIndex(t => t.id === chat.id);
            if (index > -1) {
                chats[index] = chat;
                dispatch(chatActions.getChatsSuccessAction(chats));
            }
        }
        if (state.chat?.id === chat.id) {
            dispatch(chatActions.getChatSuccessAction(chat));
        }
    }
    const appendStateChat = (chat: IChat) => {
        const chats = state.chats;
        if (chats) {
            chats.push(chat);
            dispatch(chatActions.getChatsSuccessAction(chats));
        }
    }
    const getLocalChat = (id: string) => {
        const chats = state.chats;
        if (chats) {
            return chats.find(t => t.id === id);
        }
        return undefined;
    }

    const clearChatState = () => {
        dispatch(chatActions.clearChatStateAction());
    }

    return (
        <ChatStateContext.Provider value={{ ...state }}>
            <ChatActionsContext.Provider value={{
                getChat,
                postChat,
                putChat,
                deleteChat,
                getChats,
                getMyChats,
                completeChat,
                getLocalChat
            }}>
                {contextHolder}
                {children}
            </ChatActionsContext.Provider>
        </ChatStateContext.Provider>
    );
}

export default ChatProvider;

export const useChatState = () => {
    const context = React.useContext(ChatStateContext);
    if (!context) {
        throw new Error("useChatState must be used as a descendant within a ChatProvider");
    }
    return context;
}

export const useChatActions = () => {
    const context = React.useContext(ChatActionsContext);
    if (!context) {
        throw new Error("useChatActions must be used as a descendant within a ChatProvider");
    }
    return context;
}
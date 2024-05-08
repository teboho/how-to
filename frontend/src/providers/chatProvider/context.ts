import { createContext } from "react";

/** IChat represents one Message item */
export interface IChat {
    id?: string;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    isDeleted?: boolean;
    deleterUserId?: number;
    deletionTime?: string;
    content: string;
    taskId: string;
}

export interface IChatStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    chat?: IChat;
    chats?: IChat[];
    myChats?: IChat[];
}
export const ChatStateContext_Default: IChatStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    chat: undefined,
    chats: undefined,
    myChats: undefined
}

export interface IChatActionsContext {
    getChat: (id: string) => void;
    postChat: (chat: IChat, categories: string[]) => void;
    putChat: (chat: IChat) => void;
    deleteChat: (chat: IChat) => void;
    getChats: () => void;
    getMyChats: () => void;
    completeChat: (chatId: string) => void;
    getLocalChat: (id: string) => IChat | undefined;
}
export const ChatActionsContext_Default: IChatActionsContext = {
    getChat: () => {},
    postChat: () => {},
    putChat: () => {},
    deleteChat: () => {},
    getChats: () => {},
    getMyChats: () => {},
    completeChat: () => {},
    getLocalChat: () => undefined
}

const ChatStateContext = createContext<IChatStateContext>(ChatStateContext_Default);
const ChatActionsContext = createContext<IChatActionsContext>(ChatActionsContext_Default);

export {
    ChatActionsContext, ChatStateContext
};

import { createAction } from "redux-actions";
import { ChatStateContext_Default, IChat, IChatStateContext } from "./context";

export const ChatActionEnums = {
    GetChatRequest: "GET_CHAT_REQUEST",
    GetChatSuccess: "GET_CHAT_SUCCESS",
    GetChatError: "GET_CHAT_ERROR",

    PostChatRequest: "POST_CHAT_REQUEST",
    PostChatSuccess: "POST_CHAT_SUCCESS",
    PostChatError: "POST_CHAT_ERROR",

    PutChatRequest: "PUT_CHAT_REQUEST",
    PutChatSuccess: "PUT_CHAT_SUCCESS",
    PutChatError: "PUT_CHAT_ERROR",

    DeleteChatRequest: "DELETE_CHAT_REQUEST",
    DeleteChatSuccess: "DELETE_CHAT_SUCCESS",
    DeleteChatError: "DELETE_CHAT_ERROR",

    GetChatsRequest: "GET_CHATS_REQUEST",
    GetChatsSuccess: "GET_CHATS_SUCCESS",
    GetChatsError: "GET_CHATS_ERROR",

    ClearChatState: "CLEAR_CHAT_STATE"
}

export const getChatRequestAction = createAction<IChatStateContext>(
    ChatActionEnums.GetChatRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, chat: undefined })
);
export const getChatSuccessAction = createAction<IChatStateContext, IChat>(
    ChatActionEnums.GetChatSuccess,
    (chat: IChat) => ({ isPending: false, isSuccess: true, isError: false, chat })
);
export const getChatErrorAction = createAction<IChatStateContext>(
    ChatActionEnums.GetChatError,
    () => ({ isPending: false, isSuccess: false, isError: true, chat: undefined })
);

export const postChatRequestAction = createAction<IChatStateContext>(
    ChatActionEnums.PostChatRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, chat: undefined })
);
export const postChatSuccessAction = createAction<IChatStateContext, IChat>(
    ChatActionEnums.PostChatSuccess,
    (chat: IChat) => ({ isPending: false, isSuccess: true, isError: false, chat })
);
export const postChatErrorAction = createAction<IChatStateContext>(
    ChatActionEnums.PostChatError,
    () => ({ isPending: false, isSuccess: false, isError: true, chat: undefined })
);

export const putChatRequestAction = createAction<IChatStateContext>(
    ChatActionEnums.PutChatRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, chat: undefined })
);
export const putChatSuccessAction = createAction<IChatStateContext, IChat>(
    ChatActionEnums.PutChatSuccess,
    (chat: IChat) => ({ isPending: false, isSuccess: true, isError: false, chat })
);
export const putChatErrorAction = createAction<IChatStateContext>(
    ChatActionEnums.PutChatError,
    () => ({ isPending: false, isSuccess: false, isError: true, chat: undefined })
);

export const deleteChatRequestAction = createAction<IChatStateContext>(
    ChatActionEnums.DeleteChatRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, chat: undefined })
);
export const deleteChatSuccessAction = createAction<IChatStateContext>(
    ChatActionEnums.DeleteChatSuccess,
    () => ({ isPending: false, isSuccess: true, isError: false })
);
export const deleteChatErrorAction = createAction<IChatStateContext>(
    ChatActionEnums.DeleteChatError,
    () => ({ isPending: false, isSuccess: false, isError: true, chat: undefined })
);

export const getChatsRequestAction = createAction<IChatStateContext>(
    ChatActionEnums.GetChatsRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, chats: undefined })
);
export const getChatsSuccessAction = createAction<IChatStateContext, IChat[]>(
    ChatActionEnums.GetChatsSuccess,
    (chats: IChat[]) => ({ isPending: false, isSuccess: true, isError: false, chats })
);
export const getChatsErrorAction = createAction<IChatStateContext>(
    ChatActionEnums.GetChatsError,
    () => ({ isPending: false, isSuccess: false, isError: true, chat: undefined })
);

export const clearChatStateAction = createAction<IChatStateContext>(
    ChatActionEnums.ClearChatState,
    () => ({ ...ChatStateContext_Default })
);
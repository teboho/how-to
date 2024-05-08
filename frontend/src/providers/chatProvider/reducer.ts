import { handleActions } from 'redux-actions';
import { ChatActionEnums } from './actions';
import { ChatStateContext_Default, IChat } from './context';

const chatReducer = handleActions(
    {
        [ChatActionEnums.GetChatRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, chat: undefined };
        },
        [ChatActionEnums.GetChatSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [ChatActionEnums.GetChatError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, chat: undefined };
        },

        [ChatActionEnums.PostChatRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, chat: undefined };
        },
        [ChatActionEnums.PostChatSuccess]: (state, action) => {
            const { chat } = action.payload;
            if (!chat) return { ...state, isPending: false, isSuccess: false, isError: true, chat: undefined };
            const newChats: IChat[] = state.chats ? [...state.chats, chat] : [chat];
            return { ...state, ...action.payload, chats: newChats };
        },
        [ChatActionEnums.PostChatError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, chat: undefined };
        },

        [ChatActionEnums.PutChatRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false };
        },
        [ChatActionEnums.PutChatSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [ChatActionEnums.PutChatError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, chat: undefined };
        },

        [ChatActionEnums.DeleteChatRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, chat: undefined };
        },
        [ChatActionEnums.DeleteChatSuccess]: (state, action) => {
            return { ...state, isPending: false, isSuccess: true, isError: false };
        },
        [ChatActionEnums.DeleteChatError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true };
        },
        
        [ChatActionEnums.GetChatsRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, chats: undefined };
        },
        [ChatActionEnums.GetChatsSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [ChatActionEnums.GetChatsError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, chats: undefined };
        },

        [ChatActionEnums.ClearChatState]: (state) => {
            return { ...ChatStateContext_Default };
        }
    },
    ChatStateContext_Default
);

export default chatReducer;
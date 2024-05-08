import { handleActions } from 'redux-actions';
import { TaskActionEnums } from './actions';
import { TaskStateContext_Default } from './context';

const taskReducer = handleActions(
    {
        [TaskActionEnums.GetTaskRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, task: undefined };
        },
        [TaskActionEnums.GetTaskSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [TaskActionEnums.GetTaskError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, task: undefined };
        },

        [TaskActionEnums.PostTaskRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, task: undefined };
        },
        [TaskActionEnums.PostTaskSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [TaskActionEnums.PostTaskError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, task: undefined };
        },

        [TaskActionEnums.PutTaskRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false };
        },
        [TaskActionEnums.PutTaskSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [TaskActionEnums.PutTaskError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, task: undefined };
        },

        [TaskActionEnums.DeleteTaskRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, task: undefined };
        },
        [TaskActionEnums.DeleteTaskSuccess]: (state, action) => {
            return { ...state, isPending: false, isSuccess: true, isError: false };
        },
        [TaskActionEnums.DeleteTaskError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true };
        },
        
        [TaskActionEnums.GetTasksRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, tasks: undefined };
        },
        [TaskActionEnums.GetTasksSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [TaskActionEnums.GetTasksError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, tasks: undefined };
        },

        [TaskActionEnums.ClearTaskState]: (state) => {
            return { ...TaskStateContext_Default };
        }
    },
    TaskStateContext_Default
);

export default taskReducer;
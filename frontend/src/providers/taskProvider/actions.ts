import { createAction } from "redux-actions";
import { ITask, ITaskStateContext, TaskStateContext_Default } from "./context";

export const TaskActionEnums = {
    GetTaskRequest: "GET_TASK_REQUEST",
    GetTaskSuccess: "GET_TASK_SUCCESS",
    GetTaskError: "GET_TASK_ERROR",

    PostTaskRequest: "POST_TASK_REQUEST",
    PostTaskSuccess: "POST_TASK_SUCCESS",
    PostTaskError: "POST_TASK_ERROR",

    PutTaskRequest: "PUT_TASK_REQUEST",
    PutTaskSuccess: "PUT_TASK_SUCCESS",
    PutTaskError: "PUT_TASK_ERROR",

    DeleteTaskRequest: "DELETE_TASK_REQUEST",
    DeleteTaskSuccess: "DELETE_TASK_SUCCESS",
    DeleteTaskError: "DELETE_TASK_ERROR",

    GetTasksRequest: "GET_TASKS_REQUEST",
    GetTasksSuccess: "GET_TASKS_SUCCESS",
    GetTasksError: "GET_TASKS_ERROR",

    ClearTaskState: "CLEAR_TASK_STATE"
}

export const getTaskRequestAction = createAction<ITaskStateContext>(
    TaskActionEnums.GetTaskRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, task: undefined })
);

export const getTaskSuccessAction = createAction<ITaskStateContext, ITask>(
    TaskActionEnums.GetTaskSuccess,
    (task: ITask) => ({ isPending: false, isSuccess: true, isError: false, task })
);

export const getTaskErrorAction = createAction<ITaskStateContext>(
    TaskActionEnums.GetTaskError,
    () => ({ isPending: false, isSuccess: false, isError: true, task: undefined })
);

export const postTaskRequestAction = createAction<ITaskStateContext>(
    TaskActionEnums.PostTaskRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, task: undefined })
);

export const postTaskSuccessAction = createAction<ITaskStateContext, ITask>(
    TaskActionEnums.PostTaskSuccess,
    (task: ITask) => ({ isPending: false, isSuccess: true, isError: false, task })
);

export const postTaskErrorAction = createAction<ITaskStateContext>(
    TaskActionEnums.PostTaskError,
    () => ({ isPending: false, isSuccess: false, isError: true, task: undefined })
);

export const putTaskRequestAction = createAction<ITaskStateContext>(
    TaskActionEnums.PutTaskRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, task: undefined })
);

export const putTaskSuccessAction = createAction<ITaskStateContext, ITask>(
    TaskActionEnums.PutTaskSuccess,
    (task: ITask) => ({ isPending: false, isSuccess: true, isError: false, task })
);

export const putTaskErrorAction = createAction<ITaskStateContext>(
    TaskActionEnums.PutTaskError,
    () => ({ isPending: false, isSuccess: false, isError: true, task: undefined })
);

export const deleteTaskRequestAction = createAction<ITaskStateContext>(
    TaskActionEnums.DeleteTaskRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, task: undefined })
);

export const deleteTaskSuccessAction = createAction<ITaskStateContext>(
    TaskActionEnums.DeleteTaskSuccess,
    () => ({ isPending: false, isSuccess: true, isError: false })
);

export const deleteTaskErrorAction = createAction<ITaskStateContext>(
    TaskActionEnums.DeleteTaskError,
    () => ({ isPending: false, isSuccess: false, isError: true, task: undefined })
);

export const getTasksRequestAction = createAction<ITaskStateContext>(
    TaskActionEnums.GetTasksRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, tasks: undefined })
);

export const getTasksSuccessAction = createAction<ITaskStateContext, ITask[]>(
    TaskActionEnums.GetTasksSuccess,
    (tasks: ITask[]) => ({ isPending: false, isSuccess: true, isError: false, tasks })
);

export const getTasksErrorAction = createAction<ITaskStateContext>(
    TaskActionEnums.GetTasksError,
    () => ({ isPending: false, isSuccess: false, isError: true, task: undefined })
);

export const clearTaskStateAction = createAction<ITaskStateContext>(
    TaskActionEnums.ClearTaskState,
    () => (TaskStateContext_Default)
);

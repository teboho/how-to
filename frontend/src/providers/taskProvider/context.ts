import { createContext } from "react";

export interface ITask {
    id?: string;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    isDeleted?: boolean;
    deleterUserId?: number;
    deletionTime?: string;
    title: string;
    description: string;
    amount: number;
    views?: number;
    timeFrame: number;
    status: TaskStatus;
}

enum TaskStatus {
    NEW,
    ASSIGNED,
    DONE
}

export interface ITaskStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    task?: ITask;
    tasks?: ITask[];
}
export const TaskStateContext_Default: ITaskStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    task: undefined,
    tasks: undefined
}

export interface ITaskActionsContext {
    getTask: (id: string) => void;
    postTask: (task: ITask) => void;
    putTask: (task: ITask) => void;
    deleteTask: (task: ITask) => void;
    getTasks: () => void;
    getMyTasks: () => void;
    completeTask: (taskId: string) => void;
    upViews: (taskId: string) => void;
    updateStateTask: (task: ITask) => void;
    getLocalTask: (id: string) => ITask | undefined;
}
export const TaskActionsContext_Default: ITaskActionsContext = {
    getTask: () => {},
    postTask: () => {},
    putTask: () => {},
    deleteTask: () => {},
    getTasks: () => {},
    getMyTasks: () => {},
    completeTask: () => {},
    upViews: () => {},
    updateStateTask: () => {},
    getLocalTask: () => undefined
}

const TaskStateContext = createContext<ITaskStateContext>(TaskStateContext_Default);
const TaskActionsContext = createContext<ITaskActionsContext>(TaskActionsContext_Default);

export {
    TaskActionsContext, TaskStateContext
};

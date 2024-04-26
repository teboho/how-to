"use client";

import { getAxiosInstace } from "@/utils";
import React, { useMemo, useReducer } from "react";
import { useAuthState } from "../authProvider";
import * as taskActions from "./actions";
import taskReducer from "./reducer";
import { ITask, TaskActionsContext, TaskStateContext, TaskStateContext_Default } from "./context";
import { Guid } from "typescript-guid";

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const { loginObj } = useAuthState();
    const [state, dispatch] = useReducer(taskReducer, TaskStateContext_Default);

    const instance = useMemo(() => {
        const accessToken = loginObj?.accessToken;
        if (accessToken) {
            return getAxiosInstace(accessToken)
        } else {
            return getAxiosInstace("");
        }        
    }, [loginObj]);

    const getTask = (id: string) => {
        const task = state.tasks?.find(t => t.id === id);
        if (task) {
            dispatch(taskActions.getTaskSuccessAction(task));
        } else {
            dispatch(taskActions.getTaskErrorAction());
        }
    }
    const postTask = (task: ITask) => {
        dispatch(taskActions.postTaskRequestAction());
        const endpoint = "api/services/app/Task/Create"
        instance.post(endpoint, task)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(taskActions.postTaskSuccessAction(response.data.result))
                    } else {
                        dispatch(taskActions.postTaskErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(taskActions.postTaskErrorAction())
                );
    }
    const putTask = (task: ITask) => {
        dispatch(taskActions.putTaskRequestAction());
        const endpoint = "api/services/app/Task/Update";
        instance.put(endpoint, task)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(taskActions.putTaskSuccessAction(response.data.result));
                    } else {
                        dispatch(taskActions.putTaskErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(taskActions.putTaskErrorAction())
                );
    }
    const deleteTask = (task: ITask) => {
        dispatch(taskActions.deleteTaskRequestAction());
        const endpoint = "api/services/app/Task/Delete";
        instance.delete(endpoint, { data: task })
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(taskActions.deleteTaskSuccessAction())
                    } else {
                        dispatch(taskActions.deleteTaskErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(taskActions.deleteTaskErrorAction())
                );
    }
    const getTasks = () => {
        dispatch(taskActions.getTasksRequestAction());
        const endpoint = "api/services/app/Task/GetAll";
        instance.get(endpoint)
                .then(response => {
                    console.log(response);
                    if (response.status > 199 && response.status < 300) {
                        dispatch(taskActions.getTasksSuccessAction(response.data.result.items))
                    } else {
                        dispatch(taskActions.getTasksErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(taskActions.getTasksErrorAction())
                );
    }
    const getMyTasks = () => {
        dispatch(taskActions.getTasksRequestAction());
        const endpoint = "api/services/app/Task/GetMyTasks";
        instance.get(endpoint)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(taskActions.getTasksSuccessAction(response.data.result))
                    } else {
                        dispatch(taskActions.getTasksErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(taskActions.getTasksErrorAction())
                );
    }

    return (
        <TaskStateContext.Provider value={{ ...state }}>
            <TaskActionsContext.Provider value={{
                getTask,
                postTask,
                putTask,
                deleteTask,
                getTasks,
                getMyTasks
            }}>
                {children}
            </TaskActionsContext.Provider>
        </TaskStateContext.Provider>
    );
}

export default TaskProvider;

export const useTaskState = () => {
    const context = React.useContext(TaskStateContext);
    if (!context) {
        throw new Error("useTaskState must be used as a descendant within a TaskProvider");
    }
    return context;
}

export const useTaskActions = () => {
    const context = React.useContext(TaskActionsContext);
    if (!context) {
        throw new Error("useTaskActions must be used as a descendant within a TaskProvider");
    }
    return context;
}
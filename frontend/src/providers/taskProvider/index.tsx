"use client";

import { getAxiosInstace } from "@/utils";
import React, { useEffect, useMemo, useReducer } from "react";
import { useAuthState } from "../authProvider";
import * as taskActions from "./actions";
import taskReducer from "./reducer";
import { ITask, TaskActionsContext, TaskStateContext, TaskStateContext_Default } from "./context";
import { message } from "antd";

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { loginObj } = useAuthState();
    const [state, dispatch] = useReducer(taskReducer, TaskStateContext_Default);

    useEffect(() => {
        if (loginObj) {
            getTasks();
        }
    }, []);

    useEffect(() => {
        if (loginObj) {
            getTasks();
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

    const getTask = (id: string) => {
        dispatch(taskActions.getTaskRequestAction());
        const endpoint = "api/services/app/Task/Get?id=" + id;
        instance.get(endpoint)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(taskActions.getTaskSuccessAction(response.data.result))
                    } else {
                        dispatch(taskActions.getTaskErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(taskActions.getTaskErrorAction())
                );
    }
    const postTask = (task: ITask) => {
        dispatch(taskActions.postTaskRequestAction());
        const endpoint = "api/services/app/Task/Create"
        instance.post(endpoint, task)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(taskActions.postTaskSuccessAction(response.data.result));
                        appendStateTask(response.data.result);
                        messageApi.success("Task created successfully");
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
                        updateStateTask(response.data.result); 
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
    const completeTask = (taskId: string) => {
        dispatch(taskActions.putTaskRequestAction());
        const endpoint = "api/services/app/Task/Complete?taskId=" + taskId;
        instance.put(endpoint)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(taskActions.putTaskSuccessAction(response.data.result));
                        updateStateTask(response.data.result);
                    } else {
                        dispatch(taskActions.putTaskErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(taskActions.putTaskErrorAction())
                );
    }    
    const upViews = (taskId: string) => {
        dispatch(taskActions.putTaskRequestAction());
        const endpoint = "api/services/app/Task/UpViews?taskId=" + taskId;
        instance.put(endpoint)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(taskActions.putTaskSuccessAction(response.data.result));
                        updateStateTask(response.data.result);
                    } else {
                        dispatch(taskActions.putTaskErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(taskActions.putTaskErrorAction())
                );
    }
    const updateStateTask = (task: ITask) => {
        const tasks = state.tasks;
        if (tasks) {
            const index = tasks.findIndex(t => t.id === task.id);
            if (index > -1) {
                tasks[index] = task;
                dispatch(taskActions.getTasksSuccessAction(tasks));
            }
        }
        if (state.task?.id === task.id) {
            dispatch(taskActions.getTaskSuccessAction(task));
        }
    }
    const appendStateTask = (task: ITask) => {
        const tasks = state.tasks;
        if (tasks) {
            tasks.push(task);
            dispatch(taskActions.getTasksSuccessAction(tasks));
        }
    }
    const getLocalTask = (id: string) => {
        const tasks = state.tasks;
        if (tasks) {
            return tasks.find(t => t.id === id);
        }
        return undefined;
    }

    return (
        <TaskStateContext.Provider value={{ ...state }}>
            <TaskActionsContext.Provider value={{
                getTask,
                postTask,
                putTask,
                deleteTask,
                getTasks,
                getMyTasks,
                completeTask,
                upViews,
                updateStateTask,
                getLocalTask
            }}>
                {contextHolder}
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
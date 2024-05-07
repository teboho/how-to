"use client";
import { getAxiosInstace } from "@/utils";
import { message } from "antd";
import React, { useEffect, useMemo, useReducer } from "react";
import { useAuthState } from "../authProvider";
import * as categoryActions from "./actions";
import { CategoriesStateContext, CategoriesStateContext_Default, CategoryActionsContext, ICategory, IExecutorCategory, ITaskCategory } from "./context";
import categoryReducer from "./reducer";

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { loginObj } = useAuthState();
    const [state, dispatch] = useReducer(categoryReducer, CategoriesStateContext_Default);

    useEffect(() => {
        if (loginObj?.accessToken && !state.categories) {
            getCategories();
        }
    }, []);

    const instance = useMemo(() => {
        const accessToken = loginObj?.accessToken;
        if (accessToken) {
            return getAxiosInstace(accessToken)
        } else {
            return getAxiosInstace("");
        }
    }, [loginObj]);

    useEffect(() => {
        if (loginObj?.accessToken && !state.categories) {
            getCategories();
        }
    }, [loginObj?.accessToken]);

    const getCategory = (id: string) => {
        dispatch(categoryActions.getCategoryRequestAction());
        const endpoint = "api/services/app/Category/Get?id=" + id;
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(categoryActions.getCategoriesuccessAction(response.data.result))
                } else {
                    dispatch(categoryActions.getCategoryErrorAction())
                }
            })
            .catch(err =>
                dispatch(categoryActions.getCategoryErrorAction())
            );
    }
    const postCategory = (category: ICategory) => {
        dispatch(categoryActions.postCategoryRequestAction());
        const endpoint = "api/services/app/Category/Create"
        instance.post(endpoint, category)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(categoryActions.postCategoriesuccessAction(response.data.result));
                    messageApi.success("Category created successfully");
                } else {
                    dispatch(categoryActions.postCategoryErrorAction())
                }
            })
            .catch(err =>
                dispatch(categoryActions.postCategoryErrorAction())
            );
    }
    const putCategory = (category: ICategory) => {
        dispatch(categoryActions.putCategoryRequestAction());
        const endpoint = "api/services/app/Category/Update";
        instance.put(endpoint, category)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(categoryActions.putCategoriesuccessAction(response.data.result));
                } else {
                    dispatch(categoryActions.putCategoryErrorAction())
                }
            })
            .catch(err =>
                dispatch(categoryActions.putCategoryErrorAction())
            );
    }
    const getCategories = () => {
        dispatch(categoryActions.getCategoriesRequestAction());
        const endpoint = "api/services/app/Category/GetAll";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(categoryActions.getCategoriesSuccessAction(response.data.result.items))
                } else {
                    dispatch(categoryActions.getCategoriesErrorAction())
                }
            })
            .catch(err =>
                dispatch(categoryActions.getCategoriesErrorAction())
            );
    }
    const getMyCategories = () => {
        dispatch(categoryActions.getMyExecutorCategoriesRequestAction());
        const endpoint = "api/services/app/ExecutorCategory/GetMyExecutorCategories";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(categoryActions.getMyExecutorCategoriesSuccessAction(response.data.result));
                } else {
                    dispatch(categoryActions.getMyExecutorCategoriesErrorAction())
                }
            })
            .catch(err =>
                dispatch(categoryActions.getMyExecutorCategoriesErrorAction())
            );
    }
    const postMyCategories = (newExeCats: { executorCategories: IExecutorCategory[] }) => {
        dispatch(categoryActions.postMyExecutorCategoriesRequestAction());
        const endpoint = "api/services/app/ExecutorCategory/CreateMultiple";
        instance.post(endpoint, newExeCats)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(categoryActions.postMyExecutorCategoriesSuccessAction(response.data.result));
                    messageApi.success("Category added successfully");
                } else {
                    dispatch(categoryActions.postMyExecutorCategoriesErrorAction())
                }
            })
            .catch(err =>
                dispatch(categoryActions.postMyExecutorCategoriesErrorAction())
            );
    }
    const postTaskCategory = (categoryId: string, taskId: string) => {
        dispatch(categoryActions.postTaskCategoryRequestAction());
        const endpoint = "api/services/app/Category/PostTaskCategory";
        instance.post(endpoint, { categoryId, taskId })
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(categoryActions.postTaskCategorySuccessAction());
                    messageApi.success("Task added to category successfully");
                    addToTaskCategories(response.data.result);
                } else {
                    dispatch(categoryActions.postTaskCategoryErrorAction())
                }
            })
            .catch(err =>
                dispatch(categoryActions.postTaskCategoryErrorAction())
            );
    }
    const getTaskCategories = () => {
        dispatch(categoryActions.getTaskCategoriesRequestAction());
        const endpoint = "api/services/app/TaskCategory/GetAll";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(categoryActions.getTaskCategoriesSuccessAction(response.data.result.items))
                } else {
                    dispatch(categoryActions.getTaskCategoriesErrorAction())
                }
            })
            .catch(err =>
                dispatch(categoryActions.getTaskCategoriesErrorAction())
            );
    }
    const addToTaskCategories = (taskCategory: ITaskCategory) => {
        const newTaskCategories = state.taskCategories ? [...state.taskCategories, taskCategory] : [taskCategory];
        dispatch(categoryActions.getTaskCategoriesSuccessAction(newTaskCategories));
    }

    const postExecutorCategory = (categoryId: string, userId: number) => {
        dispatch(categoryActions.postExecutorCategoryRequestAction());
        const endpoint = "api/services/app/ExecutorCategory/Create";
        instance.post(endpoint, { categoryId, taskId: userId })
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(categoryActions.postExecutorCategorySuccessAction());
                    messageApi.success("Task added to category successfully");
                    addToTaskCategories(response.data.result);
                } else {
                    dispatch(categoryActions.postExecutorCategoryErrorAction())
                }
            })
            .catch(err =>
                dispatch(categoryActions.postExecutorCategoryErrorAction())
            );
    }
    const getExecutorCategories = () => {
        dispatch(categoryActions.getExecutorCategoriesRequestAction());
        const endpoint = "api/services/app/ExecutorCategory/GetAll";
        instance.get(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(categoryActions.getExecutorCategoriesSuccessAction(response.data.result.items))
                } else {
                    dispatch(categoryActions.getExecutorCategoriesErrorAction())
                }
            })
            .catch(err =>
                dispatch(categoryActions.getExecutorCategoriesErrorAction())
            );
    }
    const deleteExecutorCategory = (id: string) => {
        dispatch(categoryActions.deleteExecutorCategoryRequestAction());
        const endpoint = "api/services/app/ExecutorCategory/Delete?id=" + id;
        instance.delete(endpoint)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    dispatch(categoryActions.deleteExecutorCategorySuccessAction(id));
                    messageApi.success("Task removed from category successfully");
                } else {
                    dispatch(categoryActions.deleteExecutorCategoryErrorAction())
                }
            })
            .catch(err =>
                dispatch(categoryActions.deleteExecutorCategoryErrorAction())
            );
    }
    const appendExecutorCategories = (executorCategory: IExecutorCategory) => {
        const newExecutorCategories = state.executorCategories ? [...state.executorCategories, executorCategory] : [executorCategory];
        dispatch(categoryActions.getExecutorCategoriesSuccessAction(newExecutorCategories));
    }
    const getLocalCategory = (id?: string) => {
        if (!id) return;
        const tasks = state.categories;
        return tasks?.find(t => t.id === id);
    }
    const getLocalTaskCategories = (id?: string) => {
        if (!id) return;
        const bridges = state.taskCategories;
        return bridges?.filter(task => task.taskId === id);
    }

    return (
        <CategoriesStateContext.Provider value={{ ...state }}>
            <CategoryActionsContext.Provider value={{
                getCategory,
                postCategory,
                postTaskCategory,
                putCategory,
                getCategories,
                getMyCategories,
                getTaskCategories,
                postExecutorCategory,
                getExecutorCategories,
                postMyCategories,
                deleteExecutorCategory,
                getLocalCategory,
                getLocalTaskCategories
            }}>
                {contextHolder}
                {children}
            </CategoryActionsContext.Provider>
        </CategoriesStateContext.Provider>
    );
}

export default CategoryProvider;

export const useCategoriesState = () => {
    const context = React.useContext(CategoriesStateContext);
    if (!context) {
        throw new Error("useCategoriestate must be used as a descendant within a CategoryProvider");
    }
    return context;
}

export const useCategoryActions = () => {
    const context = React.useContext(CategoryActionsContext);
    if (!context) {
        throw new Error("useCategoryActions must be used as a descendant within a CategoryProvider");
    }
    return context;
}
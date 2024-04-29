"use client";

import { getAxiosInstace } from "@/utils";
import React, { useEffect, useMemo, useReducer } from "react";
import { useAuthState } from "../authProvider";
import * as categoryActions from "./actions";
import categoryReducer from "./reducer";
import { ICategory, CategoryActionsContext, CategoriestateContext, CategoriestateContext_Default, ITaskCategory } from "./context";
import { message } from "antd";

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { loginObj } = useAuthState();
    const [state, dispatch] = useReducer(categoryReducer, CategoriestateContext_Default);

    const instance = useMemo(() => {
        const accessToken = loginObj?.accessToken;
        if (accessToken) {
            return getAxiosInstace(accessToken)
        } else {
            return getAxiosInstace("");
        }        
    }, [loginObj]);

    useEffect(() => {
        if (loginObj?.accessToken) {
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
                    console.log(response);
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
        dispatch(categoryActions.getCategoriesRequestAction());
        const endpoint = "api/services/app/Category/GetMyCategories";
        instance.get(endpoint)
                .then(response => {
                    if (response.status > 199 && response.status < 300) {
                        dispatch(categoryActions.getCategoriesSuccessAction(response.data.result));
                    } else {
                        dispatch(categoryActions.getCategoriesErrorAction())
                    }
                })
                .catch(err => 
                    dispatch(categoryActions.getCategoriesErrorAction())
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
                    console.log(response);
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


    return (
        <CategoriestateContext.Provider value={{ ...state }}>
            <CategoryActionsContext.Provider value={{
                getCategory,
                postCategory,
                postTaskCategory,
                putCategory,
                getCategories,
                getMyCategories,
                getTaskCategories
            }}>
                {contextHolder}
                {children}
            </CategoryActionsContext.Provider>
        </CategoriestateContext.Provider>
    );
}

export default CategoryProvider;

export const useCategoriestate = () => {
    const context = React.useContext(CategoriestateContext);
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
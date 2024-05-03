import { createAction } from "redux-actions";
import { ICategoriesStateContext, ICategory, IExecutorCategory, ITaskCategory } from "./context";

export const CategoryActionEnums = {
    GetCategoryRequest: "GET_CATEGORY_REQUEST",
    GetCategoriesuccess: "GET_CATEGORY_SUCCESS",
    GetCategoryError: "GET_CATEGORY_ERROR",

    PostCategoryRequest: "POST_CATEGORY_REQUEST",
    PostCategoriesuccess: "POST_CATEGORY_SUCCESS",
    PostCategoryError: "POST_CATEGORY_ERROR",

    PostTaskCategoryRequest: "POST_TASK_CATEGORY_REQUEST",
    PostTaskCategorySuccess: "POST_TASK_CATEGORY_SUCCESS",
    PostTaskCategoryError: "POST_TASK_CATEGORY_ERROR",

    PostExecutorCategoryRequest: "POST_EXECUTOR_CATEGORY_REQUEST",
    PostExecutorCategorySuccess: "POST_EXECUTOR_CATEGORY_SUCCESS",
    PostExecutorCategoryError: "POST_EXECUTOR_CATEGORY_ERROR",

    PutCategoryRequest: "PUT_CATEGORY_REQUEST",
    PutCategoriesuccess: "PUT_CATEGORY_SUCCESS",
    PutCategoryError: "PUT_CATEGORY_ERROR",

    GetCategoriesRequest: "GET_CATEGORIES_REQUEST",
    GetCategoriesSuccess: "GET_CATEGORIES_SUCCESS",
    GetCategoriesError: "GET_CATEGORIES_ERROR",

    GetTaskCategoriesRequest: "GET_TASK_CATEGORIES_REQUEST",
    GetTaskCategoriesSuccess: "GET_TASK_CATEGORIES_SUCCESS",
    GetTaskCategoriesError: "GET_TASK_CATEGORIES_ERROR",

    GetExecutorCategoriesRequest: "GET_EXECUTOR_CATEGORIES_REQUEST",
    GetExecutorCategoriesSuccess: "GET_EXECUTOR_CATEGORIES_SUCCESS",
    GetExecutorCategoriesError: "GET_EXECUTOR_CATEGORIES_ERROR",

    GetMyExecutorCategoriesRequest: "GET_MY_EXECUTOR_CATEGORIES_REQUEST",
    GetMyExecutorCategoriesSuccess: "GET_MY_EXECUTOR_CATEGORIES_SUCCESS",
    GetMyExecutorCategoriesError: "GET_MY_EXECUTOR_CATEGORIES_ERROR",

    PostMyExecutorCategoriesRequest: "POST_MY_EXECUTOR_CATEGORIES_REQUEST",
    PostMyExecutorCategoriesSuccess: "POST_MY_EXECUTOR_CATEGORIES_SUCCESS",
    PostMyExecutorCategoriesError: "POST_MY_EXECUTOR_CATEGORIES_ERROR",

    DeleteExecutorCategoryRequest: "DELETE_EXECUTOR_CATEGORY_REQUEST",  
    DeleteExecutorCategorySuccess: "DELETE_EXECUTOR_CATEGORY_SUCCESS",
    DeleteExecutorCategoryError: "DELETE_EXECUTOR_CATEGORY_ERROR",
}

export const getCategoryRequestAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.GetCategoryRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, category: undefined })
);

export const getCategoriesuccessAction = createAction<ICategoriesStateContext, ICategory>(
    CategoryActionEnums.GetCategoriesuccess,
    (category: ICategory) => ({ isPending: false, isSuccess: true, isError: false, category })
);

export const getCategoryErrorAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.GetCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true, category: undefined })
);

export const postCategoryRequestAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PostCategoryRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, category: undefined })
);
export const postCategoriesuccessAction = createAction<ICategoriesStateContext, ICategory>(
    CategoryActionEnums.PostCategoriesuccess,
    (category: ICategory) => ({ isPending: false, isSuccess: true, isError: false, category })
);
export const postCategoryErrorAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PostCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true, category: undefined })
);

export const postTaskCategoryRequestAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PostTaskCategoryRequest,
    () => ({ isPending: true, isSuccess: false, isError: false })
);
export const postTaskCategorySuccessAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PostTaskCategorySuccess,
    () => ({ isPending: false, isSuccess: true, isError: false })
);
export const postTaskCategoryErrorAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PostTaskCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const postExecutorCategoryRequestAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PostExecutorCategoryRequest,
    () => ({ isPending: true, isSuccess: false, isError: false })
);
export const postExecutorCategorySuccessAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PostExecutorCategorySuccess,
    () => ({ isPending: false, isSuccess: true, isError: false })
);
export const postExecutorCategoryErrorAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PostExecutorCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const putCategoryRequestAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PutCategoryRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, category: undefined })
);

export const putCategoriesuccessAction = createAction<ICategoriesStateContext, ICategory>(
    CategoryActionEnums.PutCategoriesuccess,
    (category: ICategory) => ({ isPending: false, isSuccess: true, isError: false, category })
);

export const putCategoryErrorAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PutCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true, category: undefined })
);

export const getCategoriesRequestAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.GetCategoriesRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, categories: undefined })
);
export const getCategoriesSuccessAction = createAction<ICategoriesStateContext, ICategory[]>(
    CategoryActionEnums.GetCategoriesSuccess,
    (categories: ICategory[]) => ({ isPending: false, isSuccess: true, isError: false, categories })
);
export const getCategoriesErrorAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.GetCategoriesError,
    () => ({ isPending: false, isSuccess: false, isError: true, category: undefined })
);

export const getTaskCategoriesRequestAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.GetTaskCategoriesRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, taskCategories: undefined })
);
export const getTaskCategoriesSuccessAction = createAction<ICategoriesStateContext, ITaskCategory[]>(
    CategoryActionEnums.GetTaskCategoriesSuccess,
    (taskCategories: ITaskCategory[]) => ({ isPending: false, isSuccess: true, isError: false, taskCategories })
);
export const getTaskCategoriesErrorAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.GetTaskCategoriesError,
    () => ({ isPending: false, isSuccess: false, isError: true, taskCategories: undefined })
);

export const getExecutorCategoriesRequestAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.GetExecutorCategoriesRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, executorCategories: undefined })
);
export const getExecutorCategoriesSuccessAction = createAction<ICategoriesStateContext, IExecutorCategory[]>(
    CategoryActionEnums.GetExecutorCategoriesSuccess,
    (executorCategories: IExecutorCategory[]) => ({ isPending: false, isSuccess: true, isError: false, executorCategories })
);
export const getExecutorCategoriesErrorAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.GetExecutorCategoriesError,
    () => ({ isPending: false, isSuccess: false, isError: true, executorCategories: undefined })
);

export const getMyExecutorCategoriesRequestAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.GetMyExecutorCategoriesRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, executorCategories: undefined })
);
export const getMyExecutorCategoriesSuccessAction = createAction<ICategoriesStateContext, IExecutorCategory[]>(
    CategoryActionEnums.GetMyExecutorCategoriesSuccess,
    (myExecutorCategories: IExecutorCategory[]) => ({ isPending: false, isSuccess: true, isError: false, myExecutorCategories })
);
export const getMyExecutorCategoriesErrorAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.GetMyExecutorCategoriesError,
    () => ({ isPending: false, isSuccess: false, isError: true, executorCategories: undefined })
);

export const postMyExecutorCategoriesRequestAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PostMyExecutorCategoriesRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, myExecutorCategories: undefined })
);
export const postMyExecutorCategoriesSuccessAction = createAction<ICategoriesStateContext, IExecutorCategory[]>(
    CategoryActionEnums.PostMyExecutorCategoriesSuccess,
    (myExecutorCategories: IExecutorCategory[]) => ({ isPending: false, isSuccess: true, isError: false, myExecutorCategories })
);
export const postMyExecutorCategoriesErrorAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.PostMyExecutorCategoriesError,
    () => ({ isPending: false, isSuccess: false, isError: true, myExecutorCategories: undefined })
);

export const deleteExecutorCategoryRequestAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.DeleteExecutorCategoryRequest,
    () => ({ isPending: true, isSuccess: false, isError: false })
);
export const deleteExecutorCategorySuccessAction = createAction<ICategoriesStateContext, string>(
    CategoryActionEnums.DeleteExecutorCategorySuccess,
    (deletedId: string) => ({ isPending: false, isSuccess: true, isError: false, deletedId })
);
export const deleteExecutorCategoryErrorAction = createAction<ICategoriesStateContext>(
    CategoryActionEnums.DeleteExecutorCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);
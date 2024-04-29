import { createAction } from "redux-actions";
import { ICategoriestateContext, ICategory, ITaskCategory } from "./context";

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

    PutCategoryRequest: "PUT_CATEGORY_REQUEST",
    PutCategoriesuccess: "PUT_CATEGORY_SUCCESS",
    PutCategoryError: "PUT_CATEGORY_ERROR",

    GetCategoriesRequest: "GET_CATEGORIES_REQUEST",
    GetCategoriesSuccess: "GET_CATEGORIES_SUCCESS",
    GetCategoriesError: "GET_CATEGORIES_ERROR",

    GetTaskCategoriesRequest: "GET_TASK_CATEGORIES_REQUEST",
    GetTaskCategoriesSuccess: "GET_TASK_CATEGORIES_SUCCESS",
    GetTaskCategoriesError: "GET_TASK_CATEGORIES_ERROR"
}

export const getCategoryRequestAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.GetCategoryRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, category: undefined })
);

export const getCategoriesuccessAction = createAction<ICategoriestateContext, ICategory>(
    CategoryActionEnums.GetCategoriesuccess,
    (category: ICategory) => ({ isPending: false, isSuccess: true, isError: false, category })
);

export const getCategoryErrorAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.GetCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true, category: undefined })
);

export const postCategoryRequestAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.PostCategoryRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, category: undefined })
);
export const postCategoriesuccessAction = createAction<ICategoriestateContext, ICategory>(
    CategoryActionEnums.PostCategoriesuccess,
    (category: ICategory) => ({ isPending: false, isSuccess: true, isError: false, category })
);
export const postCategoryErrorAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.PostCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true, category: undefined })
);

export const postTaskCategoryRequestAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.PostTaskCategoryRequest,
    () => ({ isPending: true, isSuccess: false, isError: false })
);
export const postTaskCategorySuccessAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.PostTaskCategorySuccess,
    () => ({ isPending: false, isSuccess: true, isError: false })
);
export const postTaskCategoryErrorAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.PostTaskCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const putCategoryRequestAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.PutCategoryRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, category: undefined })
);

export const putCategoriesuccessAction = createAction<ICategoriestateContext, ICategory>(
    CategoryActionEnums.PutCategoriesuccess,
    (category: ICategory) => ({ isPending: false, isSuccess: true, isError: false, category })
);

export const putCategoryErrorAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.PutCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true, category: undefined })
);

export const getCategoriesRequestAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.GetCategoriesRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, categories: undefined })
);
export const getCategoriesSuccessAction = createAction<ICategoriestateContext, ICategory[]>(
    CategoryActionEnums.GetCategoriesSuccess,
    (categories: ICategory[]) => ({ isPending: false, isSuccess: true, isError: false, categories })
);
export const getCategoriesErrorAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.GetCategoriesError,
    () => ({ isPending: false, isSuccess: false, isError: true, category: undefined })
);

export const getTaskCategoriesRequestAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.GetTaskCategoriesRequest,
    () => ({ isPending: true, isSuccess: false, isError: false, taskCategories: undefined })
);
export const getTaskCategoriesSuccessAction = createAction<ICategoriestateContext, ITaskCategory[]>(
    CategoryActionEnums.GetTaskCategoriesSuccess,
    (taskCategories: ITaskCategory[]) => ({ isPending: false, isSuccess: true, isError: false, taskCategories })
);
export const getTaskCategoriesErrorAction = createAction<ICategoriestateContext>(
    CategoryActionEnums.GetTaskCategoriesError,
    () => ({ isPending: false, isSuccess: false, isError: true, taskCategories: undefined })
);

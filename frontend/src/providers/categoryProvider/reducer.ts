import { handleActions } from 'redux-actions';
import { CategoryActionEnums } from './actions';
import { CategoriesStateContext_Default } from './context';

const categoryReducer = handleActions(
    {
        [CategoryActionEnums.GetCategoryRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, category: undefined };
        },
        [CategoryActionEnums.GetCategoriesuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [CategoryActionEnums.GetCategoryError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, category: undefined };
        },

        [CategoryActionEnums.PostCategoryRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, category: undefined };
        },
        [CategoryActionEnums.PostCategoriesuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [CategoryActionEnums.PostCategoryError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, category: undefined };
        },

        [CategoryActionEnums.PutCategoryRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false };
        },
        [CategoryActionEnums.PutCategoriesuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [CategoryActionEnums.PutCategoryError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, category: undefined };
        },
        
        [CategoryActionEnums.GetCategoriesRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, categories: undefined };
        },
        [CategoryActionEnums.GetCategoriesSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [CategoryActionEnums.GetCategoriesError]: (state, action) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, categories: undefined };
        },

        [CategoryActionEnums.GetTaskCategoriesRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, taskCategories: undefined };
        },
        [CategoryActionEnums.GetTaskCategoriesSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [CategoryActionEnums.GetTaskCategoriesError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, taskCategories: undefined };
        },

        [CategoryActionEnums.GetExecutorCategoriesRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, executorCategories: undefined };
        },
        [CategoryActionEnums.GetExecutorCategoriesSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [CategoryActionEnums.GetExecutorCategoriesError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, executorCategories: undefined };
        },

        [CategoryActionEnums.PostExecutorCategoryRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, executorCategories: undefined };
        },
        [CategoryActionEnums.PostExecutorCategorySuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [CategoryActionEnums.PostExecutorCategoryError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, executorCategories: undefined };
        },

        [CategoryActionEnums.GetMyExecutorCategoriesRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false, myExecutorCategories: undefined };
        },
        [CategoryActionEnums.GetMyExecutorCategoriesSuccess]: (state, action) => {
            return { ...state, ...action.payload };
        },
        [CategoryActionEnums.GetMyExecutorCategoriesError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true, myExecutorCategories: undefined };
        },

        [CategoryActionEnums.PostMyExecutorCategoriesRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false };
        },
        [CategoryActionEnums.PostMyExecutorCategoriesSuccess]: (state, action) => {
            let executorCategories = state.myExecutorCategories || [];
            executorCategories = executorCategories.concat(action.payload.myExecutorCategories || []);
            return { ...state, ...action.payload, myExecutorCategories: executorCategories };
        },
        [CategoryActionEnums.PostMyExecutorCategoriesError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true };
        },

        [CategoryActionEnums.DeleteExecutorCategoryRequest]: (state) => {
            return { ...state, isPending: true, isSuccess: false, isError: false };
        },
        [CategoryActionEnums.DeleteExecutorCategorySuccess]: (state, action) => {
            let executorCategories = state.myExecutorCategories;
            if (executorCategories) {
                executorCategories = executorCategories.filter((executorCategory) => executorCategory.id !== (action.payload?.deletedId || ""));
            }
            return { ...state, ...action.payload, myExecutorCategories: executorCategories };
        },  
        [CategoryActionEnums.DeleteExecutorCategoryError]: (state) => {
            return { ...state, isPending: false, isSuccess: false, isError: true };
        },

        [CategoryActionEnums.ClearCategoryState]: (state) => {
            return { ...CategoriesStateContext_Default };
        }
    },
    CategoriesStateContext_Default
);

export default categoryReducer;

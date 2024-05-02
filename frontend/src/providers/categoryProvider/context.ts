import { createContext } from "react";

export interface ICategory {
    id?: string;
    title: string;
    description: string;
}
export interface ITaskCategory {
    id?: string;
    taskId: string;
    categoryId: string;
}
export interface IExecutorCategory {
    id?: string;
    userId: number;
    categoryId: string;
}
export interface ICategoriesStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    category?: ICategory;
    categories?: ICategory[];
    taskCategories?: ITaskCategory[];
    executorCategories?: IExecutorCategory[];
}
export const CategoriesStateContext_Default: ICategoriesStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    category: undefined,
    categories: undefined,
    taskCategories: undefined,
    executorCategories: undefined,
}

export interface ICategoryActionsContext {
    getCategory: (id: string) => void;
    postCategory: (category: ICategory) => void;
    postTaskCategory: (categoryId: string, taskId: string) => void;
    postExecutorCategory: (categoryId: string, userId: number) => void;
    putCategory: (category: ICategory) => void;
    getCategories: () => void;
    getTaskCategories: () => void;
    getMyCategories: () => void;
    getExecutorCategories: () => void;
}
export const CategoryActionsContext_Default: ICategoryActionsContext = {
    getCategory: () => {},
    postCategory: () => {},
    postTaskCategory: () => {},
    postExecutorCategory: () => {},
    putCategory: () => {},
    getCategories: () => {},
    getTaskCategories: () => {},
    getMyCategories: () => {},
    getExecutorCategories: () => {},
}

const CategoriesStateContext = createContext<ICategoriesStateContext>(CategoriesStateContext_Default);
const CategoryActionsContext = createContext<ICategoryActionsContext>(CategoryActionsContext_Default);

export {
    CategoryActionsContext, CategoriesStateContext
};

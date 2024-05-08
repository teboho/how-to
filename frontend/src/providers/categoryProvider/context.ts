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
    executorId: string;
    categoryId: string;
}
export interface ICategoriesStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    category?: ICategory;
    categories?: ICategory[];

    taskCategories?: ITaskCategory[];

    deletedId?: string;
    executorCategories?: IExecutorCategory[];
    executorCategory?: IExecutorCategory;
    myExecutorCategories?: IExecutorCategory[];
}
export const CategoriesStateContext_Default: ICategoriesStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    category: undefined,
    categories: undefined,

    taskCategories: undefined,

    executorCategories: undefined,
    executorCategory: undefined,
    myExecutorCategories: undefined,
}

export interface ICategoryActionsContext {
    getCategory: (id: string) => void;
    postCategory: (category: ICategory) => void;
    postTaskCategory: (categoryId: string, taskId: string) => void;
    postExecutorCategory: (categoryId: string, userId: number) => void;
    putCategory: (category: ICategory) => void;
    getCategories: () => void;
    getTaskCategories: () => void;
    /** Get categories for the current user. Those executor category bridge records. */
    getMyCategories: () => void;
    getExecutorCategories: () => void;
    /** Post categories for the current user. Those executor category bridge records. */
    postMyCategories: (newExeCats: {executorCategories: IExecutorCategory[]}) => void;
    /** Delete the executor category bridge record. */
    deleteExecutorCategory: (id: string) => void;
    /** Read a specific category from the state */
    getLocalCategory: (id?: string) => ICategory | undefined;
    getLocalTaskCategories: (id?: string) => ITaskCategory[] | undefined;
    getLocalExecutorCategories: (id?: string) => IExecutorCategory[] | undefined;
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
    postMyCategories: () => {},
    deleteExecutorCategory: () => {},
    getLocalCategory: () => undefined,
    getLocalTaskCategories: () => undefined,
    getLocalExecutorCategories: () => undefined,
}

const CategoriesStateContext = createContext<ICategoriesStateContext>(CategoriesStateContext_Default);
const CategoryActionsContext = createContext<ICategoryActionsContext>(CategoryActionsContext_Default);

export {
    CategoryActionsContext, CategoriesStateContext
};

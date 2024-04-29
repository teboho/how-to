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
export interface ICategoriestateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    category?: ICategory;
    categories?: ICategory[];
    taskCategories?: ITaskCategory[];
}
export const CategoriestateContext_Default: ICategoriestateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    category: undefined,
    categories: undefined,
    taskCategories: undefined
}

export interface ICategoryActionsContext {
    getCategory: (id: string) => void;
    postCategory: (category: ICategory) => void;
    postTaskCategory: (categoryId: string, taskId: string) => void;
    putCategory: (category: ICategory) => void;
    getCategories: () => void;
    getTaskCategories: () => void;
    getMyCategories: () => void;
}
export const CategoryActionsContext_Default: ICategoryActionsContext = {
    getCategory: () => {},
    postCategory: () => {},
    postTaskCategory: () => {},
    putCategory: () => {},
    getCategories: () => {},
    getTaskCategories: () => {},
    getMyCategories: () => {},
}

const CategoriestateContext = createContext<ICategoriestateContext>(CategoriestateContext_Default);
const CategoryActionsContext = createContext<ICategoryActionsContext>(CategoryActionsContext_Default);

export {
    CategoryActionsContext, CategoriestateContext
};

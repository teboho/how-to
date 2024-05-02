import { createContext } from 'react';
import { IProfile } from '../profileProvider/context';
import { IStoredFile } from '../storedFileProvider/context';

export interface IPortfolio {
    id?: string;

    profileId: string;
    storedFileId: string;
    itemType: number;

    creationTime: string;
    creatorUserId: number;  
    isDeleted: boolean;
    deleterUserId: number;
    deletionTime: string;   
    lastModificationTime: string;
    lastModifierUserId: number;
}

export interface IPortfolioWithStoredFile {
    profileId: string;
    profile: IProfile;
    storedFileId: string;
    storedFileModel: IStoredFile;
}

export interface PortfolioStateContext {
    portfolios?: IPortfolio[];
    portfolio?: IPortfolio;
    portfoliosWithStoredFiles?: IPortfolioWithStoredFile[];
    portfolioWithStoredFile?: IPortfolioWithStoredFile;
    isError: boolean;
    isPending: boolean;
    isSuccess: boolean;
}

export const PortfolioStateContext_Default: PortfolioStateContext = {
    portfolios: [],
    portfolio: undefined,
    portfoliosWithStoredFiles: [],
    portfolioWithStoredFile: undefined,
    isError: false,
    isPending: false,
    isSuccess: false
}

export interface PortfolioActionContext {
    getPortfolio: (id: string) => void;
    getPortfolios: () => void;
    getMyPortfolio: () => void;
    putPortfolio: (file: IPortfolio) => void;
    deletePortfolio: (id: string) => void;
    postPortfolio: (file: IPortfolio) => void;
    upload: (formData: FormData) => Promise<void>;
}

export const PortfolioActionContext_Default: PortfolioActionContext = {
    getPortfolio: (id: string) => {},
    getPortfolios: () => {},
    getMyPortfolio: () => {},
    putPortfolio: (file: IPortfolio) => {},
    deletePortfolio: (id: string) => {},
    postPortfolio: (file: IPortfolio) => {},
    upload: async (formData) => {},
}

export const PortfolioStateContext = createContext<PortfolioStateContext>(PortfolioStateContext_Default);
export const PortfolioActionContext = createContext<PortfolioActionContext>(PortfolioActionContext_Default);

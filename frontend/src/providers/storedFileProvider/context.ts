import { createContext } from 'react';

/** metadata thereof */
export interface IStoredFile {
    id: string;
    fileName: string;
    fileType: string;
    file: File;
    creationTime: string;
    creatorUserId: number;  
    isDeleted: boolean;
    deleterUserId: number;
    deletionTime: string;   
    lastModificationTime: string;
    lastModifierUserId: number;
}

export interface StoredFileStateContext_State {
    storedFiles?: IStoredFile[];
    storedFile?: IStoredFile;
    isError: boolean;
    isPending: boolean;
    isSuccess: boolean;
}

export const StoredFileStateContext_InitState: StoredFileStateContext_State = {
    storedFiles: [],
    storedFile: undefined,
    isError: false,
    isPending: false,
    isSuccess: false
}

export interface StoredFileActionContext_Actions {
    getStoredFile: (id: string) => void;
    getStoredFiles: () => void;
    getMyStoredFiles: () => void;
    putStoredFile: (file: IStoredFile) => void;
    deleteStoredFile: (id: string) => void;
    postStoredFile: (file: IStoredFile) => void;
    upload: (formData: FormData) => Promise<void>;
    uploadProfilePicture: (formData: FormData) => Promise<void>;
    getLocal: (id: string) => IStoredFile | undefined;
}

export const StoredFileActionContext_DefaultActions: StoredFileActionContext_Actions = {
    getStoredFile: (id: string) => {},
    getStoredFiles: () => {},
    getMyStoredFiles: () => {},
    putStoredFile: (file: IStoredFile) => {},
    deleteStoredFile: (id: string) => {},
    postStoredFile: (file: IStoredFile) => {},
    upload: async (formData) => {},
    uploadProfilePicture: async (formData) => {},
    getLocal: (id: string) => undefined
}

export const StoredFileStateContext = createContext<StoredFileStateContext_State>(StoredFileStateContext_InitState);
export const StoredFileActionContext = createContext<StoredFileActionContext_Actions>(StoredFileActionContext_DefaultActions);

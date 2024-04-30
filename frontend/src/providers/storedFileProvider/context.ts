import { createContext } from 'react';

/** metadata thereof */
export interface StoredFile {
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
    storedFiles?: StoredFile[];
    storedFile?: StoredFile;
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
    putStoredFile: (file: StoredFile) => void;
    deleteStoredFile: (id: string) => void;
    postStoredFile: (file: StoredFile) => void;
    upload: (formData: FormData) => Promise<void>;
    uploadProfilePicture: (formData: FormData) => Promise<void>;
}

export const StoredFileActionContext_DefaultActions: StoredFileActionContext_Actions = {
    getStoredFile: (id: string) => {},
    getStoredFiles: () => {},
    putStoredFile: (file: StoredFile) => {},
    deleteStoredFile: (id: string) => {},
    postStoredFile: (file: StoredFile) => {},
    upload: async (formData) => {},
    uploadProfilePicture: async (formData) => {}
}

export const StoredFileStateContext = createContext<StoredFileStateContext_State>(StoredFileStateContext_InitState);
export const StoredFileActionContext = createContext<StoredFileActionContext_Actions>(StoredFileActionContext_DefaultActions);

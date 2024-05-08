import { createContext } from 'react';
import { IProfile } from '../profileProvider/context';
import { IStoredFile } from '../storedFileProvider/context';

export interface ISupportingFile {
    id?: string;

    taskId?: string;
    storedFileId?: string;
    itemType: number;
    content: string;

    creationTime: string;
    creatorUserId: number;  
    isDeleted: boolean;
    deleterUserId: number;
    deletionTime: string;   
    lastModificationTime: string;
    lastModifierUserId: number;
}

export interface ISupportingFileWithStoredFile {
    profileId: string;
    profile: IProfile;
    storedFileId: string;
    storedFileModel: IStoredFile;
}

export interface SupportingFileStateContext {
    supportingFiles?: ISupportingFile[];
    supportingFile?: ISupportingFile;
    isError: boolean;
    isPending: boolean;
    isSuccess: boolean;
}

export const SupportingFileStateContext_Default: SupportingFileStateContext = {
    supportingFiles: undefined,
    supportingFile: undefined,
    isError: false,
    isPending: false,
    isSuccess: false
}

export interface SupportingFileActionContext {
    getSupportingFile: (id: string) => void;
    getSupportingFiles: () => void;
    getMySupportingFile: () => void;
    getAllSupportingFiles: () => void;
    putSupportingFile: (file: ISupportingFile) => void;
    deleteSupportingFile: (id: string) => void;
    postSupportingFile: (file: ISupportingFile) => void;
    upload: (formData: FormData) => Promise<void>;
    getByTaskId: (taskId: string) => void;
}

export const SupportingFileActionContext_Default: SupportingFileActionContext = {
    getSupportingFile: (id: string) => {},
    getSupportingFiles: () => {},
    getMySupportingFile: () => {},
    getAllSupportingFiles: () => {},
    putSupportingFile: (file: ISupportingFile) => {},
    deleteSupportingFile: (id: string) => {},
    postSupportingFile: (file: ISupportingFile) => {},
    upload: async (formData) => {},
    getByTaskId: (taskId: string) => {}
}

export const SupportingFileStateContext = createContext<SupportingFileStateContext>(SupportingFileStateContext_Default);
export const SupportingFileActionContext = createContext<SupportingFileActionContext>(SupportingFileActionContext_Default);

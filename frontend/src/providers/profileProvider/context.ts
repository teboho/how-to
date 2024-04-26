import { createContext } from "react";
import { Guid } from "typescript-guid";


export interface IProfile {
    id?: Guid;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    isDeleted?: boolean;
    deleterUserId?: number;
    deletionTime?: string;
    identityNo: string;
    isVerified: boolean;
    photoId?: Guid;
}

export interface IProfileStateContext {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    profile?: IProfile;
    profiles?: IProfile[];
}
export const ProfileStateContext_Default: IProfileStateContext = {
    isPending: false,
    isError: false,
    isSuccess: false,
    profile: undefined,
    profiles: undefined
}

export interface IProfileActionsContext {
    getProfile: () => void;
    postProfile: (profile: IProfile) => void;
    putProfile: (profile: IProfile) => void;
    deleteProfile: (profile: IProfile) => void;
    getProfiles: () => void;
}
export const ProfileActionsContext_Default: IProfileActionsContext = {
    getProfile: () => {},
    postProfile: () => {},
    putProfile: () => {},
    deleteProfile: () => {},
    getProfiles: () => {},
}

const ProfileStateContext = createContext<IProfileStateContext>(ProfileStateContext_Default);
const ProfileActionsContext = createContext<IProfileActionsContext>(ProfileActionsContext_Default);

export {
    ProfileStateContext,
    ProfileActionsContext
}
import { createContext } from "react";

export interface IProfile {
    id?: string;
    creationTime?: string;
    creatorUserId?: number;
    lastModificationTime?: string;
    lastModifierUserId?: number;
    isDeleted?: boolean;
    deleterUserId?: number;
    deletionTime?: string;
    identityNo: string;
    username?: string;
    bio?: string;
    isVerified?: boolean;
    storedFileId?: string;
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
    getProfileByUsername: (username: string) => void;
    getMyProfile: () => void;
    postProfile: (profile: IProfile) => void;
    putProfile: (profile: IProfile) => void;
    deleteProfile: (profile: IProfile) => void;
    getProfiles: () => void;
    getLocalProfile: (userId: number) => IProfile|undefined;
}
export const ProfileActionsContext_Default: IProfileActionsContext = {
    getProfile: () => {},
    getProfileByUsername: () => {},
    getMyProfile: () => {},
    postProfile: () => {},
    putProfile: () => {},
    deleteProfile: () => {},
    getProfiles: () => {},
    getLocalProfile: () => undefined
}

const ProfileStateContext = createContext<IProfileStateContext>(ProfileStateContext_Default);
const ProfileActionsContext = createContext<IProfileActionsContext>(ProfileActionsContext_Default);

export {
    ProfileActionsContext, ProfileStateContext
};

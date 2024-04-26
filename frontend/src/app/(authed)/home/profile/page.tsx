import { useAuthActions, useAuthState } from "@/providers/authProvider";
import { useProfileActions, useProfileState } from "@/providers/profileProvider";

const Page = (): React.ReactNode => {
    const {  } = useAuthState();
    const {  } = useAuthActions();
    const { } = useProfileState();
    const { } = useProfileActions();

    return (
        <>
            <h1>Profile</h1>
            {/* Editable paragraph for id number */}
            <p>Identity No: 12345678901</p>
            {/* Editable paragraph for verification status */}
            <p>Verified: Yes</p>
            {/* uplaod photo */}
            <input type="file" />
            {/* submit button */}
        </>
    );
};

export default Page;
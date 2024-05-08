"use client";

import withAuth from "@/hocs/withAuth";

const Page = (): React.ReactNode => {
    return (
        <h1>Support Home {`:)`}</h1>
    );
}

export default withAuth(Page);
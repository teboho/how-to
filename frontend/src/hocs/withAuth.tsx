"use client";
import { useAuthState } from '@/providers/authProvider';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

/**
 * This hoc will protect pages which need the user to be logged in
 * @param {*} WrappedComponent the component to protect
 */
const withAuth = (WrappedComponent: (({children}: {children: React.ReactNode}) => React.ReactNode) | React.FC): React.FC | ((props: {children: React.ReactNode}) => React.ReactNode) => {
    const WithAuth = (props: {children: React.ReactNode}): React.ReactNode => {
        // TODO: verify if the token is valid
        const { loginObj } = useAuthState();
        const router = useRouter();
        let token = useMemo(() => loginObj?.accessToken, []);
        token = useMemo(() => loginObj?.accessToken, [loginObj]);
        if (token === undefined || token === null) {
            router.push("/login")
        } 
        return <WrappedComponent {...props} />;
    } 
    return WithAuth;
};

export default withAuth;
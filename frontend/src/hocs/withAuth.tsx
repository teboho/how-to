"use client";
import React, { use, useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from '@/providers/authProvider';

/**
 * This hoc will protect pages which need the user to be logged in
 * @param {*} WrappedComponent the component to protect
 */
const withAuth = (WrappedComponent: (({children}: {children: React.ReactNode}) => React.ReactNode) | React.FC): React.FC | ((props: {children: React.ReactNode}) => React.ReactNode) => {
    const WithAuth = (props: {children: React.ReactNode}): React.ReactNode => {
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
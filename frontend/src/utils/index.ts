'use client';
import axios from 'axios';

export enum AbpTokenProperies {
    claims = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/",
    sub = "sub",
    jti = "jti",
    iat = "iat",
    nbf = "nbf",
    exp = "exp",
    iss = "iss",
    aud = "aud",
    nameidentifier = `${claims}nameidentifier`, // use
    name = `${claims}name`,
    emailaddress = `${claims}emailaddress`,
    securitystamp = "AspNet.Identity.SecurityStamp",
    role = `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
}

export const getApiUrl = () => {
    return process.env.REACT_APP_API_URL;
}

export const getAxiosInstace = (accessToken: string) => axios.create({
    baseURL: getApiUrl(),
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
    }
}); 
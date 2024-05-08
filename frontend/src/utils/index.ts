"use client";

import { match } from 'assert';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { globals } from 'typescript-guid'

export enum AbpTokenProperies {
    claims = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/",
    sub = "sub",
    jti = "jti",
    iat = "iat",
    nbf = "nbf",
    exp = "exp",
    iss = "iss",
    aud = "aud",
    nameidentifier = `${claims}nameidentifier`, // userId
    name = `${claims}name`,
    emailaddress = `${claims}emailaddress`,
    securitystamp = "AspNet.Identity.SecurityStamp",
    role = `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
}
    
export const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL;
}

export const getAxiosInstace = (accessToken: string) => axios.create({
    baseURL: getApiUrl(),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    }
}); 

export const getFormDataAxiosInstace = (accessToken: string) => axios.create({
    baseURL: getApiUrl(),
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
    }
}); 

export interface IDecodedToken {
    [AbpTokenProperies.claims]: string;
    sub: string;
    jti: string;
    iat: string;
    nbf: string;
    exp: string;
    iss: string;
    aud: string;
    [AbpTokenProperies.nameidentifier]: string;
    [AbpTokenProperies.name]: string;
    [AbpTokenProperies.emailaddress]: string;
    [AbpTokenProperies.securitystamp]: string;
    [AbpTokenProperies.role]: string;    
}

export const decodeToken = (accessToken: string): IDecodedToken => {
    return jwtDecode(accessToken);
}

export const getRole = (loginObj: any): string => {
    if (loginObj) {
        const decoded = decodeToken(loginObj.accessToken);
        return `${decoded[AbpTokenProperies.role]}`.toLocaleLowerCase();
    } 
    
    return "client";
}

// check if value is GUID
export const isGuid = (value: string): boolean => {
    if (value && value.length === 36) {
        return true;
    }
    return false;
}

export const imageURL_pre = process.env.NEXT_PUBLIC_API_IMAGE_URL_PRE;
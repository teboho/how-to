"use client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Spin } from "antd";

const Loading = () => {
    // return <Skeleton count={5}/>;
    return <Spin />
}

export default Loading;
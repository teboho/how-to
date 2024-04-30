"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Loading = () => {
    return (
        <SkeletonTheme highlightColor="grey">
            <Skeleton height={50} count={5} />
        </SkeletonTheme>
    );
}

export default Loading;
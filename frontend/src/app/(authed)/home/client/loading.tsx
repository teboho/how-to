"use client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Loading = () => {
    // skeleton for a table
    return (
        <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={50} count={5} />
        </SkeletonTheme>
    );
}

export default Loading;
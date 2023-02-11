import React from "react";
import Skeleton from "../SkeletonItem";

function ListSkeleton() {
  const arr = Array.from(Array(20).keys());
  return (
    <>
      {arr.map((item: any) => {
        return (
          <>
            <Skeleton />
          </>
        );
      })}
    </>
  );
}

export default ListSkeleton;

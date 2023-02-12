import React from "react";

function ModelPopup({ children, hanldle, state }: any) {
  return (
    <>
      <div
        onClick={hanldle}
        className="h-screen w-screen flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 z-[3]"
      >
        {children}
      </div>
    </>
  );
}

export default ModelPopup;

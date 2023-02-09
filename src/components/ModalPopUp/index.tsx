import React from "react";

function ModelPopup({ children }: any) {
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="max-w-[80%] max-h-[70%] bg-white">{children}</div>
      </div>
    </>
  );
}

export default ModelPopup;

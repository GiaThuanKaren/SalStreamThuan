import React from "react";
import { Footer, Header } from "src/components";
interface Props {
  children?: any;
}
function LayoutBasic({ children }: Props) {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center mx-auto xl:mx-[200px]">
        <div className=" w-full mt-10">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default LayoutBasic;

import React from "react";
import { JsxElement } from "typescript";
import { Footer, Header } from "../../components";
interface Props {
  children?: any;
}
function Mainlayout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center mx-[200px]">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Mainlayout;

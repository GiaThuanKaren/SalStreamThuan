import React from "react";
import { LayoutBasic } from "src/Layout";
import { ICON, IconBrand, IconSolid } from "src/utils/Icon";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useSession, signIn, signOut } from 'next-auth/react'
interface Item {
  Icon: JSX.Element;
  name: string;
}
function sigin() {
  const providers = [
    {
      name: "github",
      Icon: <ICON icon={IconBrand.faGithub as IconProp} />,
    },
    {
      name: "google",
      Icon: <ICON icon={IconBrand.faGoogle as IconProp}  />,
    },
  ];
  const handleOAuthSignIn = (provider:string) => () => signIn(provider)
  return (
    <>
      <LayoutBasic>
        <div className="h-screen w-full flex items-center justify-center">
          <div className="w-[50%] bg-white min-h-[50%]">
            <p className="text-2xl font-medium text-center my-3">Sign In</p>
            {providers.map((item: Item, index: number) => {
              return (
                <>

                  <div onClick={()=>{
                    signIn(item.name)
                  }} className="mt-2 flex items-center px-5 py-2 justify-center">
                    {item.Icon}

                    <p className="font-medium text-xl mx-4 capitalize">{item.name}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </LayoutBasic>
    </>
  );
}

export default sigin;

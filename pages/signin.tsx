import React from "react";
import { LayoutBasic } from "src/Layout";
import { ICON, IconBrand, IconSolid } from "src/utils/Icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
interface Item {
  Icon: JSX.Element;
  name: string;
  bgColor: string;
}
function Sigin() {
  const { push } = useRouter();
  const providers = [
    {
      name: "github",
      Icon: <ICON icon={IconBrand.faGithub as IconProp} />,
      bgColor: "bg-blue-400",
    },
    {
      name: "google",
      Icon: <ICON icon={IconBrand.faGoogle as IconProp} />,
      bgColor: "bg-red-300",
    },
    {
      name: "facebook",
      Icon: <ICON icon={IconBrand.faFacebook as IconProp} />,
      bgColor: "bg-blue-300",
    },
  ];
  const handleOAuthSignIn = async (provider: string) => {
    try {
      console.log("[PROVIDER]", provider);
      let result = await signIn(provider, {
        redirect: true,
        callbackUrl: "/",
      });
      console.log("After Login", result)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <LayoutBasic>
        <div className="h-screen w-full flex items-center justify-center">
          <div className="w-[90%] sm:w-[50%]  min-h-fit py-5">
            <p className="text-2xl font-medium text-center my-3 text-white">
              Sign In
            </p>
            {providers.map((item: Item, index: number) => {
              return (
                <>
                  <div
                    onClick={() => {
                      handleOAuthSignIn(item.name);
                    }}
                    className={
                      "mt-2 flex items-center px-5 py-2 justify-center " +
                      `${item.bgColor}`
                    }
                  >
                    {item.Icon}

                    <p className="font-medium text-xl mx-4 capitalize text-white">
                      {item.name}
                    </p>
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

export default Sigin;

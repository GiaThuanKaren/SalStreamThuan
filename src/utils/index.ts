import { ToastContainer, toast } from "react-toastify";
import React from "react"
import { Account, Profile, User } from "next-auth";
export const TabMovie = [
  {
    title: "Latest",
    href: "/movie/upcoming",
  },
  {
    title: "Most Viewed",
    href: "/movie/popular",
  },
  {
    title: "Most Rating",
    href: "/movie/top_rated",
  },
  {
    title: "Most Favortie",
    href: "/movie/now_playing",
  },
];

export const TabTv = [
  {
    title: "Latest",
    href: "/tv/airing_today",
  },
  {
    title: "Most Viewed",
    href: "/tv/popular",
  },
  {
    title: "Most Rating",
    href: "/tv/top_rated",
  },
  {
    title: "Most Favortie",
    href: "/tv/on_the_air",
  },
];

export const ShowToastify = (message: string) => {
  toast(message);
};

interface UserLocalInf {
  currentProvider?: string;
  currentAcccountId?: string;
}
export const UserStorageLocal = function () {
  
}


export const signInCallBack = async function ({ user, account, profile, email, credentials }: { account: Account; user: User; profile: Profile; email: any; credentials: any }) {

  try {

    console.log("Callback signIn", user, account)
    return {
      accountUser: account,
     
    };
  } catch (e) {

  }
}
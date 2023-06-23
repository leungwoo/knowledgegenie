"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
//import { useRouter } from "next/router";
import Loading from "./Loading";

const Profile = () => {
  const { data: session, status } = useSession();
  // const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  }

  return <div>Welcome {session?.user.name}</div>;
};

export default Profile;

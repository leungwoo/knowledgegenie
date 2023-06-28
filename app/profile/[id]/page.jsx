"use client";

import Profile from "@components/Profile";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Loading from "@components/Loading";

const UserProfile = ({ params }) => {
  const router = useRouter();
  const [usersPosts, setUsersPosts] = useState([]);
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUsersPosts(data);
      setLoading(false);
    };

    if (params.id) fetchPosts();
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Profile
        name={userName.toUpperCase()}
        desc={`Welcome to ${userName.toUpperCase()} KNOWLEDGE vortex see if you can find anything useful`}
        data={usersPosts}
      />
    </div>
  );
};

export default UserProfile;

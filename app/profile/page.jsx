"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

//import Loading from "@components/Loading";
import { useRouter } from "next/Navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    try {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });

      const filteredPosts = myPosts.filter((item) => item._id !== post._id);

      setMyPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Profile
        name={"My"}
        desc={
          "Your Personal KNOWLEDGE vortex is waiting on you to take ACTION!"
        }
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={myPosts}
      />
    </div>
  );
};

export default MyProfile;

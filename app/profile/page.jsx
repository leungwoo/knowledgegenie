"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Loading from "@components/Loading";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
      setLoading(false);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  if (loading) {
    return <Loading />;
  }

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

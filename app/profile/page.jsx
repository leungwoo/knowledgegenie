"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

//import Loading from "@components/Loading";
import { useRouter } from "next/Navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPost(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async () => {};

  return (
    <div>
      <Profile
        name={"My"}
        desc={
          "Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        }
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={post}
      />
    </div>
  );
};

export default MyProfile;

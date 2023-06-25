"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@components/Loading";

import Form from "@components/Form";

const CreatePrompt = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    tag: "",
    prompt: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault(); //reduces reloades
    setSubmitting(true);
    //create first prompt
    //pass all data from frontend to api POST request
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session.user.id,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return <Loading />;
  }
  if (!session) {
    return router.push("/");
  }
  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  );
};

export default CreatePrompt;

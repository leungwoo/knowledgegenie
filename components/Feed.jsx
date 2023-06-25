"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Loading from "./Loading";

const Feed = () => {
  const [searchText, setSearchText] = useState();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const PromptCardList = ({ postData, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {postData.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  //fetch post form created GET api route
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt", { next: { revalidate: 1 } });
        const data = await res.json();
        if (!data) {
          throw new Error("Failed to fetch data");
        }
        setPost(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search for a tag or a username"
          required
          className="search_input"
        />
      </form>
      <PromptCardList postData={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;

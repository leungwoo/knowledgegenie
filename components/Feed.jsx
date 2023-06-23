"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
const Feed = () => {
  const [searchText, setSearchText] = useState();
  const [post, setPost] = useState([]);

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
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPost(data);
    };
    fetchPosts();
  }, []);
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

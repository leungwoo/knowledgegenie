"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Loading from "./Loading";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPost, setFilteredPost] = useState([]);
  const debouncedSearchText = useDebounce(searchText, 300);

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

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    const query = debouncedSearchText;

    const filtered = posts.filter((post) => {
      //filter for tag
      const tagMatch = post.tag.toLowerCase().includes(query.toLowerCase());
      // Filter for username
      const userMatch = post.creator.username
        .toLowerCase()
        .includes(query.toLowerCase());
      // Filter for prompt
      const promptMatch = post.prompt
        .toLowerCase()
        .includes(query.toLowerCase());

      return tagMatch || promptMatch || userMatch;
    });
    setFilteredPost(filtered);
  };

  const handleTagClick = (tagname) => {
    setSearchText(tagname);
  };

  //fetch post form created GET api route
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt");
        const data = await res.json();
        if (!data) {
          throw new Error("Failed to fetch data");
        }
        setPosts(data);
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
      <form className="relative w-full flex-center" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search for a tag or a username"
          required
          className="search_input"
        />
      </form>
      <PromptCardList
        postData={searchText === "" ? posts : filteredPost}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;

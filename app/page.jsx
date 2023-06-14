import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="flex-col flex-center w-full">
      <h1 className="head_text text-center">
        Explore and Spread
        <br className="max-mid:hidden" />
        <span className="orange_gradient text-center">AI-POWERED PROMPTS</span>
      </h1>
      <p className="desc text-center">
        Prompt Genie is an open-source AI prompting tool for modern world to
        explore, create and spread creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;

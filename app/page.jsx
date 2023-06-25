import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="flex-col flex-center w-full">
      <h1 className="head_text text-center">
        KNOWLEDGE, ACTION, WISDOM
        <br className="max-mid:hidden" />
        <span className="orange_gradient text-center">Skill up</span>
      </h1>
      <p className="desc text-center">
        Knowledge Genie is an open-source Skill developing tool for anyone that
        learns something new and want to apply it at some point to get to the
        next level.
      </p>
      <Feed />
    </section>
  );
};

export default Home;

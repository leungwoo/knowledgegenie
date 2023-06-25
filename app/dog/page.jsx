import Image from "next/image";

async function getDogs() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    cache: "no-cache",
  });
  const data = res.json();
  return data;
}
const DogPage = async () => {
  const dogs = await getDogs();
  console.log(dogs);
  return (
    <div>
      DOG page
      <Image src={dogs.message} alt="dogs" width={500} height={530} />
    </div>
  );
};

export default DogPage;

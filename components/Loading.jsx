"use client";
import { ColorRing } from "react-loader-spinner";

function Loading() {
  return (
    <div className="grow w-full h-full flex items-center justify-center min-h-50vh mt-[30px]">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
}

export default Loading;

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
        colors={["#2563eb", "#2563eb", "#2563eb", "#2563eb", "#2563eb"]}
      />
    </div>
  );
}

export default Loading;

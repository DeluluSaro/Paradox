import Image from "next/image";
import React from "react";
import { LinkPreview } from "./ui/link-preview";

const MainFooter = () => {
  return (
    <div className="">
      <h1 className="text-5xl gradient-title">Follow me here</h1>
      <div className="flex gap-10 justify-center items-center mt-10">
        <LinkPreview url={'https://github.com/DeluluSaro'} className={'font-bold'}>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={"/github.png"}
            alt="github"
            width={50}
            height={50}
          ></Image>
          <h1 className="gradient-title">Github</h1>
        </div>
        </LinkPreview>
        <LinkPreview url={'https://www.instagram.com/saraxoxoxo.iyxkxo/'}  className={'gradient-title'}>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={"/instagram.png"}
            alt="github"
            width={50}
            height={50}
          ></Image>
          <h1>Instagram</h1>
        </div> 
        
        </LinkPreview>
      </div>
    </div>
  );
};

export default MainFooter;

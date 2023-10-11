import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-60 mx-auto flex flex-col gap-5 items-center justify-center min-h-screen">
      <p className="text-3xl">Page Not Found :(</p>
      <Link className="underline" href={"/"}>
        Go to home page
      </Link>
    </div>
  );
};

export default NotFound;

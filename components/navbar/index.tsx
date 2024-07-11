import Link from "next/link";
import { Button } from "../ui/button";

export const NavBar = () => {
  return (
    <div className=" w-4/5 mx-auto my-5 py-3 px-0 space-x-3 rounded-full">
      <Link href={"/"}>
        <Button variant={"ghost"} className="rounded-full">Home</Button>
      </Link>
      <Link href={"/users"}>
        <Button variant={"ghost"} className="rounded-full">Users</Button>
      </Link>
    </div>
  );
};

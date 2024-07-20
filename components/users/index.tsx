"use client";

import { useEffect, useState } from "react";
import { UserFormData } from "../home-page";
import { fetchAllUsers } from "@/lib/utils";

export const AllUsersPage = () => {
  const [users, setUsers] = useState<UserFormData[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await fetchAllUsers();

      if (usersData) {
        setUsers(usersData);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-8 w-4/5 mx-auto my-5">
      {
        users && users.length > 0 ? (users?.map((item, idx) => (
            <div key={idx} className="relative group">
              <img
                src={item.img}
                alt={item.name}
                className="rounded-2xl h-[8rem] w-[12rem] object-cover p-2 w-full border border-primary border-dashed group-hover:brightness-50 transition duration-300"
              />
              <div className="absolute cursor-pointer w-full inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="text-white text-center text-lg">{item.name.split(' ')[0]}</span>
              </div>
            </div>
          ))) : (
            <div className="text-center h-[80vh] m-auto flex justify-center items-center col-span-4">No Users Exists in DB...</div>
          )
      }
    </div>
  );
};

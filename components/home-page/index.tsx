"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CircleUser } from "lucide-react";
import { createUser } from "@/lib/utils";

// schema
const userSchema = z.object({
  name: z.string({ required_error: "Enter Fullname" }),
  email: z.string().email("Enter Valid Email"),
  age: z.string({ required_error: "Enter Age" }),
  img: z.string({ required_error: "Enter User Image" }),
});

// form data type
export type UserFormData = z.infer<typeof userSchema>;
const defaultValues: UserFormData = {
  name: "",
  age: "",
  email: "",
  img: "",
};
export const HomePage = () => {
  const [data, setData] = useState(defaultValues);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, disabled },
  } = form;

  const onSubmit = async (data: UserFormData) => {
    const { name, age, email, img } = watch();
    setData({ name, age, email, img });
    await createUser({ name, age, email, img });
    console.log(data);
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center m-auto">
      <div className="flex justify-between items-start gap-8 w-4/5 mx-auto">
        <div className="flex flex-col gap-8 w-full h-full">
          <div>
            {data?.img ? (
              <img
                className="rounded-2xl h-[8rem] p-2 w-max border border-primary border-dashed"
                src={data.img}
                alt={data.name}
              />
            ) : (
              <CircleUser className="h-[5rem] w-[5rem]" />
            )}
          </div>
          <div>
            <p className="text-2xl">
              <span className="font-bold">{`Name: `}</span>
              {data?.name || `N/A`}
            </p>
          </div>
          <div>
            <p className="text-2xl">
              <span className="font-bold">{`Email: `}</span>
              {data?.email || `N/A`}
            </p>
          </div>
          <div>
            <p className="text-2xl">
              <span className="font-bold">{`Age: `}</span>
              {data?.age || `N/A`}
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 shadow-xl rounded-xl w-1/3 p-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="xyz@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Image url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

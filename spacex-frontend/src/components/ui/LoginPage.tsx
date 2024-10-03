"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthLayout } from "../layouts/auth-layout";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta gereklidir"),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre gereklidir"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Inputs) => {
    console.log("Login attempted with:", data);
  };

  return (
    <AuthLayout>
      <div className=" w-full max-w-xl ">
        <h2 className="text-3xl font-bold text-center mb-4">LOG IN</h2>
        <p className="text-center mb-10">
          Please fill out the form below to complete your profile
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            type="email"
            placeholder="E-mail"
            {...register("email")}
            className="bg-[#1C1E22] border-gray-600 text-white placeholder-gray-400"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="bg-[#1C1E22] border-gray-600 text-white placeholder-gray-400"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <Button
            type="submit"
            className="w-full bg-[#2C3E50] hover:bg-[#34495E] text-white rounded-lg"
          >
            LOG IN
          </Button>
        </form>
        <div className="flex flex-col space-y-2 justify-center items-center">
          <p className="text-center mt-4 ">Dont you have an account already?</p>
          <Link
            href="/auth/register"
            className="text-white font-bold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

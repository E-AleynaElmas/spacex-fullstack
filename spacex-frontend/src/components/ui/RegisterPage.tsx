"use client";

import useRegister from "@/api/mutations/useRegister";
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
  firstName: string;
  lastName: string;
  passwordAgain: string;
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
  firstName: yup.string().required("İsim gereklidir"),
  lastName: yup.string().required("Soyisim gereklidir"),
  passwordAgain: yup
    .string()
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı gereklidir"),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createUser = useRegister();

  const onSubmit = (data: Inputs) => {
    console.log("Register attempted with:", data);
    createUser.mutateAsync(data);
  };

  return (
    <AuthLayout>
      <div className=" w-full max-w-xl ">
        <h2 className="text-3xl font-bold text-center mb-4">SIGN UP</h2>
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
            type="firstName"
            placeholder="First Name"
            {...register("firstName")}
            className="bg-[#1C1E22] border-gray-600 text-white placeholder-gray-400"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
          <Input
            type="lastName"
            placeholder="Last Name"
            {...register("lastName")}
            className="bg-[#1C1E22] border-gray-600 text-white placeholder-gray-400"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
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
          <Input
            type="password"
            placeholder="Password Again"
            {...register("passwordAgain")}
            className="bg-[#1C1E22] border-gray-600 text-white placeholder-gray-400"
          />
          {errors.passwordAgain && (
            <span className="text-red-500">{errors.passwordAgain.message}</span>
          )}
          <Button
            type="submit"
            className="w-full bg-[#2C3E50] hover:bg-[#34495E] text-white rounded-lg"
          >
            SIGN UP
          </Button>
        </form>
        <div className="flex flex-col space-y-2 justify-center items-center">
          <p className="text-center mt-4 ">Do you have an account already ?</p>
          <Link
            href="/auth/login"
            className="text-white font-bold hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

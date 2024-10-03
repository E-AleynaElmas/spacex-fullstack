import Logo from "@/assets/images/logo.png";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen pt-10 text-white bg-auth-bg flex flex-col items-center p-4">
      <div className="w-full flex flex-col space-y-10 justify-center items-center">
        <div className=" max-w-lg">
          {" "}
          <Image src={Logo} alt="logo" />
        </div>
        <div className="text-center max-w-4xl space-y-10">
          <p className="text-lg mb-8">
            Welcome to the SpaceX application, your gateway to the marvels of
            space exploration. Experience cutting-edge technology, real-time
            mission updates, and a seamless interface providing in-depth
            insights into SpaceXs groundbreaking missions, rockets, and the
            future of interstellar travel. Join us as we push the boundaries of
            space exploration together.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

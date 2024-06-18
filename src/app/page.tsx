import { Metadata } from "next";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title: "Next.js E-commerce Dashboard | PaySmart - Next.js Dashboard Template",
  description: "This is Next.js Home for PaySmart Dashboard Template",
};

export default function Home() {
  return (
    <>
      <SignIn />
    </>
  );
}

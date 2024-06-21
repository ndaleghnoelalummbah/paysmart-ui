import { Metadata } from "next";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title: "PaySmart | PaySmart - Payroll platform",
  description:
    "This is PaySmart login page to authenticate administrators for a given organization",
  icons: {
    icon: "/images/favicon.ico", // /public path
  },
};

export default function Home() {
  return (
    <>
      <SignIn />
    </>
  );
}

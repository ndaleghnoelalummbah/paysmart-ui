import { toast } from "react-toastify";
import { API } from "./fetcher";
import { useUserStore } from "@/zustand/Admin";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const { user, clearUser } = useUserStore();
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await API.signOut(user?.accessToken as string);
      console.log("response", response);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        clearUser();
        toast.success(res.message);
        router.push("/");
      } else {
        const message =
          statusCode === 500
            ? "Oops! Something went wrong on our end. Please try again later."
            : res.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  return {
    logout,
  };
};

export default useAuth;

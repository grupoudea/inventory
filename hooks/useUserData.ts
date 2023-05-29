import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/client/user";
import { useSession } from "next-auth/react";
import { ExtendedUser } from "@/types";

const useUserData = () => {
  const { data: session, status } = useSession();

  const userEmail = session?.user?.email;

  console.log("usermail: ", userEmail);
  

  const { data: userData, loading } = useQuery<{ user: ExtendedUser }>(
    GET_USER,
    {
      variables: {
        email: userEmail,
      },
      fetchPolicy: "cache-first",
    }
  );

  console.log("userdata: ", userData);

  return {
    loading,
    status,
    session,
    userData,
    role: userData?.user.rol.name,
  };
};

export { useUserData };

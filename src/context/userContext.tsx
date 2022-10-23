import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "api/users";

export type Context = {
  name: string | undefined;
  surname: string | undefined;
  id: number | null;
  role: string | null;
  //   setUser: () => void;
};

const UserContext = createContext<Context>({
  name: undefined,
  surname: undefined,
  id: null,
  role: null,
  //   setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const userId = Number(localStorage.getItem("userId"));
  const userRole = localStorage.getItem("userRole");
  console.log(userRole)
  const [userName, setUserName] = useState<string>();
  const [userSurname, setUserSurname] = useState<string>();


  const { isError, error } = useQuery(["user", userId], () => getUser(userId), {enabled: !!userId,
    onSuccess: (user) => {
      setUserName(user?.name);
      setUserSurname(user?.surname);
    },
  });

  if (isError) {
    throw new Error(
      error instanceof Error ? error.message : "An error occured"
    );
  }

  return (
    <UserContext.Provider
      value={{
        name: userName,
        surname: userSurname,
        id: userId,
        role: userRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

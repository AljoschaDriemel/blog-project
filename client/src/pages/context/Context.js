import { createContext, useState } from "react";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [userData, setUserData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  return (
    <DataContext.Provider
      value={{
        userData,
        setUserData,
        posts,
        setPosts,
        categoryData,
        setCategoryData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

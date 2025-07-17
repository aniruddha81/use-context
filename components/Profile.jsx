import UserContext from "@/context/UserContext";
import React, { useContext } from "react";

const Profile = () => {
  const { user } = useContext(UserContext);
  return user ? <div>welcome {user.username}</div> : <div>please login </div>;
};

export default Profile;

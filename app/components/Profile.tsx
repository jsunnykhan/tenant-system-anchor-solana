import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { User } from "../interface/user.";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { getUserInfomation } = useUser();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res: any = await getUserInfomation();
    setUser(res);
  };

  console.log(user);

  if (!user) {
    return (
      <h2 className="text-center">
        No information found please a create user profile
      </h2>
    );
  }
  return (
    <div>
      <div>
        <h2>{user?.name}</h2>
      </div>
    </div>
  );
};

export default Profile;

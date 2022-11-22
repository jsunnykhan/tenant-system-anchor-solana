
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <ul className="flex flex-1 justify-between">
          <li>Name</li>
          <li>Search Bar</li>
        </ul>

        <div className="self-end">
          <WalletMultiButton />
        </div>
      </div>
    </>
  );
};

export default Header;

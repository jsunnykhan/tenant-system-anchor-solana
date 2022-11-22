import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useProgram } from "./useProgram";

export const useUser = () => {
  const { userProgram } = useProgram();

  const { publicKey } = useWallet();

  const [pubKey, setPubKey] = useState<PublicKey | null>();

  useEffect(() => {
    if (publicKey) {
      setPubKey(publicKey);
    }
  }, [publicKey]);

  const getUserInfomation = async () => {
    if (userProgram && pubKey) {
      try {
        const [userPda, _] = findProgramAddressSync(
          [utf8.encode("user"), pubKey.toBuffer()],
          userProgram.programId
        );
        
        const tx = await userProgram.account.userStruct.fetch(userPda);
        return tx;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { getUserInfomation };
};

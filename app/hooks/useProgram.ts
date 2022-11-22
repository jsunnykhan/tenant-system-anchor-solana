import { Program } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";

import { IDL as tenantIdl, Tenant } from "../interface/tenantIdl";
import { IDL as usersIdl, Users } from "../interface/userIdl";
import { IDL as houseIdl, House } from "../interface/houseIdl";

import { PublicKey } from "@solana/web3.js";

export const useProgram = () => {
  const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;
  const USERS_ID = process.env.NEXT_PUBLIC_USERS_ID;
  const HOUSE_ID = process.env.NEXT_PUBLIC_HOUSE_ID;

  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();

  const [tenantId, setTenantId] = useState<PublicKey | undefined>();
  const [usersId, setUsersId] = useState<PublicKey | undefined>();
  const [houseId, setHouseId] = useState<PublicKey | undefined>();

  const [programProvider, setProgramProvider] = useState<
    anchor.AnchorProvider | undefined
  >();

  useEffect(() => {
    if (TENANT_ID && USERS_ID && HOUSE_ID) {
      setTenantId(new PublicKey(TENANT_ID));
      setUsersId(new PublicKey(USERS_ID));
      setHouseId(new PublicKey(HOUSE_ID));
    } else {
      console.log("Program Id and User Program Id not found !!");
    }
  }, [TENANT_ID, USERS_ID, HOUSE_ID]);

  useEffect(() => {
    if (anchorWallet && connection) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      setProgramProvider(provider);
      console.log("refreshing from provider");
    }
  }, [connection, anchorWallet]);

  const tenantProgram: Program<Tenant> | undefined = useMemo(() => {
    if (tenantId && programProvider) {
      return new anchor.Program(tenantIdl, tenantId, programProvider);
    }
  }, [tenantId, connection, anchorWallet]);

  const userProgram: Program<Users> | undefined = useMemo(() => {
    if (usersId && programProvider) {
      return new anchor.Program(usersIdl, usersId, programProvider);
    }
  }, [connection, anchorWallet, usersId]);

  const houseProgram: Program<House> | undefined = useMemo(() => {
    if (houseId && programProvider) {
      return new anchor.Program(houseIdl, houseId, programProvider);
    }
  }, [connection, anchorWallet, houseId]);

  return {
    tenantProgram,
    userProgram,
    houseProgram,
  };
};

import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Tenant } from "../target/types/tenant";
import { Users } from "../target/types/users";
import { House } from "../target/types/house";
import { Keypair, SystemProgram } from "@solana/web3.js";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { assert } from "chai";

describe("tenant", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Tenant as Program<Tenant>;
  const userProgram = anchor.workspace.Users as Program<Users>;
  const houseProgram = anchor.workspace.House as Program<House>;

  const userWallet = Keypair.generate();
  const otherWallet = Keypair.generate();

  it("initialize a user", async () => {
    // Add your test here.

    const name = "Sunny Khan";
    const address = "Dhaka Bangladeshs";
    const nid = "0123456789";

    const signature = await program.provider.connection.requestAirdrop(
      userWallet.publicKey,
      10000000000
    );
    await program.provider.connection.confirmTransaction(signature);

    const [userPda, _] = findProgramAddressSync(
      [utf8.encode("user"), userWallet.publicKey.toBuffer()],
      userProgram.programId
    );

    console.log(userProgram.programId.toString());

    const tx = await userProgram.methods
      .initializeUser(name, address, nid)
      .accounts({
        authority: userWallet.publicKey,
        userAccount: userPda,
        systemProgram: SystemProgram.programId,
      })
      .signers([userWallet])
      .rpc();

    console.log("User transaction signature : ", tx);

    const user = await userProgram.account.userStruct.fetch(userPda);
    console.log(user);
  });

  it("initialize a house", async () => {
    const houseName = "kello";
    const address = "Banani Dhaka";
    const house_number = "4a Banani";
    const district = "Dhaka";
    const country = "Bangladesh";

    const mint = Keypair.generate();

    const [housePda, _] = findProgramAddressSync(
      [utf8.encode("house"), mint.publicKey.toBuffer()],
      houseProgram.programId
    );

    const [userPda, __] = findProgramAddressSync(
      [utf8.encode("user"), userWallet.publicKey.toBuffer()],
      userProgram.programId
    );

    const tx = await houseProgram.methods
      .initializeHouse(houseName, address, house_number, district, country)
      .accounts({
        authority: userWallet.publicKey,
        mint: mint.publicKey,
        houseAccount: housePda,
        userAccount: userPda,
        userProgram: userProgram.programId,
        systemProgram: SystemProgram.programId,
      })
      .signers([userWallet])
      .rpc();
    const user = await userProgram.account.userStruct.fetch(userPda);
    console.log(user);
    console.log("Hosue transaction signature : ", tx);
  });

  it("initialize appartment", async () => {
    const mint = Keypair.generate();
    const number = "1a";
    const [appartmentPda, _] = findProgramAddressSync(
      [
        utf8.encode("appartment"),
        houseProgram.programId.toBuffer(),
        mint.publicKey.toBuffer(),
      ],
      houseProgram.programId
    );
    const [userPda, __] = findProgramAddressSync(
      [utf8.encode("user"), userWallet.publicKey.toBuffer()],
      userProgram.programId
    );
    const user = await userProgram.account.userStruct.fetch(userPda);
    const userMint = user.mint;

    console.log(userMint[0]);

    const [housePda, ___] = findProgramAddressSync(
      [utf8.encode("house"), userMint[0].toBuffer()],
      houseProgram.programId
    );

    const tx = await houseProgram.methods
      .initializeAppartment(number)
      .accounts({
        authority: userWallet.publicKey,
        mint: mint.publicKey,
        appartmentAccount: appartmentPda,
        houseAccount: housePda,
        systemProgram: SystemProgram.programId,
      })
      .signers([userWallet])
      .rpc();
    const data = await houseProgram.account.appartment.fetch(appartmentPda);
    const data2 = await houseProgram.account.houseStruct.fetch(housePda);
    console.log(data2);
  });

  it("Remove User", async () => {
    const [userPda, _] = findProgramAddressSync(
      [utf8.encode("user"), userWallet.publicKey.toBuffer()],
      userProgram.programId
    );

    const before = await program.provider.connection.getBalance(
      userWallet.publicKey
    );

    const tx = await userProgram.methods
      .removeUser()
      .accounts({
        authority: userWallet.publicKey,
        userAccount: userPda,
        systemProgram: SystemProgram.programId,
      })
      .signers([userWallet])
      .rpc();

    const after = await program.provider.connection.getBalance(
      userWallet.publicKey
    );

    assert(before < after, "rent credit not retrive ");
  });
});

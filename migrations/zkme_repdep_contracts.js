anchor build
anchor deploy

anchor run initialize --provider.cluster devnet

[scripts]
initialize = "scripts/initialize.ts"

import * as anchor from "@coral-xyz/anchor";
import { zkmeReputation } from "../target/types/zkme_reputation";

const main = async () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.ZkmeReputation as anchor.Program<zkmeReputation>;

  const settings = anchor.web3.Keypair.generate();
  const statistics = anchor.web3.Keypair.generate();

  await program.methods
    .initialize(provider.wallet.publicKey) // token mint address
    .accounts({
      settings: settings.publicKey,
      statistics: statistics.publicKey,
      owner: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([settings, statistics])
    .rpc();
};

main().catch(console.error);

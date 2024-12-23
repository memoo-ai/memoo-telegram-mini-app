import { Ed25519Program, PublicKey, SYSVAR_INSTRUCTIONS_PUBKEY, ComputeBudgetProgram } from '@solana/web3.js';

import { Memoo } from '@/contracts/idl/memoo';
import { Program, BN } from '@coral-xyz/anchor';
import { TeamQuota } from '@/types';

export interface AirdropTxnsParams {
  memeId: PublicKey;
  serialized: Uint8Array;
  signature: Uint8Array;
  signerPublicKey: PublicKey;
  payer: PublicKey;
  payerAccountA: PublicKey;
  memeConfig: PublicKey;
  memeUserData: PublicKey;
  mintAccountA: PublicKey;
  poolAuthorityA: PublicKey;
  poolAccountA: PublicKey;
  addixEd25519Program: boolean;
}
export interface TeamTxnsParams {
  memeId: PublicKey;
  payer: PublicKey;
  memooConfig: PublicKey;
  memeConfig: PublicKey;
  serialized: Uint8Array;
  signature: Uint8Array;
  signerPublicKey: PublicKey;
  memeUserData: PublicKey;
  mintA: PublicKey;
  poolAuthority: PublicKey;
  poolAccountA: PublicKey;
  creator: PublicKey;
  memeUserDataCreator: PublicKey;
  // userPublicKey: PublicKey;
  payerAccountA: PublicKey;
  addixEd25519Program: boolean;
  creatorsTokenAtas: PublicKey[];
  teams: TeamQuota[];
}

export class AirdropTxns {
  public constructor(private readonly programAPI: Program<Memoo>) {}

  public async createTx({
    memeId,
    serialized,
    signature,
    signerPublicKey,
    payer,
    payerAccountA,
    memeConfig,
    memeUserData,
    mintAccountA,
    poolAuthorityA,
    poolAccountA,
    addixEd25519Program,
  }: AirdropTxnsParams) {
    console.log(`signature is ${signature.length}`);
    let ixEd25519Program: any = null;
    if (addixEd25519Program) {
      ixEd25519Program = Ed25519Program.createInstructionWithPublicKey({
        publicKey: signerPublicKey.toBytes(),
        signature,
        message: serialized,
      });
    }
    console.log(`memeId is ${memeId}`);

    return this.programAPI.methods
      .dealHunterClaim(memeId)
      .accounts({
        payer: payer,
        instructionsSysvar: SYSVAR_INSTRUCTIONS_PUBKEY,
        payerAccountA,
        memeConfig,
        memeUserData,
        mintAccountA,
      })
      .remainingAccounts([
        {
          pubkey: poolAuthorityA,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: poolAccountA,
          isSigner: false,
          isWritable: true,
        },
      ])
      .preInstructions(
        [
          ixEd25519Program,
          ComputeBudgetProgram.setComputeUnitLimit({
            units: 400_000,
          }),
          ComputeBudgetProgram.setComputeUnitPrice({
            // microLamports: new BN(100000),
            microLamports: 100000,
          }),
        ].filter(Boolean),
      )
      .transaction();
  }
}

export class TeamClaimTxns {
  public constructor(private readonly programAPI: Program<Memoo>) {}

  public async createTx({
    memeId,
    serialized,
    signature,
    signerPublicKey,
    payer,
    // userPublicKey,
    memeConfig,
    memeUserData,
    mintA,
    poolAuthority,
    memooConfig,
    poolAccountA,
    creator,
    memeUserDataCreator,
    addixEd25519Program,
    creatorsTokenAtas,
    teams,
  }: TeamTxnsParams) {
    console.log(`signature is ${signature.length}`);
    let ixEd25519Program: any = null;
    if (addixEd25519Program) {
      ixEd25519Program = Ed25519Program.createInstructionWithPublicKey({
        publicKey: signerPublicKey.toBytes(),
        signature,
        message: serialized,
      });
    }
    console.log(`memeId is ${memeId}`);

    return this.programAPI.methods
      .creatorClaimWhitelist(memeId)
      .accounts({
        payer: payer,
        creator,
        instructionsSysvar: SYSVAR_INSTRUCTIONS_PUBKEY,
        // memooConfig: memooConfig,
        memeConfig,
        memeUserData,
        memeUserDataCreator,
        mintA,
      })
      .remainingAccounts([
        {
          pubkey: poolAuthority,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: poolAccountA,
          isSigner: false,
          isWritable: true,
        },
        // ...teams.map((creator) => ({
        //   pubkey: new PublicKey(creator.teamAddress),
        //   isSigner: false,
        //   isWritable: true,
        // })),
        ...creatorsTokenAtas.map((pubkey) => ({ pubkey, isSigner: false, isWritable: true })),
      ])
      .preInstructions(
        [
          ixEd25519Program,
          ComputeBudgetProgram.setComputeUnitLimit({
            units: 400_000,
          }),
          ComputeBudgetProgram.setComputeUnitPrice({
            // microLamports: new BN(100000),
            microLamports: 100000,
          }),
        ].filter(Boolean),
      )
      .transaction();
  }
}

// export class AirdropMessage {
//   address: Uint8Array;
//   meme: Uint8Array;
//   count: BN;
//   expiry: BN;

//   static schema: Schema = new Map([
//     [
//       AirdropMessage,
//       {
//         kind: 'struct',
//         fields: [
//           ['address', [32]],
//           ['meme', [32]],
//           ['count', 'u64'],
//           ['expiry', 'u64'],
//         ],
//       },
//     ],
//   ]);

//   constructor(obj: { count: BN; expiry: BN; address: Uint8Array; meme: Uint8Array }) {
//     this.meme = obj.meme;
//     this.count = obj.count;
//     this.address = obj.address;
//     this.expiry = obj.expiry;
//   }

//   serialize(): Uint8Array {
//     return serialize(AirdropMessage.schema, this);
//   }

//   deserialize(data: Buffer): AirdropMessage {
//     return deserialize(AirdropMessage.schema, AirdropMessage, data);
//   }
// }

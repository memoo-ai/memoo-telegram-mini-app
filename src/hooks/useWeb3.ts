/* eslint-disable max-params */
/* eslint-disable no-debugger */
import { useWallet, useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Provider, BN, Idl } from '@coral-xyz/anchor';
import {
  clusterApiUrl,
  PublicKey,
  Connection,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
  ComputeBudgetProgram,
  VersionedTransaction,
  TransactionMessage,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  createAssociatedTokenAccountInstruction,
  NATIVE_MINT,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount,
} from '@solana/spl-token';
import IDL from '@/contracts/idl/memoo.json';
import { useAnchorProgram } from './useProgram';
import { AirdropTxns, TeamClaimTxns } from '@/utils/createTxns';
import { BigNumber } from 'bignumber.js';
import message from '@/components/IMessage';
import { TeamQuota } from '@/types';

// import { memooConfig } from '@/types';
export interface MemooConfig {
  admin: PublicKey;
  airdropPrice: BN;
  id: PublicKey;
  idoPrice: BN;
  idoCreatorBuyLimit: number;
  idoUserBuyLimit: number;
  openTime: BN;
  platformFeeCreateMemeSol: BN;
  platform: PublicKey;
  platformFeeRateDenominatorIdo: number;
  platformFeeRateIdo: number;
  platformFeeRecipient: PublicKey;
  tokenAllocationAirdrop: number;
  tokenAllocationCreator: number;
  tokenAllocationIdo: number;
  tokenAllocationLp: number;
  tokenAllocationPlatform: number;
  totalSupply: BN;
  shareCreateFeeNumber: BN;
}
export interface MemeConfig {
  admin: PublicKey;
  createTimestamp: BN;
  creator: PublicKey;
  creatorTotal: BN;
  id: PublicKey;
  idoEnd: boolean;
  isInitialized: boolean;
  memeAirdropCount: BN;
  memeAirdropTotal: BN;
  memeIdoCount: BN;
  memeIdoMoney: BN;
  mintTokenAddress: PublicKey;
  platform: PublicKey;
  platformTotal: BN;
  poolA: PublicKey;
  poolWsol: PublicKey;
  preLaunchSecond: BN;
  totalSupply: BN;
  shareCreateFeeNumber: BN;
}
export interface MemeUserIdoData {
  creatorTeamCount: BN;
  creatorTeamCountClaimed: BN;
  creatorTeamMoney: BN;
  creatorLockCount: BN;
  creatorUnlockCount: BN;
  creatorLockCountPermission: BN;
  creatorUnlockCountPermission: BN;
  creatorUnLockPeriod: BN;
  isInitialized: boolean;
  memeId: PublicKey;
  // lockCount: BN;
  memeUserAirdropClaimedCount: BN;
  memeUserIdoClaimedCount: BN;
  memeUserIdoCount: BN;
  memeUserIdoMoney: BN;
  shareCreateFee: BN;
  user: PublicKey;
}

export const useAccount = () => {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const [balance, setBalance] = useState(0);
  const [memooConfig, setMemooConfig] = useState<MemooConfig>();
  const RPC_URL = import.meta.env.VITE_RPC_URL;
  const connection = new Connection(RPC_URL);

  const getBalance = async () => {
    if (!connection || !publicKey) return 0;
    const balance = await connection.getBalance(publicKey);
    const result = new BigNumber(balance).dividedBy(LAMPORTS_PER_SOL);
    return Number(result ?? 0);
  };
  // const network = import.meta.env.VITE_WALLET_ADAPTER_NETWORK;
  // const connection = new Connection(clusterApiUrl(network));
  const programId = new PublicKey(import.meta.env.VITE_PROGRAM_ID);
  const globalMemeConfigId = import.meta.env.VITE_GLOBAL_MEMOO_CONFIG_ID;
  // const { solanaConfig } = useBaseConfig();
  const program = useAnchorProgram(programId, IDL as Idl);

  const memooConfigPda = useMemo(() => {
    const config = PublicKey.findProgramAddressSync(
      [Buffer.from('global_memoo_config'), new PublicKey(globalMemeConfigId).toBuffer()],
      programId,
    )[0];
    console.log('memooConfigPda:', config);
    return config;
  }, [globalMemeConfigId]);

  useEffect(() => {
    (async () => {
      if (!memooConfigPda || !program) return;
      // const config = (await program.account.globalMemooConfig.fetch(memooConfigPda)) as any;
      const config: MemooConfig = (await program.account.globalMemooConfig.fetch(memooConfigPda)) as any;
      // debugger;
      console.log('memooConfig:', config);
      console.log('memooConfig-platform:', config?.platform.toBase58());
      setMemooConfig(config);
    })();
  }, [memooConfigPda]);
  const getSimulationUnits = async (
    connection: Connection,
    instructions: TransactionInstruction[],
    payer: PublicKey,
  ): Promise<number | undefined> => {
    const Instructions = [ComputeBudgetProgram.setComputeUnitLimit({ units: 1_400_000 }), ...instructions];

    const VersionedTxn = new VersionedTransaction(
      new TransactionMessage({
        instructions: Instructions,
        payerKey: payer,
        recentBlockhash: PublicKey.default?.toString(),
      }).compileToV0Message(),
    );

    const simulation = await connection.simulateTransaction(VersionedTxn, {
      replaceRecentBlockhash: true,
      sigVerify: false,
      commitment: 'finalized',
    });

    if (simulation.value.err) {
      return undefined;
    }

    return simulation.value.unitsConsumed;
  };
  const sendMyTransaction = async (
    publicKey: PublicKey,
    signTransaction: any,
    myTransaction: TransactionInstruction,
    publickeys: PublicKey[],
  ) => {
    // 1. Establish a connection to the Solana cluster
    // const connection = new Connection(endpoint);

    // 2. Create your transaction
    const transaction = new Transaction();
    // ... add instructions to the transaction

    // 3. Fetch the recent priority fees
    // const { result } = await fetchEstimatePriorityFees({ endpoint });
    // const priorityFee = result.per_compute_unit['medium']; // Replace with your priority fee level based on your business requirements
    const recentPrioritizationFees = await connection.getRecentPrioritizationFees({
      lockedWritableAccounts: publickeys,
    });
    const maxPriceItem = recentPrioritizationFees.reduce(
      (max, item) => (item.prioritizationFee > max.prioritizationFee ? item : max),
      recentPrioritizationFees[0],
    );

    console.log('maxPriceItem: ', maxPriceItem);

    const priorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: maxPriceItem?.prioritizationFee ?? 20000,
    });
    // const recentPrioritizationFees = await connection.getFeeForMessage(
    //   transaction.serializeMessage()?.toString('base64'),
    // );

    // const recentPrioritizationFees = await transaction.getEstimatedFee(connection);
    // 4. Create a PriorityFee instruction and add it to your transaction
    // if (recentPrioritizationFees) {
    // }

    console.log('recentPrioritizationFees: ', recentPrioritizationFees);
    // console.log('microlamports: ', microlamports);
    // debugger;
    // if (microlamports) {
    //   priorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
    //     microLamports: microlamports?.prioritizationFee ?? 20000,
    //   });
    // } else {
    //   priorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
    //     microLamports: 20000,
    //   });
    // }

    transaction.add(priorityFeeInstruction);
    transaction.add(myTransaction);
    // 5. Simulate the transaction and add the compute unit limit instruction to your transaction
    // let [units, recentBlockhash] = await Promise.all([
    //   getSimulationUnits(connection, transaction.instructions, publicKey),
    //   connection.getLatestBlockhash(),
    // ]);
    // console.log('ComputeUnitLimit-units: ', units, ' recentBlockhash: ', recentBlockhash.blockhash);
    // if (units) {
    //   units = Math.ceil(units * 1.05); // margin of error
    //   transaction.add(ComputeBudgetProgram.setComputeUnitLimit({ units }));
    // }
    const recentBlockhash = await connection.getLatestBlockhash('finalized');
    // 6. Sign and send your transaction
    transaction.feePayer = publicKey;
    transaction.recentBlockhash = recentBlockhash.blockhash;
    const signedTransaction = await signTransaction(transaction);

    const hash = await connection.sendRawTransaction(signedTransaction.serialize(), {
      skipPreflight: false,
      maxRetries: 3,
      preflightCommitment: 'finalized',
    });
    const transactionStatus = await connection.getTransaction(hash);
    console.log('TransactionHash: ', hash);
    console.log('transactionStatus: ', transactionStatus);
    return {
      hash,
      blockhash: recentBlockhash.blockhash,
      lastValidBlockHeight: recentBlockhash.lastValidBlockHeight,
    };
  };
  const useAddress = useCallback(
    (className = '', key = 'connect wallet') => {
      if (!publicKey) {
        message.info('Please connect wallet first', { key, className });
        return false;
      }
      return true;
    },
    [publicKey],
  );
  const sendTxns = async (transaction: Transaction) => {
    if (!signTransaction || !publicKey) return;
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = latestBlockhash.blockhash;
    // transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
    transaction.feePayer = publicKey;
    console.log('transaction :', transaction);
    const signedTransaction = await signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signedTransaction.serialize(), {
      skipPreflight: false,
      preflightCommitment: 'finalized',
      // maxRetries: 3,
    });
    console.log(
      '🎉 Transaction successfully confirmed!',
      '\n',
      `https://explorer.solana.com/tx/${txid}?cluster=devnet`,
    );
    return txid;
  };

  const registerTokenMint = useCallback(
    async (memeId: string, totalPay: string, paySol: number) => {
      if (!publicKey || !signTransaction || !program || !memooConfig) return;
      try {
        const nowBalance = await getBalance();
        if (nowBalance < paySol + 0.00001) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to create',
          });
          return 'error';
        }
        const memeConfigId = new PublicKey(memeId);
        const memeConfigPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];

        const memeUserDataPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];

        const poolSolAuthority = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), NATIVE_MINT.toBuffer()],
          programId,
        )[0];

        const poolAccountSol = await getAssociatedTokenAddress(NATIVE_MINT, poolSolAuthority, true);

        const userWsolAddress = await getAssociatedTokenAddress(NATIVE_MINT, publicKey);

        const userWsolAccountInfo = await connection.getAccountInfo(userWsolAddress);

        const transaction = new Transaction();
        let createAtaIx;
        if (!userWsolAccountInfo) {
          createAtaIx = createAssociatedTokenAccountInstruction(
            publicKey, // payer
            userWsolAddress, // associatedToken
            publicKey, // owner
            NATIVE_MINT, // mint
          );
          transaction.add(createAtaIx);
        }

        const platformFeeBN = new BN(memooConfig?.platformFeeCreateMemeSol);
        // const defaultFeeBN = new BigNumber(0.000000001).multipliedBy(10 ** 9);
        // const totalResult = Number(totalPay) > 0 ? totalPay : defaultFeeBN;
        // const totalPayWithFee = new BN(totalResult).add(platformFeeBN);
        const totalResultBN = new BigNumber(totalPay);
        // const totalPayWithFee = totalResultBN.plus(platformFeeBN?.toString());
        console.log('platformFeeBN:', Number(platformFeeBN));

        const publickeys = [new PublicKey(memeId), publicKey];
        const recentPrioritizationFees = await connection.getRecentPrioritizationFees({
          lockedWritableAccounts: publickeys,
        });
        const maxPriceItem = recentPrioritizationFees.reduce(
          (max, item) => (item.prioritizationFee > max.prioritizationFee ? item : max),
          recentPrioritizationFees[0],
        );
        const creatorsWSolAta = getAssociatedTokenAddressSync(NATIVE_MINT, publicKey, true);
        const registerTokenMintIx = await program.methods
          .registerTokenWithoutFee(memeConfigId, new BN(totalResultBN?.toString()), new BN(0))
          // .registerTokenMint(memeConfigId, new BN(18000000).add(memooConfig?.platformFeeCreateMemeSol), new BN(0), 9)
          .accounts({
            memooConfig: memooConfigPda,
            memeConfig: memeConfigPda,
            memeUserData: memeUserDataPda,
            // platformFeeRecipient: memooConfig?.platformFeeRecipient,
            // platformFeeRecipient: new PublicKey(platform_fee_recipient),
            poolAuthorityWsol: poolSolAuthority,
            poolAccountWsol: poolAccountSol,
            // mintAccountWsol: NATIVE_MINT,
            // userSolAccount: publicKey,
            // userWsolAccount: userWsolAddress,
            wsolMint: NATIVE_MINT,
          })
          .remainingAccounts([
            {
              pubkey: creatorsWSolAta,
              isSigner: false,
              isWritable: true,
            },
          ])
          .preInstructions([
            ComputeBudgetProgram.setComputeUnitPrice({
              microLamports: maxPriceItem?.prioritizationFee ?? 20000,
            }),
          ])
          .transaction();
        // .instruction();

        // .rpc();
        // return registerTokenMintIx;

        transaction.add(registerTokenMintIx);
        console.log('maxPriceItem :', maxPriceItem);
        const tx = sendTxns(transaction);
        return tx;
      } catch (error) {
        console.error('Error in registerTokenMint:', error);
        return null;
        // throw error;
      }
    },
    [connection, signTransaction, publicKey, program, memooConfig, ComputeBudgetProgram],
  );

  const idoBuy = useCallback(
    // eslint-disable-next-line max-params
    async (memeId: string, amount: BigNumber, paySol: number, needFee: boolean) => {
      if (!memooConfig || !program || !publicKey) return;
      try {
        console.log('memeId:', memeId);
        const nowBalance = await getBalance();
        console.log('nowBalance', nowBalance);
        if (nowBalance < paySol + 0.000001) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to idoBuy',
          });
          return;
        }
        const memeConfigId = new PublicKey(memeId);
        // debugger;
        const memeConfigPda = PublicKey.findProgramAddressSync(
          // [Buffer.from('meme_config'), new PublicKey(memeConfigId).toBuffer()],
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];

        const memeConfig: MemeConfig = (await program.account.memeConfig.fetch(memeConfigPda)) as any;

        const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];

        const poolSolAuthority = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), NATIVE_MINT.toBuffer()],
          programId,
        )[0];
        const poolAccountSol = await getAssociatedTokenAddress(NATIVE_MINT, poolSolAuthority, true);
        const idoBuyWsolAccount = getAssociatedTokenAddressSync(NATIVE_MINT, publicKey, true);

        const quotient = memooConfig.platformFeeCreateMemeSol.div(memooConfig.shareCreateFeeNumber);
        const remainder = memooConfig.platformFeeCreateMemeSol.mod(memooConfig.shareCreateFeeNumber);
        const share_create_fee = quotient.add(remainder.isZero() ? new BN(0) : new BN(1));
        const shareCreateFee = new BigNumber(share_create_fee.toString());
        const needShareFee = Number(memeConfig?.shareCreateFeeNumber) <= Number(memooConfig?.shareCreateFeeNumber);
        // const idoBuyCost = idoUserBuyLimit.mul(global_config.idoPrice).div(values.DECIMAL_IDO_PRICE);
        // const idoBuyCost = new BigNumber(amount).mul(idoPrice);
        // const idoBuyCost = amount;
        // debugger;
        const inputAmount = amount.multipliedBy(10 ** 9);
        const idoBuyCost = needFee && needShareFee ? inputAmount.plus(shareCreateFee) : inputAmount;
        // const idoBuyCost = inputAmount.plus(shareCreateFee);
        console.log('idoBuy-memeConfig-shareCreateFeeNumber:', Number(memeConfig?.shareCreateFeeNumber));
        console.log('idoBuy-memooConfig-shareCreateFeeNumber:', Number(memooConfig?.shareCreateFeeNumber));
        console.log('idoBuy-shareCreateFee:', Number(shareCreateFee));
        console.log('idoBuy-inputAmount:', Number(inputAmount));
        console.log('idoBuy-idoBuyCost:', Number(idoBuyCost));
        console.log('idoBuy-memeConfig: ', memeConfig);
        console.log('idoBuy-memeConfig-shareFeeNumber: ', memeConfig?.shareCreateFeeNumber.toString());

        const tx = await program.methods
          // .idoBuy(memeConfigId, idoBuyCost)
          .idoBuyWithFee(memeConfigId, new BN(Number(idoBuyCost)))
          .accounts({
            memooConfig: memooConfigPda,
            memeConfig: memeConfigPda,
            memeUserData: memeUserDataPda_idoBuy,
            payer: publicKey,
            // poolAuthorityWsol: poolSolAuthority,
            poolAccountWsol: poolAccountSol,
            // mintAccountWsol: NATIVE_MINT,
            // userSolAccount: publicKey,
            userWsolAccount: idoBuyWsolAccount,
            wsolMint: NATIVE_MINT,
          })
          .rpc();
        console.log('idoBuy-txid: ', tx);
        // .transaction();
        // const latestBlockhash = await connection.getLatestBlockhash();
        // transaction.recentBlockhash = latestBlockhash.blockhash;
        // // transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
        // transaction.feePayer = publicKey;
        // console.log('transaction :', transaction);
        // const signedTransaction = await signTransaction(transaction);
        // const txid = await connection.sendRawTransaction(signedTransaction.serialize(), {
        //   skipPreflight: false,
        //   preflightCommitment: 'finalized',
        //   // maxRetries: 3,
        // });
        // console.log('idoBuy-txid: ', txid);
        // .rpc();

        return tx;
      } catch (e) {
        console.log('error:', e);
      }
    },
    [connection, publicKey],
  );

  const creatorClaim = useCallback(
    async (memeId: string, mintPublicKey: string) => {
      if (!memooConfig || !program || !publicKey) return;
      try {
        const nowBalance = await getBalance();
        if (nowBalance < 0.000001) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to creatorClaimAll',
          });
          return;
        }
        const memeConfigId = new PublicKey(memeId);
        const mintAPublicKey = new PublicKey(mintPublicKey);
        // const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
        //   [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
        //   programId,
        // )[0];
        // const memeUserIdoData: MemeUserIdoData = (await program.account.memeUserIdoData.fetch(
        //   memeUserDataPda_idoBuy,
        // )) as any;
        const memeUserDataPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        const adminAccountAPda = getAssociatedTokenAddressSync(mintAPublicKey, publicKey, true);
        // const adminAccountAPda = getAssociatedTokenAddressSync(
        //   mintAKeypair.publicKey,
        //   values.payerAdmin.publicKey,
        //   true
        // );
        const poolAuthorityA = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
          programId,
        )[0];
        const poolAccountA = getAssociatedTokenAddressSync(mintAPublicKey, poolAuthorityA, true);
        const memeConfigPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];
        const tx = await program.methods
          .creatorClaim(memeConfigId)
          .accounts({
            payer: publicKey,
            memooConfig: memooConfigPda,
            memeUserData: memeUserDataPda,
            memeConfig: memeConfigPda,
            // reatorAccountA: adminAccountAPda,
            creatorAccountA: adminAccountAPda,
            mintAccountA: mintAPublicKey,
            poolAuthorityA,
            poolAccountA: poolAccountA,
          })
          .rpc();
        console.log('creatorClaimTx:', tx);
        return tx;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program],
  );

  const idoClaim = useCallback(
    async (memeId: string, mintaPublicKey: string) => {
      if (!memooConfig || !program || !publicKey) return;
      try {
        const nowBalance = await getBalance();
        if (nowBalance < 0.000001) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to creatorClaimAll',
          });
          return;
        }
        const memeConfigId = new PublicKey(memeId);
        const mintAPublicKey = new PublicKey(mintaPublicKey);
        const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        const idoBuyerAccountA = getAssociatedTokenAddressSync(mintAPublicKey, publicKey, true);
        const poolAuthorityA = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
          programId,
        )[0];
        const poolAccountA = getAssociatedTokenAddressSync(mintAPublicKey, poolAuthorityA, true);
        const tx = await program.methods
          .idoClaim(memeConfigId)
          .accounts({
            user: publicKey,
            memeUserData: memeUserDataPda_idoBuy,

            idoUserAccountA: idoBuyerAccountA,
            mintAccountA: mintAPublicKey,
            poolAuthorityA,
            poolAccountA: poolAccountA,
          })
          .rpc();
        return tx;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program],
  );

  // const creatorClaimAll = useCallback(
  //   async (memeId: string, mintaPublicKey: string, userCanClaimCount: number) => {
  //     if (!memooConfig || !program || !publicKey || !signTransaction) return;
  //     try {
  //       const nowBalance = await getBalance();
  //       if (nowBalance < 0.000001) {
  //         message.warning(`Insufficient balance in the wallet`, {
  //           key: 'Insufficient balance in the wallet to creatorClaimAll',
  //         });
  //         return;
  //       }
  //       const memeConfigId = new PublicKey(memeId);
  //       const mintAPublicKey = new PublicKey(mintaPublicKey);
  //       const memeUserDataPda = PublicKey.findProgramAddressSync(
  //         [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
  //         programId,
  //       )[0];
  //       const adminAccountAPda = getAssociatedTokenAddressSync(mintAPublicKey, publicKey, true);
  //       const poolAuthorityA = PublicKey.findProgramAddressSync(
  //         [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
  //         programId,
  //       )[0];
  //       const poolAccountA = getAssociatedTokenAddressSync(mintAPublicKey, poolAuthorityA, true);
  //       const instruction1 = await program.methods
  //         .creatorClaim(memeConfigId)
  //         .accounts({
  //           payer: publicKey,
  //           memooConfig: memooConfigPda,
  //           memeUserData: memeUserDataPda,
  //           creatorAccountA: adminAccountAPda,
  //           mintAccountA: mintAPublicKey,
  //           poolAuthorityA,
  //           poolAccountA: poolAccountA,
  //         })
  //         .instruction();
  //       const instruction2 = await program.methods
  //         .idoClaim(memeConfigId)
  //         .accounts({
  //           user: publicKey,
  //           memeUserData: memeUserDataPda,
  //           idoUserAccountA: adminAccountAPda,
  //           mintAccountA: mintAPublicKey,
  //           poolAuthorityA,
  //           poolAccountA: poolAccountA,
  //         })
  //         .instruction();

  //       const transaction = new Transaction().add(instruction1);
  //       if (userCanClaimCount > 0) {
  //         transaction.add(instruction2);
  //       }

  //       const latestBlockhash = await connection.getLatestBlockhash('finalized');
  //       transaction.recentBlockhash = latestBlockhash.blockhash;
  //       transaction.feePayer = publicKey;
  //       const signedTransaction = await signTransaction(transaction);
  //       const fee = await transaction.getEstimatedFee(connection);
  //       console.log('fee:', fee);
  //       const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
  //         skipPreflight: false,
  //         preflightCommitment: 'finalized',
  //       });
  //       return signature;
  //       // const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
  //       //   skipPreflight: true,
  //       // });

  //       // console.log('Transaction sent. Signature:', signature);
  //       // const confirmationStrategy = {
  //       //   signature: signature,
  //       //   blockhash: latestBlockhash.blockhash,
  //       //   lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  //       // };

  //       // const confirmation = await connection.confirmTransaction(confirmationStrategy, 'finalized');
  //       // console.log('confirmation:', confirmation);

  //       // if (confirmation.value.err) {
  //       //   throw new Error(`Transaction failed: ${confirmation.value.err?.toString()}`);
  //       // }
  //       // return confirmation;
  //     } catch (e) {
  //       console.log('error: ', e);
  //     }
  //   },
  //   [connection, publicKey, program],
  // );

  const getMemeUserData = useCallback(
    async (memeId: string) => {
      if (!program || !publicKey) return;
      try {
        console.log('getMemeUserData-memeID: ', memeId);
        // debugger;
        const memeConfigId = new PublicKey(memeId);
        const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        const memeUserData: MemeUserIdoData = (await program.account.memeUserIdoData.fetch(
          memeUserDataPda_idoBuy,
        )) as any;
        console.log('memeUserData: ', memeUserData);
        return memeUserData;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program],
  );
  const getMemeCreatorData = useCallback(
    async (memeId: string) => {
      console.log('getMemeCreatorData');
      // debugger;
      if (!memooConfig || !program || !publicKey) return;
      try {
        // debugger;
        const memeConfigId = new PublicKey(memeId);
        const memeConfigPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];
        const memeConfig: MemeConfig = (await program.account.memeConfig.fetch(memeConfigPda)) as any;
        const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), memeConfig.creator.toBuffer()],
          programId,
        )[0];
        const memeCreatorData: MemeUserIdoData = (await program.account.memeUserIdoData.fetch(
          memeUserDataPda_idoBuy,
        )) as any;
        console.log('memeCreatorData: ', memeCreatorData);
        return {
          memeConfig,
          memeCreatorData,
        };
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program],
  );

  const airdropClaim = useCallback(
    // eslint-disable-next-line max-params
    async (memeId: string, mintaPublicKey: string, msg: any, signature: Uint8Array, signerPublicKey: PublicKey) => {
      if (!memooConfig || !program || !publicKey || !signTransaction) return;
      try {
        const nowBalance = await getBalance();
        if (nowBalance < 0.004) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to creatorClaimAll',
          });
          return;
        }
        const memeConfigId = new PublicKey(memeId);
        const mintAPublicKey = new PublicKey(mintaPublicKey);
        const memeConfigPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];
        // const memeConfig: MemeConfig = (await program.account.memeConfig.fetch(memeConfigPda)) as any;
        const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        const idoBuyerAccountA = getAssociatedTokenAddressSync(mintAPublicKey, publicKey, true);

        const poolAuthority = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
          programId,
        )[0];
        const poolAccountA = getAssociatedTokenAddressSync(mintAPublicKey, poolAuthority, true);
        const transaction = new Transaction();
        const tx = await new AirdropTxns(program).createTx({
          memeId: memeConfigId,
          serialized: msg,
          signature,
          signerPublicKey,
          payer: publicKey,
          payerAccountA: idoBuyerAccountA,
          memeConfig: memeConfigPda,
          memeUserData: memeUserDataPda_idoBuy,
          mintAccountA: mintAPublicKey,
          poolAuthorityA: poolAuthority,
          poolAccountA: poolAccountA,
          addixEd25519Program: true,
        });
        transaction.add(tx);
        const txid = sendTxns(transaction);
        return txid;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program, signTransaction],
  );

  const teamMemberClaim = useCallback(
    async (
      memeId: string,
      mintaPublicKey: string,
      msg: any,
      signature: Uint8Array,
      signerPublicKey: PublicKey,
      teams: TeamQuota[],
      creatorPublickey: PublicKey,
    ) => {
      if (!memooConfig || !program || !publicKey || !signTransaction) return;
      try {
        const nowBalance = await getBalance();
        if (nowBalance < 0.004) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to creatorClaimAll',
          });
          return;
        }
        const memeConfigId = new PublicKey(memeId);
        const mintAPublicKey = new PublicKey(mintaPublicKey);
        const memeConfigPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];
        // const memeConfig: MemeConfig = (await program.account.memeConfig.fetch(memeConfigPda)) as any;
        const memeUserDataPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        console.log('creatorPublickey: ', creatorPublickey.toBase58());
        const memeCreatorDataPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), creatorPublickey.toBuffer()],
          programId,
        )[0];
        const idoBuyerAccountA = getAssociatedTokenAddressSync(mintAPublicKey, publicKey, true);

        const poolAuthority = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
          programId,
        )[0];
        const poolAccountA = getAssociatedTokenAddressSync(mintAPublicKey, poolAuthority, true);
        const transaction = new Transaction();
        const creatorsTokenAtas = teams.map((c) => {
          let pda = getAssociatedTokenAddressSync(mintAPublicKey, new PublicKey(c.teamAddress), true);
          console.log(`creator address : ${c.teamAddress}, pda: ${pda}`);
          return pda;
        });
        const tx2 = await new TeamClaimTxns(program).createTx({
          memeId: memeConfigId,
          serialized: msg,
          signature,
          signerPublicKey,
          payer: publicKey,
          memooConfig: memooConfigPda,
          payerAccountA: idoBuyerAccountA,
          memeConfig: memeConfigPda,
          memeUserData: memeUserDataPda,
          mintA: mintAPublicKey,
          poolAuthority: poolAuthority,
          poolAccountA: poolAccountA,
          creator: creatorPublickey,
          memeUserDataCreator: memeCreatorDataPda,
          addixEd25519Program: true,
          creatorsTokenAtas,
          teams,
        });
        // transaction.add(tx1);
        transaction.add(tx2);
        const tx = sendTxns(transaction);
        return tx;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program, signTransaction],
  );
  const teamCreatorClaim = useCallback(
    async (
      memeId: string,
      mintaPublicKey: string,
      msg: any,
      signature: Uint8Array,
      signerPublicKey: PublicKey,
      teams: TeamQuota[],
      creatorPublickey: PublicKey,
    ) => {
      if (!memooConfig || !program || !publicKey || !signTransaction) return;
      try {
        const nowBalance = await getBalance();
        if (nowBalance < 0.004) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to creatorClaimAll',
          });
          return;
        }
        const memeConfigId = new PublicKey(memeId);
        const mintAPublicKey = new PublicKey(mintaPublicKey);
        const memeConfigPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];
        // const memeConfig: MemeConfig = (await program.account.memeConfig.fetch(memeConfigPda)) as any;
        const idoBuyerAccountA = getAssociatedTokenAddressSync(mintAPublicKey, publicKey, true);

        const poolAuthority = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
          programId,
        )[0];
        const poolAccountA = getAssociatedTokenAddressSync(mintAPublicKey, poolAuthority, true);
        const transaction = new Transaction();
        const creatorsTokenAtas = teams.map((c) => {
          let pda = getAssociatedTokenAddressSync(mintAPublicKey, new PublicKey(c.teamAddress), true);
          console.log(`creator address : ${c.teamAddress}, pda: ${pda}`);
          return pda;
        });
        const memeUserDataPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        const adminAccountAPda = getAssociatedTokenAddressSync(mintAPublicKey, publicKey, true);
        const poolAuthorityA = PublicKey.findProgramAddressSync(
          [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
          programId,
        )[0];
        const memeCreatorDataPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), creatorPublickey.toBuffer()],
          programId,
        )[0];

        const tx = await new TeamClaimTxns(program).createTx({
          memeId: memeConfigId,
          serialized: msg,
          signature,
          signerPublicKey,
          payer: publicKey,
          memooConfig: memooConfigPda,
          payerAccountA: idoBuyerAccountA,
          memeConfig: memeConfigPda,
          memeUserData: memeUserDataPda,
          memeUserDataCreator: memeCreatorDataPda,
          mintA: mintAPublicKey,
          poolAuthority: poolAuthority,
          poolAccountA: poolAccountA,
          creator: creatorPublickey,
          addixEd25519Program: true,
          creatorsTokenAtas,
          teams,
        });
        transaction.add(tx);
        console.log('memeConfigId: ', memeConfigId.toBase58());
        const instruction1 = await program.methods
          .creatorClaim(memeConfigId)
          .accounts({
            payer: publicKey,
            memooConfig: memooConfigPda,
            memeConfig: memeConfigPda,
            memeUserData: memeUserDataPda,
            creatorAccountA: adminAccountAPda,
            mintAccountA: mintAPublicKey,
            poolAuthorityA,
            poolAccountA: poolAccountA,
          })
          .instruction();
        transaction.add(instruction1);
        const txid = sendTxns(transaction);
        return txid;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, memooConfig, program, signTransaction],
  );
  const refundClaim = useCallback(
    async (memeId: string) => {
      debugger;
      if (!memooConfig || !program || !publicKey) return;
      try {
        const nowBalance = await getBalance();

        if (nowBalance < 0.004) {
          message.warning(`Insufficient balance in the wallet`, {
            key: 'Insufficient balance in the wallet to creatorClaimAll',
          });
          return;
        }
        const memeConfigId = new PublicKey(memeId);
        const memeConfigPda = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_config'), memeConfigId.toBuffer()],
          programId,
        )[0];
        // const memeConfig: MemeConfig = (await program.account.memeConfig.fetch(memeConfigPda)) as any;
        const memeUserDataPda_idoBuy = PublicKey.findProgramAddressSync(
          [Buffer.from('meme_user_data'), memeConfigId.toBuffer(), publicKey.toBuffer()],
          programId,
        )[0];
        const idoBuyWSolAtas = getAssociatedTokenAddressSync(NATIVE_MINT, publicKey, true);

        const poolAuthority = PublicKey.findProgramAddressSync(
          // [Buffer.from('authority'), memeConfigId.toBuffer(), mintAPublicKey.toBuffer()],
          [Buffer.from('authority'), memeConfigId.toBuffer(), NATIVE_MINT.toBuffer()],
          programId,
        )[0];
        const poolAccountA = getAssociatedTokenAddressSync(NATIVE_MINT, poolAuthority, true);
        const tx = await program.methods
          .refund(memeConfigId)
          .accounts({
            payer: publicKey,
            memeConfig: memeConfigPda,
            memeUserData: memeUserDataPda_idoBuy,
            poolAuthorityWsol: poolAuthority,
            poolAccountWsol: poolAccountA,
            userWsolAccount: idoBuyWSolAtas,
            wsolMint: NATIVE_MINT,
          })
          .rpc();
        return tx;
      } catch (e) {
        console.log('error: ', e);
      }
    },
    [connection, publicKey, program, memooConfig],
  );

  return {
    address: publicKey,
    registerTokenMint,
    memooConfig,
    // getMemooConfig,
    idoBuy,
    creatorClaim,
    // creatorClaimAll,
    idoClaim,
    getMemeUserData,
    getMemeCreatorData,
    airdropClaim,
    useAddress,
    teamMemberClaim,
    teamCreatorClaim,
    refundClaim,
  };
};

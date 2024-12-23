/* eslint-disable no-debugger */
import { useMemo } from 'react';
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program, BN, Idl } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { Memoo } from '@/contracts/idl/memoo';

export function useAnchorProgram(programId: PublicKey, idl: Idl) {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const provider = useMemo(() => {
    if (!wallet) return null;
    return new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
  }, [connection, wallet, AnchorProvider]);

  const program = useMemo<Program<Memoo> | null>(() => {
    if (!provider) return null;
    return new Program<Memoo>(idl as any, programId, provider);
  }, [provider, programId, idl]);

  return program;
}

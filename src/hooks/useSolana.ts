import { useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { uint8ArrayToBase64 } from '@/utils';

export const useSolana = () => {
  const { publicKey, wallet, connect, disconnect, signMessage } = useWallet();

  const getSign = useCallback(async () => {
    if (!wallet || !signMessage) return;
    const msg = String(Date.now());
    const encodedMessage = new TextEncoder().encode(msg);
    const rawSignature = await signMessage(encodedMessage);
    return { rawSignature: uint8ArrayToBase64(rawSignature), msg };
  }, [wallet, signMessage]);

  return {
    connect,
    disconnect,
    getSign,
  };
};

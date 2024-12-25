import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useMatches } from 'react-router-dom';
import styles from './index.module.scss';
import { useLogin } from '@/hooks/useLogin';
import { MEMOO_TOKEN_STORAGE, SOL_DEMO_SPL_USDC } from '@/contracts';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import useStore from '@/store';
import Tabbar from '@/components/TabBar';

interface RouteHandle {
  showTabBar?: boolean;
}
const BasicLayout: React.FC = () => {
  // const [connected, setConnected] = useState(false);
  const { loginMeme } = useLogin();
  const { connected, publicKey, disconnect, wallet } = useWallet();
  const location = useLocation();
  const navigate = useNavigate();
  const { pubKey, setPubKey } = useStore();
  const matches = useMatches();

  useEffect(() => {
    if (wallet && wallet.adapter && wallet.adapter.connected !== connected) {
      disconnect();
      localStorage.removeItem(MEMOO_TOKEN_STORAGE);
    }
  }, [wallet, connected]);

  useEffect(() => {
    const isChangePublickey = publicKey?.toBase58() === pubKey;
    console.log('publicKey?.toBase58(): ', publicKey?.toBase58());
    console.log('publicKey: ', pubKey);
    console.log(isChangePublickey);
    const token = localStorage.getItem(MEMOO_TOKEN_STORAGE);

    if (connected && (!token || !isChangePublickey)) {
      (async () => {
        await loginMeme();
        if (publicKey) {
          setPubKey(publicKey?.toBase58());
          console.log('publicKey: ', publicKey?.toBase58());
          window.location.reload();
        }
      })();
    }
  }, [connected, publicKey]);

  const currentRoute = matches.find((match) => (match.handle as RouteHandle)?.showTabBar !== undefined);
  const showTabBar = (currentRoute?.handle as RouteHandle)?.showTabBar ?? false;
  console.log('currentRoute:', currentRoute);
  console.log('location.pathname:', location.pathname);
  console.log('showTabBar:', showTabBar);
  return (
    <div>
      <div className={styles.content}>
        <Outlet />
      </div>
      {showTabBar && <Tabbar />}
    </div>
  );
};

export default BasicLayout;

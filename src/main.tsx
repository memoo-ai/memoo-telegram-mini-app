import './assets/styles/global.scss';
import './assets/styles/mobile.scss';
import { Suspense, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import routeConfig from './router';
import Loading from './components/Loading';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { clusterApiUrl, Connection } from '@solana/web3.js';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import isMobile from 'is-mobile';
import eruda from 'eruda';
// import { JupiterProvider } from '@jup-ag/react-hook';

// const { network, endpoint, wallets } = solanaNetwork();
const App = () => {
  const basename = '/';
  const router = createBrowserRouter(routeConfig, {
    basename,
    // future: {
    //   v7_skipActionErrorRevalidation: true,
    // },
  });
  // const root = createRoot(document.querySelector('#app')!);
  const queryClient = new QueryClient();
  // debugger; // eslint-disable-line no-debugger
  // const cluster = import.meta.env.VITE_WALLET_ADAPTER_NETWORK; // Use WalletAdapterNetwork.Mainnet for mainnet
  // const endpoint = clusterApiUrl(network);
  const network = import.meta.env.VITE_RPC_URL;
  const endpoint = import.meta.env.VITE_RPC_URL;
  // ,
  // const connection = new Connection(network);
  // const { publicKey } = useWallet();
  // const wallets = useMemo(
  //   () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network }), new TorusWalletAdapter()],
  //   [network],
  // );
  const wallets = useMemo(
    () => [
      // new PhantomWalletAdapter(),
      // new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [network],
  );

  useEffect(() => {
    if (import.meta.env.MODE !== 'production') {
      eruda.init();
    }
  }, []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#07E993',
                  borderRadius: 2,
                  colorBgContainer: '#f6ffed',
                },
              }}
            >
              <Suspense fallback={<Loading />}>
                <RouterProvider router={router} />
              </Suspense>
            </ConfigProvider>
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
const root = createRoot(document.querySelector('#app')!);
root.render(<App />);

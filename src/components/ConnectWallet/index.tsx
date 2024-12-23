import { Button } from 'antd';
import { useState } from 'react';
import ConnectWalletModal from './connectWalletModal';
import { useAccount } from '@/hooks/useWeb3';
import { clipAddress } from '@/utils';
import './index.scss';

const ConnectWallet = () => {
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const { address } = useAccount();
  return (
    <div className="">
      <Button className="font-404px memoo_button" onClick={() => setOpenWalletModal(true)} disabled={!!address}>
        {address ? clipAddress(address?.toBase58()) : 'Connect Wallet'}
      </Button>
      <ConnectWalletModal open={openWalletModal} onClose={() => setOpenWalletModal(false)} />
    </div>
  );
};

export default ConnectWallet;

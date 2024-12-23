import { Modal } from 'antd';
import './connectWalletModal.scss';
import CloseIcon from '../CloseIcon';
import { connect as connectLib, DEEPLINK_BASE_URL } from '@/utils/phantomMiniAppSDK';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

interface ConnectWalletModalProps {
  open: boolean;
  onClose: () => void;
}

const termAndConditions = import.meta.env.VITE_LINK_TERMS_AND_CONDITIONS;
const ConnectWalletModal = ({ open, onClose }: ConnectWalletModalProps) => {
  const { connect, connectBySchema } = connectLib;
  const connectPhantom = async () => {
    const keyPair = nacl.box.keyPair();

    const publicKey = keyPair.publicKey;
    const privateKey = keyPair.secretKey;
    const publicKeyBase64 = naclUtil.encodeBase64(publicKey);
    const privateKeyBase64 = naclUtil.encodeBase64(privateKey);
    console.log('publicKey: ', new PublicKey(publicKey).toString());
    console.log('publicKeyBase64: ', publicKeyBase64);
    console.log('privateKeyBase64: ', privateKeyBase64);
    const params = {
      app_url: encodeURIComponent('https://sol-alpha.memoo.ai'),
      dapp_encryption_public_key: bs58.encode(publicKey),
      redirect_link: encodeURIComponent('https://t.me/TestPhantomMiniAppbot/moo_mo'),
      cluster: 'devnet' as const,
    };
    const res = await connectBySchema(params);
    window.open(res);
  };
  const wallets = [
    {
      name: 'Phantom',
      icon: '/phantom.svg',
      connect: connectPhantom,
    },
  ];
  return (
    <Modal
      className="memoo_modal"
      title=""
      open={open}
      onClose={onClose}
      footer={null}
      closeIcon={<CloseIcon onClick={onClose} />}
    >
      <div>
        <div className="flex items-center flex-col justify-center gap-y-4">
          <div className="flex flex-col w-full items-center gap-y-2">
            <img className="w-14 h-14" src="/logo.svg" alt="" />
            <div className="connect-to-memoo text-center w-max font-404px text-base">Connect to MeMoo</div>
          </div>
          <div className="w-full">
            {wallets.map((wallet) => (
              <div
                key={wallet.name}
                className="flex items-center justify-start gap-x-3.5 py-2.5 px-4 w-full bg-[#2B526E] rounded-[7px]"
                onClick={wallet.connect}
              >
                <img src={wallet.icon} alt="" />
                <span className="font-404px text-12-12 text-white">{wallet.name}</span>
              </div>
            ))}
          </div>
          <p className="text-8-12 text-white whitespace-pre-wrap text-center">
            {`By connecting your wallet and using MeMoo,\nyou agree to our `}
            <a
              href={termAndConditions}
              target="_blank"
              className="text-green hover:text-green cursor-pointer text-center"
            >
              Terms of Service.
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;

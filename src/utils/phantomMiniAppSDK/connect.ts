import axios from 'axios';
import { DEEPLINK_BASE_URL, RejectResponse, DEEPLINK_BASE_SCHEMA_URL } from '.';
import { objectToUrlParams } from './util';

// app_url (required): A url used to fetch app metadata (i.e. title, icon) using the same properties found in Displaying Your App. URL-encoded.
// dapp_encryption_public_key (required): A public key used for end-to-end encryption. This will be used to generate a shared secret. For more information on how Phantom handles shared secrets, please review Encryption.
// redirect_link (required): The URI where Phantom should redirect the user upon connection. Please review Specifying Redirects for more details. URL-encoded.
// cluster (optional): The network that should be used for subsequent interactions. Can be either: mainnet-beta, testnet, or devnet. Defaults to mainnet-beta.
interface ConnectParams {
  app_url: string; // https://your-dapp-url.com
  dapp_encryption_public_key: string;
  redirect_link: string; // https://t.me/your_channel
  cluster?: 'devnet' | 'mainnet-beta' | 'testnet';
}

interface ConnectResponse {
  // content of decrypted `data`-parameter
  // base58 encoding of user public key
  // example 'BSFtCudCd4pR4LSFqWPjbtXPKSNVbGkc35gRNdnqjMCU'
  public_key: string;

  // session token for subsequent signatures and messages
  // dapps should send this with any other deeplinks after connect
  session: string;
}

function connect(params: ConnectParams) {
  return axios.get<ConnectResponse | RejectResponse>(`${DEEPLINK_BASE_URL}/connect`, { params });
}

function connectBySchema(params: ConnectParams) {
  return `${DEEPLINK_BASE_SCHEMA_URL}/connect?${objectToUrlParams(params)}`;
}

export default { connect, connectBySchema };

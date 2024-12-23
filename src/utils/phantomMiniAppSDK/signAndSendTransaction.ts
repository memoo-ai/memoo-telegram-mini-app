import axios from 'axios';
import { DEEPLINK_BASE_SCHEMA_URL, DEEPLINK_BASE_URL, RejectResponse } from '.';
import { objectToUrlParams } from './util';

// dapp_encryption_public_key (required): The original encryption public key used from the app side for an existing Connect session.
// nonce (required): A nonce used for encrypting the request, encoded in base58.
// redirect_link (required): The URI where Phantom should redirect the user upon completion. Please review Specifying Redirects for more details. URL-encoded.
// payload (required): An encrypted JSON string with the following fields:
interface SignAndSendTransactionParams {
  dapp_encryption_public_key: string;
  nonce: string;
  redirect_link: string;

  // transaction (required): The transaction that Phantom will sign and submit, serialized and encoded in base58.
  // sendOptions (optional): An optional object that specifies options for how Phantom should submit the transaction. This object is defined in Solana web3.js.
  // session (required): The session token received from the Connect method. Please see Handling Sessions for more details.
  payload: {
    transaction: string; // serialized transaction, base58-encoded
    sendOptions?: string; // an optional Solana web3.js sendOptions object
    session: string; // token received from the connect method
  };
}

// content of decrypted `data`-parameter
interface SignAndSendTransactionResponse {
  signature: string; // transaction-signature
}

function signAndSendTransaction(params: SignAndSendTransactionParams) {
  return axios.get<SignAndSendTransactionResponse | RejectResponse>(`${DEEPLINK_BASE_URL}/signAndSendTransaction`, {
    params,
  });
}

function signAndSendTransactionBySchema(params: SignAndSendTransactionParams) {
  return `${DEEPLINK_BASE_SCHEMA_URL}/signAndSendTransaction?${objectToUrlParams(params)}`;
}

export default { signAndSendTransaction, signAndSendTransactionBySchema };

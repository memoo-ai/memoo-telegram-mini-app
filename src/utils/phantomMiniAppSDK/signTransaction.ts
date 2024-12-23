import axios from 'axios';
import { DEEPLINK_BASE_SCHEMA_URL, DEEPLINK_BASE_URL, RejectResponse } from '.';
import { objectToUrlParams } from './util';

// dapp_encryption_public_key (required): The original encryption public key used from the app side for an existing Connect session.
// nonce (required): A nonce used for encrypting the request, encoded in base58.
// redirect_link (required): The URI where Phantom should redirect the user upon completion. Please review Specifying Redirects for more details. URL-encoded.
// payload (required): An encrypted JSON string with the following fields:
interface SignTransactionParams {
  dapp_encryption_public_key: string;
  nonce: string;
  redirect_link: string;

  // transaction (required): The transaction that Phantom will sign, serialized and encoded in base58.
  // session (required): The session token received from the Connect method. Please see Handling Sessions for more details.
  payload: {
    transaction: string; // serialized transaction, bs58-encoded
    session: string; // token received from connect-method
  };
}

// content of decrypted `data`-parameter
interface SignTransactionResponse {
  transaction: string; // signed serialized transaction, bs58-encoded
}

function signTransaction(params: SignTransactionParams) {
  return axios.get<SignTransactionResponse | RejectResponse>(`${DEEPLINK_BASE_URL}/signTransaction`, {
    params,
  });
}

function signTransactionBySchema(params: SignTransactionParams) {
  return `${DEEPLINK_BASE_SCHEMA_URL}/signTransaction?${objectToUrlParams(params)}`;
}

export default { signTransaction, signTransactionBySchema };

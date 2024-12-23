import axios from 'axios';
import { DEEPLINK_BASE_SCHEMA_URL, DEEPLINK_BASE_URL, RejectResponse } from '.';
import { objectToUrlParams } from './util';

// dapp_encryption_public_key (required): The original encryption public key used from the app side for an existing Connect session.
// nonce (required): A nonce used for encrypting the request, encoded in base58.
// redirect_link (required): The URI where Phantom should redirect the user upon completion. Please review Specifying Redirects for more details. URL-encoded.
// payload (required): An encrypted JSON string with the following fields:
interface SignMessageParams {
  dapp_encryption_public_key: string;
  nonce: string;
  redirect_link: string;

  // message (required): The message that should be signed by the user, encoded in base58. Phantom will display this message to the user when they are prompted to sign.
  // session (required): The session token received from the Connect method. Please see Handling Sessions for more details.
  // display (optional): How you want us to display the string to the user. Defaults to utf8
  payload: {
    message: string; // the message, base58 encoded
    session: string; // token received from connect-method
    display?: 'utf8' | 'hex'; // the encoding to use when displaying the message
  };
}

// content of decrypted `data`-parameter
interface SignMessageResponse {
  signature: string; // message-signature
}

function signMessage(params: SignMessageParams) {
  return axios.get<SignMessageResponse | RejectResponse>(`${DEEPLINK_BASE_URL}/signMessage`, {
    params,
  });
}

function signMessageBySchema(params: SignMessageParams) {
  return `${DEEPLINK_BASE_SCHEMA_URL}/signMessage?${objectToUrlParams(params)}`;
}

export default { signMessage, signMessageBySchema };

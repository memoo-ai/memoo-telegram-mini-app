import axios from 'axios';
import { DEEPLINK_BASE_SCHEMA_URL, DEEPLINK_BASE_URL, RejectResponse } from '.';
import { objectToUrlParams } from './util';

// dapp_encryption_public_key (required): The original encryption public key used from the app side for an existing Disconnect session.
// nonce (required): A nonce used for encrypting the request, encoded in base58.
// redirect_link (required): The URI where Phantom should redirect the user upon completion. Please review Specifying Redirects for more details. URL-encoded.
// payload (required): An encrypted JSON string with the following fields:
interface DisconnectParams {
  dapp_encryption_public_key: string;
  nonce: string;
  redirect_link: string;
  payload: {
    session: string; // token received from the connect method
  };
}

type DisconnectResponse = null;

function disconnect(params: DisconnectParams) {
  return axios.get<DisconnectResponse | RejectResponse>(`${DEEPLINK_BASE_URL}/disconnect`, { params });
}

function disconnectBySchema(params: DisconnectParams) {
  return `${DEEPLINK_BASE_SCHEMA_URL}/disconnect?${objectToUrlParams(params)}`;
}

export default { disconnect, disconnectBySchema };

export interface RejectResponse {
  errorCode: string;
  errorMessage: string;
}

export const DEEPLINK_BASE_URL = 'https://phantom.app/ul/v1';

export const DEEPLINK_BASE_SCHEMA_URL = 'phantom://v1';

export { default as connect } from './connect';

export { default as disconnect } from './disconnect';

export { default as signAndSendTransaction } from './signAndSendTransaction';

export { default as signAllTransactions } from './signAllTransactions';

export { default as signTransaction } from './signTransaction';

export { default as signMessage } from './signMessage';

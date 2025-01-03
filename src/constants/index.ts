import BigNumber from 'bignumber.js';

const nodeType = import.meta.env.VITE_NODE_TYPE;

export const ZERO_ADDRESS = `0x${String(0).repeat(40)}`;
export const zeroBN = new BigNumber(0);
export const ZERO = zeroBN;
export const DEFAULT_IDO_LIMIT = 100;

export const REQUEST_FOLLOWING_STORAGE = 'REQUEST_FOLLOWING_STORAGE';
export const MEMOO_TOKEN_STORAGE = 'MEMOO_TOKEN_STORAGE';
export const UPDATE_PROJECT_TWITTER_STORAGE = 'UPDATE_PROJECT_TWITTER_STORAGE';
export const EDIT_INFO_STORAGE = 'EDIT_INFO_STORAGE';

// Solana
export const SOL_DEMO_SPL_USDC = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';

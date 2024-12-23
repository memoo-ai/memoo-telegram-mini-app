/* eslint-disable no-debugger */
import BigNumber from 'bignumber.js';
import toast from 'react-hot-toast';
import numeral from 'numeral';
import Decimal from 'decimal.js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Address } from '@/types';
import { getTwitterClientId } from '@/api/token';
import qs from 'qs';
import { REQUEST_FOLLOWING_STORAGE } from '@/constants';
import message from '@/components/IMessage';

const BASE_SCREEN_WIDTH = import.meta.env.BASE_SCREEN_WIDTH;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function handleCopy(str: string, className?: string) {
  if (!str) return;
  navigator.clipboard
    .writeText(str)
    .then(() => {
      console.log('Text copied to clipboard');
      message.success('Copied', { className, key: 'copy' });
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
}

export function formatNumberDecimal(value: number, decimal = 2) {
  let arr = String(value).split('.');
  if (arr.length === 2) {
    arr[1] = arr[1].substring(0, decimal);

    return Number(arr.join('.')) || 0;
  }

  return value;
}

export function formatNumberWithSymbol(value: number, symbol = '', formatter = '0,0') {
  let formatValue = '';

  if (value && value < 0.01) {
    formatValue = !symbol ? `<0.01` : symbol === '$' ? '<$0.01' : `<0.01 ${symbol}`;
  } else {
    formatValue = value ? numeral(formatNumberDecimal(value)).format(formatter) : '0';
    formatValue = !symbol ? formatValue : symbol === '$' ? `$${formatValue}` : `${formatValue} ${symbol}`;
  }

  return formatValue;
}

export function formatHashAddress(hash: string, start = 6, end = 4) {
  let str = '';

  if (hash) {
    str = `${hash.substring(0, start)}...${hash.substring(hash.length - end)}`;
  }

  return str;
}

export const formatNumber = (symbol: string, numberString: string): string => {
  const number = parseFloat(numberString);
  if (isNaN(number)) {
    return '-';
  }

  const decimalValue = new Decimal(numberString);
  let result: Decimal;

  switch (symbol) {
    case 'USDC':
    case 'USDT':
      result = decimalValue.div(Math.pow(10, 6));
      break;
    case 'WBTC':
      result = decimalValue.div(Math.pow(10, 8));
      break;
    case 'DAI':
      result = decimalValue.div(Math.pow(10, 18));
      break;
    default:
      result = decimalValue;
      break;
  }

  const minValue = symbol === 'WBTC' ? 0.0001 : 0.01;
  return result.lessThan(minValue) ? `<${minValue}` : result?.toString();
};

export function getFullNum(num: number) {
  if (isNaN(num) || !num) {
    return '0';
  }
  let str = String(num);
  if (!/e/i.test(str)) {
    return str;
  }
  return num.toFixed(18).replace(/\.?0+$/, '');
}

export function formatNumberDecimals(num: number, decimals: number) {
  const str = getFullNum(num);
  const arr = str.split('.');
  if (arr.length === 2) {
    arr[1] = arr[1].substring(0, decimals);
    return String(parseFloat(arr.join('.')));
  } else {
    return str;
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function clipAddress(address: string, a = 5, b = 4) {
  return `${address.slice(0, a)}...${address.slice(-b)}`;
}

export function formatTs(ts: number, unit: 's' | 'ms' = 's', type: 'default' | 'monthAndDay' = 'default') {
  const date = new Date((ts ?? 0) * (unit === 's' ? 1000 : 1));
  const options: Intl.DateTimeFormatOptions =
    type === 'default' ? { day: '2-digit', month: 'short', year: 'numeric' } : { day: '2-digit', month: 'short' };
  return ts === 0 ? '' : date.toLocaleDateString('en-GB', options);
  // return ts === 0 ? '' : date.toLocaleDateString('en-US', options);
}

export function compareAddrs(addrA: Address, addrB: Address) {
  if (!addrA || !addrB) return false;
  return new RegExp(addrA, 'i').test(addrB ?? '');
}

export function extractDomainName(url: string) {
  const pattern = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
  const matches = url.match(pattern);
  if (matches?.[1]) {
    const domain = matches[1];
    const parts = domain.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 2];
    }
  }
  return null;
}

export const formatDecimals = (source: BigNumber.Value, decimals = 10, stripZeros = true): string => {
  let result = new BigNumber(source).decimalPlaces(decimals, BigNumber.ROUND_HALF_EVEN).toFixed(decimals);
  if (stripZeros) {
    result = result.replace(/\.?0+$/, '');
  }
  return result;
};

export function calculateDaysDifference(a: number, b: number): number {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const dateA = new Date(a);
  const dateB = new Date(b);
  const timeDifference = Math.abs(dateB.getTime() - dateA.getTime());
  const daysDifference = Math.floor(timeDifference / millisecondsPerDay);
  return daysDifference;
}

export const authorizeTwitter = async (
  clientId: string,
  redirectUri: string,
  scope = 'tweet.read+tweet.write+like.write+users.read+follows.read+follows.write',
  state = 'twitter',
  codeChallenge = 'challenge',
  codeChallengeMethod = 'plain',
  // eslint-disable-next-line max-params
) => {
  const params = {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope,
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: codeChallengeMethod,
  };

  const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?${new URLSearchParams(params)?.toString()}`;

  const newWindow = window.open(twitterAuthUrl, '_blank', 'width=600,height=700');
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    message.warning('To proceed, please allow pop-ups on this browser');
  }
};

export const authorizeTwitterMobile = async (clientId: string, redirectUri: string) => {
  // const twitterRedirectUri = import.meta.env.VITE_TWITTER_FOLLOW_REDIRECT_URI;
  const params = {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'tweet.read%20tweet.write%20like.write%20users.read%20follows.read%20follows.write',
    state: 'twitter',
    code_challenge: 'challenge',
    code_challenge_method: 'plain',
  };
  const url = new URL(`https://twitter.com/i/oauth2/authorize`);
  url.search = qs.stringify(params, { encode: false });

  window.location.href = url.href;
};

export function formatRestTime(timestamp: number) {
  const seconds = Math.floor(timestamp / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + ' days';
  } else if (hours > 0) {
    return hours + ' hours';
  } else if (minutes > 0) {
    return minutes + ' mins';
  } else {
    return seconds + ' secs';
  }
}
export function getNumberOrDefault(value: any): number {
  return !isNaN(Number(value)) ? Number(value) : 0;
}
export function getRandomColor(itemCount = 18) {
  const colors = [
    '#F97F7F',
    '#F6D8D5',
    '#07E993',
    '#F0C760',
    '#14FCFC',
    '#85ABFE',
    '#FF8C56',
    '#D8FAB4',
    '#F046FF',
    '#99F7B8',
    '#FF5858',
    '#BAD5F7',
    '#FECC2E',
    '#F8FE52',
    '#CEAFFF',
    '#A565FF',
    '#94FD32',
    '#FDA5EE',
    '#3CFDD0',
    '#18FC27',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
// export function getRandomColor() {
//   // const randomHue = Math.floor(Math.random() * 12) * 30;
//   const randomHue = Math.floor(Math.random() * 4) * 90;
//   const randomColor = `hsl(${randomHue}, 100%, 85%)`;
//   return randomColor;
// }
// export function getRandomColor() {
//   const minBrightness = 50;
//   const maxBrightness = 90;
//   const randomBrightness = minBrightness + Math.random() * (maxBrightness - minBrightness);
//   const randomColor = `hsl(${Math.random() * 360}, 100%, ${randomBrightness}%)`;
//   return randomColor;
// }
export function uint8ArrayToBase64(uint8Array: Uint8Array) {
  let binaryString = '';
  const bytes = new Uint8Array(uint8Array);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}
export function base64ToUint8Array(hexString: string) {
  if (hexString.length % 2 !== 0) {
    throw new Error('Hex string must have an even number of characters');
  }

  let arrayBuffer = new Uint8Array(hexString.length / 2);

  for (let i = 0; i < hexString.length; i += 2) {
    arrayBuffer[i / 2] = parseInt(hexString.substr(i, 2), 16);
  }

  return arrayBuffer;
}

export function formatNumberToFixed(input: string | number): string {
  const number = parseFloat(input?.toString());

  if (isNaN(number)) {
    return '0';
  }

  const rounded = number.toFixed(2);

  return parseFloat(rounded)?.toString();
}

export function popupSharing(url: string) {
  window.open(url, '_blank', 'width=600,height=700');
}

export function formatRatioToPercentage(a: number | string | BigNumber, b: number | string | BigNumber): number {
  const bigA = new BigNumber(a);
  const bigB = new BigNumber(b);
  if (bigB.isZero()) {
    return 0;
  }
  const result = bigA.multipliedBy(100).dividedBy(bigB);

  return Number(result.toFixed(0));
}
// export function formatRatioToPercentage(a: number | string, b: number | string) {
//   if (b === 0) {
//     return 0;
//   }
//   const result = (Number(a) * 100) / Number(b);
//   return result.toFixed(0) ?? 0;
// }
export function getBase64FromImageUrl(url: string, callback: Function) {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx!.drawImage(img, 0, 0, img.width, img.height);

    const dataURL = canvas.toDataURL('image/png');
    callback(dataURL);
  };
  img.onerror = function () {
    callback(null);
  };
  img.src = url;
}
export function formatAddress(address: string, startLength = 4, endLength = 4): string {
  if (address.length <= startLength + endLength) {
    return address;
  }
  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);
  return `${start}...${end}`;
}
export function isEven(number: number) {
  return number % 2 === 0;
}
export function isProd() {
  return import.meta.env.MODE === 'production';
}
export function validateSocialLink(url: string, type: 'telegram' | 'discord' | 'twitter') {
  const regexMap = {
    telegram: /^(https?:\/\/)?(www\.)?(t\.me|telegram\.me)\/[a-zA-Z0-9_]+$/,
    discord: /^(https?:\/\/)?(www\.)?(discord\.gg|discord\.com)\/.+$/,
    twitter: /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/\d+$/,
  };

  const regex = regexMap[type];

  if (regex) {
    return { valid: regex.test(url), type };
  } else {
    return { valid: false, type: null };
  }
}

const routeMap: Record<string, string> = {
  home: import.meta.env.VITE_ROUTE_HOME,
  gecko: import.meta.env.VITE_ROUTE_GECKO,
  launchpad: import.meta.env.VITE_ROUTE_LAUNCHPAD,
  dashboard: import.meta.env.VITE_ROUTE_DASHBOARD,
  create: import.meta.env.VITE_ROUTE_CREATE,
  join: import.meta.env.VITE_ROUTE_JOIN,
  airdrop: import.meta.env.VITE_ROUTE_AIRDROP,
  twitterCallback: import.meta.env.VITE_ROUTE_TWITTER_CALLBACK,
  profile: import.meta.env.VITE_ROUTE_PROFILE,
};
type RouteParams = Record<string, string | number>;
export function getActualPath(route: string, params?: RouteParams): string {
  const pathTemplate = routeMap[route];

  if (!pathTemplate) {
    throw new Error(`Route ${route} not found`);
  }
  return pathTemplate.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    return String(params?.[key] || '');
  });
}
export function calculateTimeDifference(timestamp: number) {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = currentTime - timestamp;

  const secondsPassed = timeDifference;
  const minutesPassed = Math.floor(secondsPassed / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);
  const daysPassed = Math.floor(secondsPassed / (24 * 3600));

  return {
    seconds: secondsPassed,
    minutes: minutesPassed,
    hours: hoursPassed,
    days: daysPassed,
  };
}
export function formatTimeDisplay(timestamp: number) {
  const timeDiff = calculateTimeDifference(timestamp);

  if (timeDiff.seconds < 60) {
    return `${timeDiff.seconds}s`;
  } else if (timeDiff.minutes < 60) {
    return `${timeDiff.minutes}m`;
  } else {
    return `${timeDiff.hours}h`;
  }
}
export function formatPxToVw(px: number) {
  if (typeof px !== 'number' || isNaN(px)) {
    console.error('Invalid input: px should be a number');
    return '0vw';
  }
  if (BASE_SCREEN_WIDTH === 0) {
    console.error('BASE_SCREEN_WIDTH cannot be zero');
    return '0vw';
  }
  return `${((px / BASE_SCREEN_WIDTH) * 100).toFixed(2)}vw`;
}
export function getPercentage(score: number, ranges: { key: number; value: number }[]) {
  const range = ranges.find((range, index) => {
    const max = index === 0 ? Infinity : ranges[index - 1].key;
    return score >= range.key && score < max;
  });
  if (range) {
    const max = ranges.find((r, index) => index === ranges.indexOf(range) - 1)?.key || Infinity;
    const percentage = max === Infinity ? 100 : ((score - range.key) / (max - range.key)) * 100;
    return Math.min(percentage, 100).toFixed(2);
  }

  return 0;
}
export function getLevel(score: number, ranges: { key: number; value: number }[]) {
  if (!score) return 0;

  for (const { key, value } of ranges) {
    if (score <= key) {
      return value;
    }
  }

  return 0;
}
export function base64ToFile(base64: string, fileName: string) {
  const base64Data = base64.split(',')[1];
  const contentType = base64.split(',')[0].split(':')[1].split(';')[0];

  const binaryString = atob(base64Data);
  const arrayBuffer = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    arrayBuffer[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([arrayBuffer], { type: contentType });
  return new File([blob], fileName, { type: contentType });
}
// function formatLargeNumber(num: number) {
//   const units = ['', 'K', 'Mil', 'B', 'T'];
//   let unitIndex = 0;

//   while (num >= 1000) {
//     num /= 1000;
//     unitIndex++;
//   }

//   return num.toFixed(2).replace(/\.00$/, '') + units[unitIndex];
// }
export function formatToMillion(num: number) {
  if (num < 1e6) return num.toString();
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(num);
}

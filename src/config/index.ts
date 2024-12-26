export const MESSAGE_THRESHOLDS: [number, string][] = [
  // [30, 'GTFO!'],
  // [45, 'Take some luck to\nmake this work!'],
  // [60, 'There is room\nfor Improvement'],
  // [75, 'Might Consider\nAdding it to my Wishlist'],
  // [85, 'Has Potential to\nbe a Meme Star'],
  // [95, 'Near Purfect! LFG!'],
  // [100, 'Mother of all Memes!'],
  [30, 'NGMI ser'],
  [45, 'Needs more sauce'],
  [60, 'Potential spotted'],
  [75, 'Looking solid'],
  [85, 'Very promising'],
  [95, 'Based AF'],
  [100, 'God tier meme'],
];

export const createdRanges = [
  { key: 100, value: 6 },
  { key: 50, value: 5 },
  { key: 25, value: 4 },
  { key: 12, value: 3 },
  { key: 6, value: 2 },
  { key: 1, value: 1 },
  { key: 0, value: 0 },
];

export const memooScoreRanges = [
  { key: 70, value: 6 },
  { key: 55, value: 5 },
  { key: 30, value: 4 },
  { key: 12, value: 3 },
  { key: 5, value: 2 },
  { key: 2, value: 1 },
  { key: 0, value: 0 },
];
export const grades = [1 / 10, 1 / 5, 2 / 5, 3 / 5, 1];
export type CreatorStatus = '' | 'Draft' | 'QUEUE' | 'IDO' | 'Launched';
export const creatorOptions = [
  {
    key: '',
    label: 'ALL',
  },
  {
    key: 'Draft',
    label: 'Draft',
  },
  {
    key: 'QUEUE',
    label: 'Queue',
  },
  {
    key: 'IDO',
    label: 'IMO',
  },
  {
    key: 'Launched',
    label: 'LAUNCHED',
  },
];
export const creatorSortOptions = [
  {
    key: 'DATE',
    label: 'Date',
  },
  {
    key: 'MEMOOSCORE',
    label: 'MEMOO SCORE',
  },
  {
    key: 'TOTALRAISED',
    label: 'TOTAL RAISED',
  },
];
export const collectorSortOptions = [
  {
    key: 'DATE',
    label: 'Date',
  },
  {
    key: 'MEMOOSCORE',
    label: 'MEMOO SCORE',
  },
  {
    key: 'TOTALRAISED',
    label: 'TOTAL RAISED',
  },
];
export const collectorOptions = [
  {
    key: 'Airdrop',
    label: 'Airdrop',
  },
  {
    key: 'PARTICIPATED',
    label: 'PARTICIPATED',
  },
];
export const watchListOptions = [
  {
    key: 'Airdrop',
    label: 'Airdrop',
  },
  {
    key: 'PARTICIPATED',
    label: 'PARTICIPATED',
  },
];
export const creaditReturnOptions = [
  {
    key: '',
    label: 'All',
  },
  {
    key: 'RETURNCREDIT',
    label: 'Return Credit',
  },
  {
    key: 'CREDITRETURNED',
    label: 'Credit Returned',
  },
];
export const tokenSelectOptions = [
  {
    key: 'MARKETCAP',
    label: 'MARKET CAP',
  },
  {
    key: 'LIQUIDITY',
    label: 'LIQUIDITY',
  },
  {
    key: 'MEMOOSCORE',
    label: 'MEMOO SCORE',
  },
  {
    key: 'PRICE',
    label: 'price',
  },
  {
    key: 'DATECREATED',
    label: 'DATE CREATED',
  },
  {
    key: 'TOTALHOLDERS',
    label: 'HOLDERS',
  },
  {
    key: '1HVOLUME',
    label: '1H VOLUME',
  },
  {
    key: 'LASTTX',
    label: 'LAST TX',
  },
  {
    key: '1HTXS',
    label: '1H TXS',
  },
  {
    key: '1H',
    label: '1h',
  },
  {
    key: '24H',
    label: '6h',
  },
  // {
  //   key: 'IDODate',
  //   label: 'IMO Date',
  // },
  // {
  //   key: 'Participants',
  //   label: 'Participants',
  // },

  // {
  //   key: '24hVolume',
  //   label: '24H Volume',
  // },

  // {
  //   key: 'memooScore',
  //   label: 'Memoo Score',
  // },
];

export const imoSelectOptions = [
  {
    key: 'ENDSIN',
    label: 'Ends In',
  },
  {
    key: 'MEMOOSCORE',
    label: 'Memoo Score',
  },
  {
    key: 'TOTALRAISED',
    label: 'TOTAL RAISED',
  },
];
export const airdropSelectOptions = [
  {
    key: 'IDODATE',
    label: 'DATE',
  },
  {
    key: 'MEMOOSCORE',
    label: 'Memoo Score',
  },
  {
    key: 'PARTICIPANTS',
    label: 'PARTICIPANTS',
  },
];
export const meSelectOptions = [
  {
    key: 'Coming soon',
    label: 'Coming soon',
  },
  {
    key: 'Memoo Go',
    label: 'Memoo Go',
  },
];

export const increasedText = (value: number) => {
  return `Creator Increased ${value}% Acquisition`;
};

export const participantsText = (value: number) => {
  return `${value}/20 Participants Reached`;
};

export const teamFlag = {
  '0': 'Creator',
  '1': 'Team',
  '2': '', // Other
};

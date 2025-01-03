/* eslint-disable no-debugger */
import { useMemo } from 'react';
import { useAccount } from '@/hooks/useWeb3';
import BigNumber from 'bignumber.js';
import { formatDecimals } from '@/utils';
export const useProportion = () => {
  const { memooConfig } = useAccount();
  const firstProportion = useMemo(() => {
    if (!memooConfig) return 0;
    return Number(memooConfig?.tokenAllocationCreator) / 10000;
  }, [memooConfig]);
  const maxProportion = useMemo(() => {
    if (!memooConfig) return 0;
    return Number(memooConfig?.idoCreatorBuyLimit) / 10000;
  }, [memooConfig]);

  const createMaxProportion = useMemo(() => {
    if (!memooConfig) return 0;
    return (Number(memooConfig?.idoCreatorBuyLimit) + Number(memooConfig?.tokenAllocationCreator)) / 10000;
  }, [memooConfig]);

  const totalCap = useMemo(() => {
    if (!memooConfig?.platformFeeCreateMemeSol) {
      return 0;
    }
    const platformFeeCreateMeme = new BigNumber(memooConfig.platformFeeCreateMemeSol?.toString());
    const result = platformFeeCreateMeme.dividedBy(new BigNumber(10).pow(9));
    return result.toNumber();
  }, [memooConfig]);

  const totalCapInitial = useMemo(() => {
    if (!memooConfig) return 0;
    const rate = Number(memooConfig?.idoCreatorBuyLimit) / 10000;
    const total =
      Number(new BigNumber(memooConfig?.idoPrice?.toString()).dividedBy(10 ** 10)) *
      Number(new BigNumber(memooConfig?.totalSupply?.toString()).dividedBy(10 ** 9)) *
      rate;
    return Number(new BigNumber(total));
    // return Number(new BigNumber(total).dividedBy(new BigNumber(10).pow(9)));
    // return 0.03;
  }, [memooConfig]);

  const firstIncrease = useMemo(() => {
    if (!memooConfig) return 0;

    const totalSupplyBN = new BigNumber(Number(memooConfig?.totalSupply)).dividedBy(10 ** 9);
    const idoPriceBN = new BigNumber(Number(memooConfig?.idoPrice)).dividedBy(10 ** 10);
    const result = totalSupplyBN.multipliedBy(idoPriceBN).multipliedBy(firstProportion);
    return parseFloat(formatDecimals(result));
  }, [memooConfig, firstProportion]);

  const maxIncrease = useMemo(
    () => parseFloat(formatDecimals(firstIncrease * (createMaxProportion / firstProportion))),
    [firstProportion, maxProportion, firstIncrease],
  );

  const platformCreateMeme = useMemo(() => {
    if (!memooConfig) return 0;
    const tokenAllocationCreator = memooConfig?.tokenAllocationCreator / 10000;
    const totalSupply = new BigNumber(memooConfig?.totalSupply?.toString()).dividedBy(10 ** 9);
    const idoPrice = new BigNumber(memooConfig?.idoPrice?.toString()).dividedBy(10 ** 10);
    const result = new BigNumber(tokenAllocationCreator).multipliedBy(totalSupply).multipliedBy(idoPrice);
    const parseResult = parseFloat(formatDecimals(result));
    return parseResult;
  }, [firstProportion, maxProportion, firstIncrease]);
  // const platformCreateMeme = useMemo(() => {
  //   if (!memooConfig) return 0;
  //   const result = memooConfig?.tokenAllocationCreator / 10000;
  //   return result;
  // }, [memooConfig, firstProportion, maxProportion, firstIncrease]);

  const creatorAllocation = useMemo(() => {
    if (!memooConfig) return 0;
    const totalSupply = new BigNumber(memooConfig?.totalSupply?.toString()).dividedBy(10 ** 9);
    const tokenAllocationCreator = new BigNumber(Number(memooConfig?.tokenAllocationCreator) / 10000);
    const result = totalSupply.multipliedBy(tokenAllocationCreator);
    return Number(result ?? 0);
  }, [memooConfig, firstProportion]);

  const idoUserBuyLimit = useMemo(() => {
    if (!memooConfig) return 0;
    const result = memooConfig?.idoUserBuyLimit / 10000;
    return result;
  }, [memooConfig]);

  const totalSupplyPrice = useMemo(() => {
    if (!memooConfig) return 0;
    const totalSupply = new BigNumber(memooConfig?.totalSupply?.toString()).dividedBy(10 ** 9);
    const idoPrice = new BigNumber(memooConfig?.idoPrice?.toString()).dividedBy(10 ** 10);
    const result = totalSupply.multipliedBy(idoPrice);
    return parseFloat(formatDecimals(result)) ?? 0;
  }, [memooConfig]);
  const totalSupply = useMemo(() => {
    if (!memooConfig) return 0;
    const totalSupply = new BigNumber(memooConfig?.totalSupply.toString()).dividedBy(10 ** 9);
    return parseFloat(formatDecimals(totalSupply)) ?? 0;
  }, [memooConfig]);

  const tokenAllocationIdo = useMemo(() => {
    if (!memooConfig) return 0;
    const result = memooConfig?.tokenAllocationIdo / 10000;
    return result;
  }, [memooConfig]);

  const tokenAllocationAirdrop = useMemo(() => {
    if (!memooConfig) return 0;
    const result = memooConfig?.tokenAllocationAirdrop / 10000;
    return result;
  }, [memooConfig]);
  const platformFeeCreateMemeSol = useMemo(() => {
    if (!memooConfig) return 0;
    const result = new BigNumber(memooConfig?.platformFeeCreateMemeSol?.toString()).dividedBy(10 ** 9);
    return Number(result);
  }, [memooConfig]);

  const platformFeeRateDenominatorIdo = useMemo(() => {
    if (!memooConfig) return 0;
    return memooConfig?.platformFeeRateDenominatorIdo;
  }, [memooConfig]);
  const platformFeeRateIdo = useMemo(() => {
    if (!memooConfig) return 0;
    return memooConfig?.platformFeeRateIdo;
  }, [memooConfig]);

  const totalImoRaise = useMemo(() => {
    if (!memooConfig) return 0;
    const idoQuotaBN = new BigNumber(Number(memooConfig.tokenAllocationIdo)).dividedBy(10000);
    // const idoPriceBN = new BigNumber(defaultConfig.idoPrice).dividedBy(10 ** defaultConfig.defaultDecimals);
    const idoPriceBN = new BigNumber(Number(memooConfig.idoPrice)).dividedBy(10 ** 10);
    const totalSupplyBN = new BigNumber(Number(memooConfig.totalSupply)).dividedBy(10 ** 9);
    const result = totalSupplyBN.multipliedBy(idoQuotaBN).multipliedBy(idoPriceBN);
    return result;
  }, [memooConfig]);

  return {
    firstProportion,
    maxProportion,
    totalCapInitial,
    totalCap,
    maxIncrease,
    firstIncrease,
    memooConfig,
    createMaxProportion,
    platformCreateMeme,
    creatorAllocation,
    idoUserBuyLimit,
    totalSupplyPrice,
    tokenAllocationIdo,
    tokenAllocationAirdrop,
    platformFeeCreateMemeSol,
    platformFeeRateDenominatorIdo,
    platformFeeRateIdo,
    totalImoRaise,
    totalSupply,
  };
};

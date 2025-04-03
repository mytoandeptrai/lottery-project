import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { useCallback } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

type HomeAction = {
  isConnected: boolean;
  isConnecting: boolean;
  isLoadingInitial: boolean;
  isRegistered: boolean | undefined;
};

export const useHomeAction = (): HomeAction => {
  const { isConnected, isConnecting, address } = useAccount();

  /** Read Contract */
  const { data: isRegistered, isLoading: isLoadingIsRegistered } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'isRegistered',
    args: [address],
  });

  /** Write Contract */
  const {
    writeContractAsync: startNewDraw,
    data: startNewDrawHash,
    isPending: isStartingNewDraw,
    error: startNewDrawError,
    reset: resetStartNewDraw,
  } = useWriteContract();

  const {
    writeContractAsync: buyTicket,
    data: buyTicketHash,
    isPending: isBuyingTicket,
    error: buyTicketError,
    reset: resetBuyTicket,
  } = useWriteContract();

  const {
    writeContractAsync: performDraw,
    data: performDrawHash,
    isPending: isPerformingDraw,
    error: performDrawError,
    reset: resetPerformDraw,
  } = useWriteContract();

  const {
    writeContractAsync: claimPrize,
    data: claimPrizeHash,
    isPending: isClaimingPrize,
    error: claimPrizeError,
    reset: resetClaimPrize,
  } = useWriteContract();

  /** Helper functions  */
  const onStartNewDraw = useCallback(async () => {
    try {
      await startNewDraw({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'startNewDraw',
        args: [new Date().getTime()],
      });
    } catch (error) {
      console.error(error);
    }
  }, [startNewDraw]);

  const onBuyTicket = useCallback(async () => {
    try {
      await buyTicket({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'buyTicket',
      });
    } catch (error) {
      console.error(error);
    }
  }, [buyTicket]);

  const onPerformDraw = useCallback(async () => {
    try {
      await performDraw({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'performDraw',
      });
    } catch (error) {
      console.error(error);
    }
  }, [performDraw]);

  const onClaimPrize = useCallback(async () => {
    try {
      await claimPrize({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'claimPrize',
      });
    } catch (error) {
      console.error(error);
    }
  }, [claimPrize]);

  /** Loading variables */
  const isLoadingInitial = isLoadingIsRegistered || isConnecting;

  return {
    isConnected,
    isConnecting,
    isLoadingInitial,
    isRegistered: isRegistered as boolean | undefined,
  };
};

import { TOAST_MESSAGES } from '@/constants/messages';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useContractRead } from './use-contract-read';
import { useContractTransaction } from './use-contract-transaction';

export const useClaimPrize = () => {
  const { isConnected, address } = useAccount();

  /** Read Contract */
  const {
    data: winner,
    isLoading: isLoadingWinner,
    refetch: refetchWinner,
  } = useContractRead({
    functionName: 'getWinner',
  });

  const { data: isPrizeWithdrawn, refetch: refetchIsPrizeWithdrawn } = useContractRead({
    functionName: 'isPrizeWithdrawn',
  });

  const onSuccess = useCallback(() => {
    refetchWinner();
    refetchIsPrizeWithdrawn();
  }, [refetchIsPrizeWithdrawn, refetchWinner]);

  /** Write Contract */
  const {
    execute: onClaimPrize,
    isExecuting: isClaimingPrize,
    isDisabled,
  } = useContractTransaction({
    functionName: 'withdrawPrize',
    successMessage: TOAST_MESSAGES.CLAIM_PRIZE.SUCCESS,
    waitingMessage: TOAST_MESSAGES.CLAIM_PRIZE.WAITING,
    onSuccess,
    shouldEstimateGas: false,
  });

  return {
    isDisabledBtn: !isConnected || isClaimingPrize || isLoadingWinner || isDisabled,
    isClaimingPrize,
    shouldShowClaimPrize: winner === address,
    hasClaimedPrize: Boolean(isPrizeWithdrawn) && winner === address,
    onClaimPrize,
  };
};

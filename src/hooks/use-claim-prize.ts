import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { useTrackingStore } from '@/stores/tracking-store';
import { handleToastError } from '@/utils/common';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import type { BaseError } from 'wagmi';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export const useClaimPrize = () => {
  const { isConnected, address } = useAccount();
  const { shouldRefresh } = useTrackingStore();

  /** Read Contract */
  const { data: isDrawCompleted, isLoading: isLoadingIsDrawCompleted } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'isDrawCompleted',
  });

  const { data: winner, isLoading: isLoadingWinner } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getWinner',
  });

  /** Write Contract */
  const {
    writeContractAsync: claimPrize,
    data: claimPrizeHash,
    isPending: isClaimingPrize,
    error: claimPrizeError,
    reset: resetClaimPrize,
  } = useWriteContract();

  /** Wait for Transaction Receipt */
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: claimPrizeHash,
  });

  const onClaimPrize = useCallback(async () => {
    try {
      await claimPrize({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'withdrawPrize',
      });
    } catch (error) {
      handleToastError(error as BaseError);
    }
  }, [claimPrize]);

  const isDisabledBtn =
    !isConnected || isClaimingPrize || isLoadingIsDrawCompleted || isConfirming || isConfirmed || isLoadingWinner;

  const shouldShowClaimPrize = winner === address;

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Claim prize successfully, Please check your wallet!');
      shouldRefresh();
    }

    if (isConfirming) {
      toast.info('Waiting for the confirmation...');
    }
  }, [isConfirming, isConfirmed, shouldRefresh]);

  return {
    isDisabledBtn,
    onClaimPrize,
    isClaimingPrize: isClaimingPrize || isConfirming,
    shouldShowClaimPrize,
  };
};

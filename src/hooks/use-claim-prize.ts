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
  const {
    data: winner,
    isLoading: isLoadingWinner,
    refetch: refetchWinner,
  } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getWinner',
  });

  const { data: isPrizeWithdrawn, refetch: refetchIsPrizeWithdrawn } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'isPrizeWithdrawn',
  });

  /** Write Contract */
  const { writeContractAsync: claimPrize, data: claimPrizeHash, isPending: isClaimingPrize } = useWriteContract();

  /** Wait for Transaction Receipt */
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: claimPrizeError,
  } = useWaitForTransactionReceipt({
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
      console.error(error);
    }
  }, [claimPrize]);

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Claim prize successfully, Please check your wallet!');
      refetchWinner();
      refetchIsPrizeWithdrawn();
      shouldRefresh();
    }

    if (isConfirming) {
      toast.info('Waiting for the confirmation...');
    }

    if (claimPrizeError) {
      handleToastError(claimPrizeError as BaseError);
    }
  }, [isConfirming, isConfirmed, shouldRefresh, claimPrizeError, refetchWinner, refetchIsPrizeWithdrawn]);

  return {
    isDisabledBtn: !isConnected || isClaimingPrize || isConfirming || isLoadingWinner,
    isClaimingPrize: isClaimingPrize || isConfirming,
    shouldShowClaimPrize: winner === address,
    hasClaimedPrize: Boolean(isPrizeWithdrawn) && winner === address,
    onClaimPrize,
  };
};

import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { useCallback } from 'react';
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export const useClaimPrize = () => {
  const { isConnected, address } = useAccount();

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
        functionName: 'claimPrize',
      });
    } catch (error) {
      console.error(error);
    }
  }, [claimPrize]);

  const isDisabledBtn =
    !isConnected || isClaimingPrize || isLoadingIsDrawCompleted || isConfirming || isConfirmed || isLoadingWinner;

  const shouldShowClaimPrize = isDrawCompleted && winner === address;

  return {
    isDisabledBtn,
    onClaimPrize,
    isClaimingPrize: isClaimingPrize || isConfirming,
    shouldShowClaimPrize,
  };
};

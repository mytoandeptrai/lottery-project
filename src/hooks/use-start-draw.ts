import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { useTrackingStore } from '@/stores/tracking-store';
import { handleToastError } from '@/utils/common';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { type BaseError, useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export const useStartDraw = () => {
  const { isConnected } = useAccount();
  const { shouldRefresh } = useTrackingStore();

  /** Read contract */
  const { data: isDrawCompleted, isLoading: isLoadingIsDrawCompleted } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'isDrawCompleted',
  });

  /** Write contract */
  const {
    writeContractAsync: startNewDraw,
    isPending: isStartingNewDraw,
    data: startNewDrawHash,
    error: startNewDrawError,
    reset: resetStartNewDraw,
  } = useWriteContract();

  /** Wait for transaction receipt */
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: startNewDrawHash,
  });

  /** Functionalities */
  const onStartNewDraw = useCallback(async () => {
    try {
      await startNewDraw({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'startNewDraw',
        args: [new Date().getTime()],
      });
    } catch (error) {
      handleToastError(error as BaseError);
    }
  }, [startNewDraw]);

  const isDisabledBtn =
    !isConnected ||
    isStartingNewDraw ||
    isLoadingIsDrawCompleted ||
    isDrawCompleted === false ||
    isConfirming ||
    isConfirmed;

  const hasStartedNewDraw = isDrawCompleted === false;

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Draw started successfully');
      shouldRefresh();
    }

    if (isConfirming) {
      toast.info('Waiting for the confirmation...');
    }
  }, [isConfirming, isConfirmed, shouldRefresh]);

  return {
    isDrawing: isStartingNewDraw || isConfirming,
    hasStartedNewDraw,
    isDisabledBtn,
    onStartNewDraw,
  };
};

import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { TOAST_MESSAGES } from '@/constants/messages';
import { useTrackingStore } from '@/stores/tracking-store';
import { handleToastError } from '@/utils/common';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { type BaseError, usePublicClient, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

interface UseContractTransactionProps {
  functionName: string;
  value?: bigint;
  args?: any[];
  onSuccess?: () => void;
  successMessage?: string;
  waitingMessage?: string;
  shouldEstimateGas?: boolean;
}

export const useContractTransaction = ({
  functionName,
  value,
  args,
  onSuccess,
  successMessage = TOAST_MESSAGES.BUY_TICKET.SUCCESS,
  waitingMessage = TOAST_MESSAGES.BUY_TICKET.WAITING,
  shouldEstimateGas = true,
}: UseContractTransactionProps) => {
  const { shouldRefresh } = useTrackingStore();
  const publicClient = usePublicClient();

  /** Write Contract */
  const { writeContractAsync: executeTransaction, data: hash, isPending: isExecuting } = useWriteContract();

  /** Wait for Transaction Receipt */
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const execute = useCallback(async () => {
    try {
      let gasWithBuffer: bigint | undefined;

      if (shouldEstimateGas) {
        // Estimate gas using publicClient
        const estimateGas = await publicClient.estimateContractGas({
          address: ADDRESS_CONTRACT,
          abi: ABI,
          functionName,
          value,
          args,
        });

        gasWithBuffer = estimateGas ? (estimateGas * BigInt(15)) / BigInt(10) : undefined;

        // Simulate the contract call to estimate gas
        await publicClient.simulateContract({
          address: ADDRESS_CONTRACT,
          abi: ABI,
          functionName,
          value,
          args,
          gas: gasWithBuffer,
        });
      }

      // Execute the transaction with the calculated gas limit
      await executeTransaction({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName,
        value,
        args,
        gas: gasWithBuffer,
      });
    } catch (error) {
      console.error(error);
    }
  }, [executeTransaction, functionName, value, args, publicClient]);

  useEffect(() => {
    if (isConfirmed) {
      toast.success(successMessage);
      onSuccess?.();
      shouldRefresh();
    }

    if (isConfirming) {
      toast.info(waitingMessage);
    }

    if (transactionError) {
      handleToastError(transactionError as BaseError);
    }
  }, [isConfirming, isConfirmed, shouldRefresh, transactionError, successMessage, waitingMessage, onSuccess]);

  return {
    execute,
    isExecuting: isExecuting || isConfirming,
    isDisabled: isExecuting || isConfirming,
  };
};

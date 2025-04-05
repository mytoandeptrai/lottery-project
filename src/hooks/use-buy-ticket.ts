import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { useTrackingStore } from '@/stores/tracking-store';
import { handleToastError } from '@/utils/common';
import { REFRESH_INTERVAL_DRAW, TICKET_PRICE } from '@/utils/const';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { type BaseError, useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
export const useBuyTicket = () => {
  const { isConnected, address } = useAccount();
  const { shouldRefresh } = useTrackingStore();

  /** Read Contract */
  const { data: isDrawCompleted, isLoading: isLoadingIsDrawCompleted } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'isDrawCompleted',
    query: {
      refetchInterval: REFRESH_INTERVAL_DRAW,
    },
  });

  const {
    data: isRegistered,
    isLoading: isLoadingIsRegistered,
    refetch: refetchIsRegistered,
  } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'isRegistered',
    args: [address!],
    query: {
      enabled: isConnected && !!address,
    },
  });

  /** Write Contract */
  const { writeContractAsync: buyTicket, data: buyTicketHash, isPending: isBuyingTicket } = useWriteContract();

  /** Wait for Transaction Receipt */
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: buyTicketError,
  } = useWaitForTransactionReceipt({
    hash: buyTicketHash,
  });

  /** Functionalities */
  const onBuyTicket = useCallback(async () => {
    try {
      await buyTicket({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'buyTicket',
        value: BigInt(TICKET_PRICE),
      });
    } catch (error) {
      console.error(error);
    }
  }, [buyTicket]);

  const isDisabledBtn =
    isLoadingIsDrawCompleted ||
    !isConnected ||
    isBuyingTicket ||
    isConfirming ||
    isLoadingIsRegistered ||
    isRegistered === true ||
    isDrawCompleted === true;

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Buy ticket successfully');
      refetchIsRegistered();
      shouldRefresh();
    }

    if (isConfirming) {
      toast.info('Waiting for the confirmation...');
    }

    if (buyTicketError) {
      handleToastError(buyTicketError as BaseError);
    }
  }, [isConfirming, isConfirmed, shouldRefresh, refetchIsRegistered, buyTicketError]);

  return {
    isDisabledBtn,
    onBuyTicket,
    isBuyingTicket: isBuyingTicket || isConfirming,
    hasRegistered: isRegistered === true,
  };
};

import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { handleToastError } from '@/utils/common';
import { REFRESH_INTERVAL_DRAW, TICKET_PRICE } from '@/utils/const';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { type BaseError, useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export const useBuyTicket = () => {
  const { isConnected, isConnecting, address } = useAccount();

  /** Read Contract */
  const { data: isDrawCompleted, isLoading: isLoadingIsDrawCompleted } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'isDrawCompleted',
    query: {
      refetchInterval: REFRESH_INTERVAL_DRAW,
    },
  });

  const { data: isRegistered, isLoading: isLoadingIsRegistered } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'isRegistered',
    args: [address!],
    query: {
      enabled: isConnected && !!address,
      refetchInterval: REFRESH_INTERVAL_DRAW,
    },
  });

  /** Write Contract */
  const {
    writeContractAsync: buyTicket,
    data: buyTicketHash,
    isPending: isBuyingTicket,
    error: buyTicketError,
    reset: resetBuyTicket,
  } = useWriteContract();

  /** Wait for Transaction Receipt */
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: buyTicketHash,
  });

  const onBuyTicket = useCallback(async () => {
    try {
      await buyTicket({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'buyTicket',
        value: BigInt(TICKET_PRICE),
      });
    } catch (error) {
      handleToastError(error as BaseError);
    }
  }, [buyTicket]);

  const isDisabledBtn =
    isLoadingIsDrawCompleted ||
    !isConnected ||
    isBuyingTicket ||
    isConfirming ||
    isConfirmed ||
    isLoadingIsRegistered ||
    isRegistered === true ||
    isDrawCompleted === true;

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Draw started successfully');
    }

    if (isConfirming) {
      toast.info('Waiting for the confirmation...');
    }
  }, [isConfirming, isConfirmed]);

  return {
    isDisabledBtn,
    onBuyTicket,
    isBuyingTicket: isBuyingTicket || isConfirming,
    hasRegistered: isRegistered === true,
  };
};

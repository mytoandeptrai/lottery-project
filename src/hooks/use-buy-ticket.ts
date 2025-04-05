import { TOAST_MESSAGES } from '@/constants/messages';
import { TICKET_PRICE } from '@/utils/const';
import { useAccount } from 'wagmi';
import { useContractRead } from './use-contract-read';
import { useContractTransaction } from './use-contract-transaction';

export const useBuyTicket = () => {
  const { isConnected, address } = useAccount();

  /** Read Contract */
  const { data: isDrawCompleted, isLoading: isLoadingIsDrawCompleted } = useContractRead({
    functionName: 'isDrawCompleted',
  });

  const {
    data: isRegistered,
    isLoading: isLoadingIsRegistered,
    refetch: refetchIsRegistered,
  } = useContractRead({
    functionName: 'isRegistered',
    args: [address!],
    enabled: isConnected && !!address,
  });

  /** Write Contract */
  const {
    execute: onBuyTicket,
    isExecuting: isBuyingTicket,
    isDisabled,
  } = useContractTransaction({
    functionName: 'buyTicket',
    value: BigInt(TICKET_PRICE),
    successMessage: TOAST_MESSAGES.BUY_TICKET.SUCCESS,
    waitingMessage: TOAST_MESSAGES.BUY_TICKET.WAITING,
    onSuccess: refetchIsRegistered,
  });

  const isDisabledBtn =
    isLoadingIsDrawCompleted ||
    !isConnected ||
    isBuyingTicket ||
    isLoadingIsRegistered ||
    isRegistered === true ||
    isDrawCompleted === true ||
    isDisabled;

  return {
    isDisabledBtn,
    onBuyTicket,
    isBuyingTicket,
    hasRegistered: isRegistered === true,
  };
};

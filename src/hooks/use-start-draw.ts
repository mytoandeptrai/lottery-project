import { TOAST_MESSAGES } from '@/constants/messages';
import { useAccount } from 'wagmi';
import { useContractRead } from './use-contract-read';
import { useContractTransaction } from './use-contract-transaction';

export const useStartDraw = () => {
  const { isConnected } = useAccount();

  /** Read contract */
  const { data: isDrawCompleted, isLoading: isLoadingIsDrawCompleted } = useContractRead({
    functionName: 'isDrawCompleted',
  });

  /** Write contract */
  const {
    execute: onStartNewDraw,
    isExecuting: isStartingNewDraw,
    isDisabled,
  } = useContractTransaction({
    functionName: 'startNewDraw',
    args: [new Date().getTime()],
    successMessage: TOAST_MESSAGES.START_DRAW.SUCCESS,
    waitingMessage: TOAST_MESSAGES.START_DRAW.WAITING,
  });

  const isDisabledBtn =
    !isConnected || isStartingNewDraw || isLoadingIsDrawCompleted || isDrawCompleted === false || isDisabled;

  const hasStartedNewDraw = isDrawCompleted === false;

  return {
    isDrawing: isStartingNewDraw,
    hasStartedNewDraw,
    isDisabledBtn,
    onStartNewDraw,
  };
};

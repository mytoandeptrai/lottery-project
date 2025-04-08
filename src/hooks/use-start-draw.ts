import { TOAST_MESSAGES } from '@/constants/messages';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useContractRead } from './use-contract-read';
import { useContractTransaction } from './use-contract-transaction';

export const useStartDraw = () => {
  const { isConnected } = useAccount();

  /** Read contract */
  const {
    data: isDrawCompleted,
    isLoading: isLoadingIsDrawCompleted,
    refetch: refetchIsDrawCompleted,
  } = useContractRead({
    functionName: 'isDrawCompleted',
  });

  const { data: lotteryState, refetch: refetchLotteryState } = useContractRead({
    functionName: 'getLotteryState',
  });

  const onSuccess = useCallback(() => {
    refetchLotteryState();
    refetchIsDrawCompleted();
  }, [refetchLotteryState, refetchIsDrawCompleted]);

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
    onSuccess,
  });

  const isDisabledBtn =
    !isConnected || isStartingNewDraw || isLoadingIsDrawCompleted || isDrawCompleted === false || isDisabled;

  const hasStartedNewDraw = isDrawCompleted === false;

  const hasWinnerNotClaimed = lotteryState && lotteryState === 'WAITING_FOR_PRIZE_CLAIM';

  return {
    isDrawing: isStartingNewDraw,
    hasStartedNewDraw,
    isDisabledBtn,
    onStartNewDraw,
    hasWinnerNotClaimed,
  };
};

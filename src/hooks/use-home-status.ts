import { useTrackingStore } from '@/stores/tracking-store';
import { REFRESH_INTERVAL } from '@/utils/const';
import { useEffect } from 'react';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';
import { useContractRead } from './use-contract-read';

type HomeStatus = {
  participantCount: number;
  currentPrize: string;
  winner: string;
  isRegistered: boolean;
  isLoadingAll: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  userTicket: number | undefined;
  ticketPrice: string;
  isFetchingAll: boolean;
  lotteryState: string;
  onRefreshData: () => Promise<void>;
};

const LOTTERY_MAPPING = {
  READY_FOR_NEW_DRAW: 'Ready for new draw',
  NOT_STARTED: 'Not started',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
  UNKNOWN: 'Unknown',
  WAITING_FOR_PRIZE_CLAIM: 'Waiting for prize claim',
};

export const useHomeStatus = (): HomeStatus => {
  const { isConnected, isConnecting, address } = useAccount();
  const { refreshNumber } = useTrackingStore();

  /** Read Contract */
  const {
    data: participantCount,
    isLoading: isLoadingParticipantCount,
    isFetching: isFetchingParticipantCount,
    refetch: refetchParticipantCount,
  } = useContractRead({
    functionName: 'getParticipantCount',
    refetchInterval: REFRESH_INTERVAL,
  });

  const {
    data: currentPrize,
    isLoading: isLoadingCurrentPrize,
    isFetching: isFetchingCurrentPrize,
    refetch: refetchCurrentPrize,
  } = useContractRead({
    functionName: 'getCurrentPrize',
    refetchInterval: REFRESH_INTERVAL,
  });

  const {
    data: ticketPrice,
    isLoading: isLoadingTicketPrice,
    refetch: refetchTicketPrice,
  } = useContractRead({
    functionName: 'getTicketPrice',
  });

  const {
    data: lotteryState,
    isLoading: isLoadingLotteryState,
    isFetching: isFetchingLotteryState,
    refetch: refetchLotteryState,
  } = useContractRead({
    functionName: 'getLotteryState',
  });

  const {
    data: winner,
    isLoading: isLoadingWinner,
    isFetching: isFetchingWinner,
    refetch: refetchWinner,
  } = useContractRead({
    functionName: 'getWinner',
  });

  const {
    data: isRegistered,
    isLoading: isLoadingIsRegistered,
    isFetching: isFetchingIsRegistered,
    refetch: refetchIsRegistered,
  } = useContractRead({
    functionName: 'isRegistered',
    args: [address!],
    enabled: isConnected && !!address,
  });

  const {
    data: userTicket,
    isLoading: isLoadingUserTicket,
    isFetching: isFetchingUserTicket,
    refetch: refetchUserTicket,
  } = useContractRead({
    functionName: 'getUserTicket',
    args: [address!],
    enabled: isConnected && !!address,
  });

  const onRefreshData = async () => {
    await Promise.all([
      refetchUserTicket(),
      refetchParticipantCount(),
      refetchCurrentPrize(),
      refetchWinner(),
      refetchIsRegistered(),
      refetchTicketPrice(),
      refetchLotteryState(),
    ]);
  };

  useEffect(() => {
    onRefreshData();
  }, [refreshNumber]);

  const isLoadingAll =
    isConnecting ||
    isLoadingParticipantCount ||
    isLoadingCurrentPrize ||
    isLoadingWinner ||
    isLoadingIsRegistered ||
    isLoadingUserTicket ||
    isLoadingTicketPrice ||
    isLoadingLotteryState;

  const isFetchingAll =
    isFetchingParticipantCount ||
    isFetchingCurrentPrize ||
    isFetchingWinner ||
    isFetchingIsRegistered ||
    isFetchingUserTicket ||
    isFetchingLotteryState;

  return {
    participantCount: participantCount ? Number(participantCount) : 0,
    currentPrize: currentPrize ? formatEther(currentPrize as bigint) : '0',
    winner: winner as string,
    isRegistered: isRegistered as boolean,
    isLoadingAll,
    isConnected,
    isConnecting,
    userTicket: userTicket ? Number(userTicket) : undefined,
    ticketPrice: ticketPrice ? formatEther(ticketPrice as bigint) : '0',
    isFetchingAll,
    onRefreshData,
    lotteryState: LOTTERY_MAPPING[(lotteryState ?? 'UNKNOWN') as keyof typeof LOTTERY_MAPPING] ?? 'UNKNOWN',
  };
};

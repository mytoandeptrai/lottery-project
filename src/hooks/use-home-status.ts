import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { REFRESH_INTERVAL } from '@/utils/const';
import { formatEther } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

type HomeStatus = {
  participantCount: number;
  currentPrize: string;
  isDrawCompleted: boolean;
  winner: string;
  isRegistered: boolean;
  isLoadingAll: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  userTicket: number | undefined;
  ticketPrice: string;
  isFetchingAll: boolean;
  onRefreshData: () => Promise<void>;
};

export const useHomeStatus = (): HomeStatus => {
  const { isConnected, isConnecting, address } = useAccount();

  /** Read Contract */
  const {
    data: participantCount,
    isLoading: isLoadingParticipantCount,
    isFetching: isFetchingParticipantCount,
    refetch: refetchParticipantCount,
  } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getParticipantCount',
    query: {
      refetchInterval: REFRESH_INTERVAL,
    },
  });

  const {
    data: currentPrize,
    isLoading: isLoadingCurrentPrize,
    isFetching: isFetchingCurrentPrize,
    refetch: refetchCurrentPrize,
  } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getCurrentPrize',
    query: {
      refetchInterval: REFRESH_INTERVAL,
    },
  });

  const {
    data: ticketPrice,
    isLoading: isLoadingTicketPrice,
    refetch: refetchTicketPrice,
  } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getTicketPrice',
  });

  const {
    data: isDrawCompleted,
    isLoading: isLoadingIsDrawCompleted,
    isFetching: isFetchingIsDrawCompleted,
    refetch: refetchIsDrawCompleted,
  } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'isDrawCompleted',
  });

  const {
    data: winner,
    isLoading: isLoadingWinner,
    isFetching: isFetchingWinner,
    refetch: refetchWinner,
  } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getWinner',
  });

  const {
    data: isRegistered,
    isLoading: isLoadingIsRegistered,
    isFetching: isFetchingIsRegistered,
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

  const {
    data: userTicket,
    isLoading: isLoadingUserTicket,
    isFetching: isFetchingUserTicket,
    refetch: refetchUserTicket,
  } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getUserTicket',
    args: [address!],
    query: {
      enabled: isConnected && !!address,
    },
  });

  const onRefreshData = async () => {
    await Promise.all([
      refetchUserTicket(),
      refetchParticipantCount(),
      refetchCurrentPrize(),
      refetchIsDrawCompleted(),
      refetchWinner(),
      refetchIsRegistered(),
      refetchTicketPrice(),
    ]);
  };

  const isLoadingAll =
    isConnecting ||
    isLoadingParticipantCount ||
    isLoadingCurrentPrize ||
    isLoadingIsDrawCompleted ||
    isLoadingWinner ||
    isLoadingIsRegistered ||
    isLoadingUserTicket ||
    isLoadingTicketPrice;

  const isFetchingAll =
    isFetchingParticipantCount ||
    isFetchingCurrentPrize ||
    isFetchingIsDrawCompleted ||
    isFetchingWinner ||
    isFetchingIsRegistered ||
    isFetchingUserTicket;

  return {
    participantCount: participantCount ? Number(participantCount) : 0,
    currentPrize: currentPrize ? formatEther(currentPrize as bigint) : '0',
    isDrawCompleted: !isDrawCompleted as boolean,
    winner: winner as string,
    isRegistered: isRegistered as boolean,
    isLoadingAll,
    isConnected,
    isConnecting,
    userTicket: userTicket as number,
    ticketPrice: ticketPrice ? formatEther(ticketPrice as bigint) : '0',
    isFetchingAll,
    onRefreshData,
  };
};

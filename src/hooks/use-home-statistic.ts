import { REFRESH_INTERVAL } from '@/utils/const';
import { useAccount } from 'wagmi';
import { useContractRead } from './use-contract-read';

type HomeStatistic = {
  participants: string[] | undefined;
  participantCount: number;
  isLoadingAll: boolean;
  isConnected: boolean;
};

export const useHomeStatistic = (): HomeStatistic => {
  const { isConnected, isConnecting } = useAccount();

  /** Read Contract */
  const { data: participants, isLoading: isLoadingParticipants } = useContractRead({
    functionName: 'getParticipants',
    refetchInterval: REFRESH_INTERVAL,
  });

  const { data: participantCount, isLoading: isLoadingParticipantCount } = useContractRead({
    functionName: 'getParticipantCount',
  });

  const isLoadingAll = isLoadingParticipants || isLoadingParticipantCount || isConnecting;

  return {
    participants: participants as string[],
    participantCount: participantCount as number,
    isLoadingAll,
    isConnected,
  };
};

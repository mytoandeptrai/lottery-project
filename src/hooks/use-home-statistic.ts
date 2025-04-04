import { ADDRESS_CONTRACT } from '@/config/smart-contract';

import { ABI } from '@/config/smart-contract';
import { REFRESH_INTERVAL } from '@/utils/const';
import { useAccount, useReadContract } from 'wagmi';

type HomeStatistic = {
  participants: string[] | undefined;
  participantCount: number;
  isLoadingAll: boolean;
  isConnected: boolean;
};

export const useHomeStatistic = (): HomeStatistic => {
  const { isConnected, isConnecting } = useAccount();

  /** Read Contract */
  const { data: participants, isLoading: isLoadingParticipants } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getParticipants',
    query: {
      refetchInterval: REFRESH_INTERVAL,
    },
  });

  const { data: participantCount, isLoading: isLoadingParticipantCount } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
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

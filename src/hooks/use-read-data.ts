import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { useReadContract } from 'wagmi';

export const useReadData = () => {
  const { data: currentDrawInfo, isLoading: isLoadingCurrentDrawInfo } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getParticipantCount',
  });

  return {
    currentDrawInfo,
    isLoadingCurrentDrawInfo,
  };
};

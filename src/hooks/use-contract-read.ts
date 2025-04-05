import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { useReadContract } from 'wagmi';

type UseContractReadProps = {
  functionName: string;
  args?: any[];
  enabled?: boolean;
  refetchInterval?: number;
};

export const useContractRead = ({ functionName, args, enabled = true, refetchInterval }: UseContractReadProps) => {
  const { data, isLoading, isFetching, refetch } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName,
    args,
    query: {
      enabled,
      ...(refetchInterval && { refetchInterval }),
    },
  });

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
};

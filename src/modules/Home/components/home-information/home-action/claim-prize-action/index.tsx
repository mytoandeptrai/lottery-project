import { Button } from '@/components/ui/button';
import { useClaimPrize } from '@/hooks/use-claim-prize';
import { Loader2, Trophy } from 'lucide-react';
import React from 'react';

const ClaimPrizeTicket = () => {
  const { isDisabledBtn, onClaimPrize, isClaimingPrize, shouldShowClaimPrize, hasClaimedPrize } = useClaimPrize();

  if (!shouldShowClaimPrize) return null;

  return (
    <Button className='w-full' variant='default' onClick={onClaimPrize} disabled={isDisabledBtn || hasClaimedPrize}>
      {isClaimingPrize ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Claiming Prize...
        </>
      ) : (
        <>
          <Trophy className='mr-2 h-4 w-4' />
          {hasClaimedPrize ? 'You have claimed the prize' : 'Claim Prize'}
        </>
      )}
    </Button>
  );
};

export default ClaimPrizeTicket;

import { Button } from '@/components/ui/button';
import { useBuyTicket } from '@/hooks/use-buy-ticket';
import { Loader2, Ticket } from 'lucide-react';
import React from 'react';

const BuyTicketAction = () => {
  const { isDisabledBtn, onBuyTicket, isBuyingTicket, hasRegistered } = useBuyTicket();
  return (
    <Button className='w-full' onClick={onBuyTicket} disabled={isDisabledBtn}>
      {isBuyingTicket ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Buying Ticket...
        </>
      ) : (
        <>
          <Ticket className='mr-2 h-4 w-4' /> {hasRegistered ? 'You have already buy this ticket' : 'Buy Ticket'}
        </>
      )}
    </Button>
  );
};

export default BuyTicketAction;

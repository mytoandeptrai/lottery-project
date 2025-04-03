import { Button } from '@/components/ui/button';
import { useConnect, useDisconnect } from 'wagmi';
import React from 'react';
import { useAccount } from 'wagmi';
import { ArrowRight, Loader2, Wallet } from 'lucide-react';
import { metaMask } from 'wagmi/connectors';
import { Badge } from '@/components/ui/badge';
import { formatAddress } from '@/utils/common';
import { toast } from 'sonner';

const HomeConnectWallet = () => {
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, isConnecting } = useAccount();
  return (
    <>
      {!isConnected ? (
        <div className='py-8 text-center'>
          <Button
            onClick={() => connect({ connector: metaMask() })}
            className='mx-auto flex cursor-pointer items-center p-6'
            size='lg'
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Connecting...
              </>
            ) : (
              <>
                <Wallet className='mr-2 h-5 w-5' /> Connect Wallet to Play <ArrowRight className='ml-2 h-5 w-5' />
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <Badge
            variant='outline'
            className='mb-2'
            onClick={() =>
              toast('Event has been created.', {
                description: 'This is a description',
                action: {
                  label: 'Undo',
                  onClick: () => console.log('Undo'),
                },
              })
            }
          >
            Connected: {formatAddress(address!)}
          </Badge>
          <Button variant='outline' size='sm' onClick={() => disconnect()}>
            Disconnect
          </Button>
        </div>
      )}
    </>
  );
};

export default HomeConnectWallet;

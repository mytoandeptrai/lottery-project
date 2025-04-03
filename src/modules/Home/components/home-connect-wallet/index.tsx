import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatAddress } from '@/utils/common';
import { ArrowRight, Check, Copy, Loader2, LogOut, Wallet } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';

const HomeConnectWallet = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, isConnecting } = useAccount();

  const copyAddress = () => {
    navigator.clipboard.writeText(address!);
    toast('Address copied to clipboard', {
      icon: '👍',
      duration: 2000,
    });
  };

  if (!isConnected) {
    return (
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
    );
  }

  return (
    <Card className='mt-2 overflow-hidden border border-primary/20 bg-background/50 p-0 backdrop-blur-sm'>
      <CardContent className='p-0'>
        <div className='flex flex-col items-center justify-between sm:flex-row'>
          <div className='flex w-full items-center p-4 sm:w-auto'>
            <div className='relative mr-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                <Wallet className='h-5 w-5 text-primary' />
              </div>
              <div className='-bottom-1 -right-1 absolute flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-green-500'>
                <Check className='h-3 w-3 text-white' />
              </div>
            </div>
            <div>
              <p className='font-medium text-sm'>Connected Wallet</p>
              <div className='flex items-center'>
                <div className='overflow-hidden'>
                  <p className='font-mono text-muted-foreground text-xs'>{formatAddress(address!)}</p>
                </div>
                <button
                  className='ml-2 cursor-pointer text-primary transition-colors hover:text-primary/80'
                  onClick={copyAddress}
                  aria-label='Copy address to clipboard'
                >
                  <Copy className='h-3 w-3' />
                </button>
              </div>
            </div>
          </div>

          <div className='w-full border-primary/10 p-4 sm:w-auto sm:border-l'>
            <div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => disconnect()}
                className='flex w-full items-center gap-2 border-primary/20 hover:bg-primary/5 sm:w-auto'
              >
                <LogOut className='h-4 w-4' />
                <span>Disconnect</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeConnectWallet;

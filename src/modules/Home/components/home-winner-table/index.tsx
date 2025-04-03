import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useHomeWinnerTable } from '@/hooks/use-home-winner-table';
import { formatAddress, formatCurrency } from '@/utils/common';
import { format } from 'date-fns';
import { ExternalLink, Trophy } from 'lucide-react';
import React from 'react';
import Loading from './loading';

const HomeWinnerTable = () => {
  const { winners, isLoading, isConnected } = useHomeWinnerTable();

  if (isLoading) return <Loading />;
  if (!winners || !winners.length || !isConnected) return null;

  return (
    <div className='mt-6 rounded-md border'>
      <div className='flex items-center border-b bg-muted/50 p-4'>
        <Trophy className='mr-2 h-5 w-5 text-yellow-500' />
        <h3 className='font-semibold text-lg'>Winners History</h3>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <TableCaption>A history of all lottery winners</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[180px]'>Date</TableHead>
              <TableHead>Winner</TableHead>
              <TableHead>Ticket ID</TableHead>
              <TableHead className='text-right'>Prize Pool</TableHead>
              <TableHead className='w-[100px] text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {winners.map((winner, index) => (
              <tr key={index} className='group'>
                <TableCell className='font-medium'>{format(winner.date, 'MMM d, yyyy HH:mm')}</TableCell>
                <TableCell>
                  <div className='flex items-center'>
                    <Badge variant='outline' className='font-mono'>
                      {formatAddress(winner.address)}
                    </Badge>
                    {index === 0 && <Badge className='ml-2 bg-yellow-500 text-primary-foreground'>Latest</Badge>}
                  </div>
                </TableCell>
                <TableCell className='font-mono text-xs'>{winner.ticketId}</TableCell>
                <TableCell className='text-right font-semibold'>{formatCurrency(+winner.prizePool)}</TableCell>
                <TableCell className='text-center'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0 opacity-70 group-hover:opacity-100'
                    title='View on Etherscan'
                  >
                    <ExternalLink className='h-4 w-4' />
                    <span className='sr-only'>View on Etherscan</span>
                  </Button>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HomeWinnerTable;

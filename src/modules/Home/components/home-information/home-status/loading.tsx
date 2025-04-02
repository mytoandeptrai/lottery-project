import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='mb-2 h-6 w-1/3' />
        <Skeleton className='h-4 w-2/3' />
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex justify-between'>
          <Skeleton className='h-4 w-1/4' />
          <Skeleton className='h-4 w-1/6' />
        </div>
        <div className='flex justify-between'>
          <Skeleton className='h-4 w-1/4' />
          <Skeleton className='h-4 w-1/6' />
        </div>
        <div className='flex justify-between'>
          <Skeleton className='h-4 w-1/4' />
          <Skeleton className='h-4 w-1/6' />
        </div>
        <div className='flex justify-between'>
          <Skeleton className='h-4 w-1/4' />
          <Skeleton className='h-4 w-1/6' />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className='h-10 w-full' />
      </CardFooter>
    </Card>
  );
};

export default Loading;

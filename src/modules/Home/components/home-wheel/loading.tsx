import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <div className='mx-auto mt-6 flex w-full flex-col items-center justify-center'>
      <Card className='mt-6'>
        <CardHeader>
          <Skeleton className='mb-2 h-6 w-1/4' />
          <Skeleton className='h-4 w-1/2' />
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className='h-8 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loading;

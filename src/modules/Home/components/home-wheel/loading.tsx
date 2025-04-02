import { CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import React from 'react';

const Loading = () => {
  return (
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
  );
};

export default Loading;

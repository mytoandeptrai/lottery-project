import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <div className='mt-6'>
      <Skeleton className='mb-2 h-12 w-full' />
      <Skeleton className='h-64 w-full' />
    </div>
  );
};

export default Loading;

import { Button } from '@/components/ui/button';
import { useStartDraw } from '@/hooks/use-start-draw';
import { Loader2, Trophy } from 'lucide-react';
import React from 'react';
const StartNewDrawAction = () => {
  const { isDisabledBtn, onStartNewDraw, isDrawing, hasStartedNewDraw, hasWinnerNotClaimed } = useStartDraw();

  const text = () => {
    if (hasStartedNewDraw) {
      return (
        <>
          <Trophy className='mr-2 h-4 w-4' /> The draw has started
        </>
      );
    }

    if (isDrawing) {
      return (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Starting New Draw...
        </>
      );
    }

    if (hasWinnerNotClaimed) {
      return (
        <>
          <Trophy className='mr-2 h-4 w-4' /> The winner has not claimed their prize
        </>
      );
    }

    return (
      <>
        <Trophy className='mr-2 h-4 w-4' /> Start a new Lucky Draw
      </>
    );
  };

  return (
    <Button className='w-full' variant='outline' onClick={onStartNewDraw} disabled={isDisabledBtn}>
      {text()}
    </Button>
  );
};

export default StartNewDrawAction;

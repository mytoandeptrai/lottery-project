import dynamic from 'next/dynamic';
import { memo } from 'react';

const Wheel = dynamic(() => import('react-custom-roulette').then((mod) => mod.Wheel), { ssr: false });

interface WheelOfLuckyGameProps {
  data: Array<{
    option: string;
    style?: { backgroundColor?: string; textColor?: string };
  }>;
  mustStartSpinning: boolean;
  prizeNumber: number;
  onStopSpinning?: () => void;
  spinDuration?: number;
  backgroundColors?: string[];
  textColors?: string[];
  outerBorderColor?: string;
  outerBorderWidth?: number;
  innerBorderColor?: string;
  innerBorderWidth?: number;
  innerRadius?: number;
  radiusLineColor?: string;
  radiusLineWidth?: number;
  perpendicularText?: boolean;
  textDistance?: number;
}

const WheelOfLuckyGame = (props: WheelOfLuckyGameProps) => {
  return <Wheel {...props} />;
};

export default memo(WheelOfLuckyGame);

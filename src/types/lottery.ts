export interface LotteryWinner {
  address: string;
  ticketId: number;
  date: Date;
  prizePool: string;
}

export interface DrawResultEvent {
  winningTicket: number;
  winner: string;
}

export interface NoWinnerEvent {
  winningTicket: number;
}

export interface WheelState {
  mustSpin: boolean;
  isSpinning: boolean;
  prizeNumber: number;
  isPerformingDraw: boolean;
  isNoWinner: boolean;
}

export const MIN_PARTICIPANTS = 5;
export const POLLING_INTERVAL_EVENTS = 5000;
export const LOCAL_STORAGE_KEY = 'lottery_winners';
export const TOAST_MESSAGES = {
  NOT_ENOUGH_PARTICIPANTS: {
    title: 'Not enough participants to perform a draw',
    description: 'Please wait for more participants to join the lottery',
  },
  DRAW_COMPLETED_WINNER: (ticketId: number) => ({
    title: 'Draw Completed',
    description: `Ticket ${ticketId} has been selected as the winner!`,
  }),
  DRAW_COMPLETED_NO_WINNER: {
    title: 'Draw Completed',
    description: 'No winner this time, please try another time!',
  },
  WAITING_CONFIRMATION: 'Waiting for the confirmation before the wheel spins automatically...',
  ERROR: {
    description: 'Please try again',
  },
  NOT_START_DRAW: {
    title: 'Not started',
    description: 'The draw has not started yet',
  },
  WAITING_FOR_PRIZE_CLAIM: {
    title: 'Waiting for prize claim',
    description: 'The prize is being claimed by the winner',
  },
} as const;
export const FAKE_WINNER = '0x0000000000000000000000000000000000000000' as const;

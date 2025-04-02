const ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'drawId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'prize',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'drawTime',
        type: 'uint256',
      },
    ],
    name: 'DrawCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'drawId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'winningTicket',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
    ],
    name: 'DrawResult',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'drawId',
        type: 'uint256',
      },
    ],
    name: 'NewLotteryStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'drawId',
        type: 'uint256',
      },
    ],
    name: 'NoWinner',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'drawId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'participant',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ticketNumber',
        type: 'uint256',
      },
    ],
    name: 'ParticipantRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'drawId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'PrizeWithdrawn',
    type: 'event',
  },
  {
    inputs: [],
    name: 'buyTicket',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentDrawInfo',
    outputs: [
      { internalType: 'uint256', name: '_drawId', type: 'uint256' },
      { internalType: 'uint256', name: '_prize', type: 'uint256' },
      { internalType: 'uint256', name: '_drawTime', type: 'uint256' },
      { internalType: 'bool', name: '_completed', type: 'bool' },
      { internalType: 'address', name: '_winner', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentPrize',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getParticipantCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRandomTicket',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRemainingTickets',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'ticket', type: 'uint256' }],
    name: 'getTicketInfo',
    outputs: [{ internalType: 'address', name: 'participant', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWinner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isDrawCompleted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'isRegistered',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'performDraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'timestamp', type: 'uint256' }],
    name: 'startNewDraw',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawPrize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const ADDRESS_CONTRACT = '0x15335655c263C8b99053A12E4294B3234a75BB1b';

export { ABI, ADDRESS_CONTRACT };

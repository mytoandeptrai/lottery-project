# 🎲 Lottery Project

A decentralized lottery application built with Next.js, Wagmi, and Viem for blockchain interactions.

## 🚀 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Mantine Hooks
- **State Management**: Zustand, React Query
- **Blockchain Interaction**: Wagmi, Viem
- **Form Handling**: React Hook Form
- **Notifications**: Sonner
- **Code Quality**: Biome (linting, formatting)
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Docker and Docker Compose (for containerized deployment)
- MetaMask or another Web3 wallet

## 🚀 Getting Started

### Local Development

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd lottery-project
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env` as needed.

5. Configure your smart contract:

   - Open `src/config/smart-contract.ts`
   - Replace the `ADDRESS_CONTRACT` with your deployed lottery contract address
   - Replace the `ABI` with your contract's ABI (you can get this from your contract compilation output)

   ```typescript
   // src/config/smart-contract.ts
   export const ADDRESS_CONTRACT = "0x1234..."; // Replace with your contract address

   export const ABI = [
     // Replace with your contract ABI
     // You can get this from your contract compilation output
   ];
   ```

6. Start the development server:

   ```bash
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

1. Build the application:

   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

## 🐳 Docker Deployment

### Development Environment

1. Build and start the containers:

   ```bash
   docker-compose up -d
   ```

2. Access the application at [http://localhost:8080](http://localhost:8080)

### Production Environment

1. Build the production image:

   ```bash
   docker build -t lottery-project:prod -f docker/Dockerfile .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env lottery-project:prod
   ```

## 📁 Project Structure

- `src/` - Source code
  - `components/` - Reusable UI components
  - `hooks/` - Custom React hooks
  - `stores/` - Zustand state stores
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
  - `constants/` - Application constants
  - `config/` - Configuration files
  - `app/` - Next.js app router pages

## 🔗 Smart Contract Integration

The application interacts with a lottery smart contract using Wagmi and Viem. Key hooks include:

- `useContractRead` - For reading data from the smart contract
- `useContractTransaction` - For executing transactions on the smart contract
- `useWheel` - For managing the lottery wheel functionality
- `useHomeStatistic` - For displaying lottery statistics
- `useHomeStatus` - For showing the current lottery status

### Contract Configuration

Before running the application, you need to configure your smart contract:

1. Deploy your lottery smart contract to your chosen network (e.g., Ethereum, Polygon, etc.)
2. Copy the deployed contract address
3. Get the ABI from your contract compilation output
4. Update the `src/config/smart-contract.ts` file with your contract address and ABI

## 📜 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run Biome linter
- `pnpm lint:fix` - Fix linting issues
- `pnpm format:check` - Check code formatting
- `pnpm format:fix` - Fix code formatting
- `pnpm type-check` - Run TypeScript type checking

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and formatting checks
4. Submit a pull request

## 📄 License

[MIT](LICENSE)

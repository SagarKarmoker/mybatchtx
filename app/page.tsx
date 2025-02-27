"use client"
import { WagmiProvider } from 'wagmi'
import { config } from './configs/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MyApp from './_app';

const queryClient = new QueryClient()

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MyApp />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

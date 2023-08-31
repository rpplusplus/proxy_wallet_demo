import Image from 'next/image'
import { Inter } from 'next/font/google'
import { LocalWallet } from "@thirdweb-dev/wallets";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Mumbai } from "@thirdweb-dev/chains"
import { generateMnemonic, mnemonicToEntropy, entropyToMnemonic } from "bip39";
import { useSession, signIn } from 'next-auth/react';
import NotLogin from './components/not_login';
import NoWallet from './components/no_wallet';
import { User } from '@prisma/client';
import { Main } from 'next/document';
import MainBody from './components/main';

const inter = Inter({ subsets: ['latin'] })
export default function Home() {

  const { data: session } = useSession()
  return (<>
    <header className="navbar bg-base-100">
      <a className="btn btn-ghost normal-case text-xl">Proxy Wallet Demo</a>
    </header>
    <main
      className={`flex min-h-screen flex-col items-center p-10 ${inter.className}`}
    >
      <MainBody/>
    </main>
  </>
  )
}

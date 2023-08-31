import { Inter } from 'next/font/google'
import MainBody from './components/main';

const inter = Inter({ subsets: ['latin'] })
export default function Home() {

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

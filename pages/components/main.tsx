import { useSession } from "next-auth/react"
import NotLogin from "./not_login"
import { User } from "@prisma/client"
import NoWallet from "./no_wallet"
import WalletAction from "./wallet_action"

const MainBody: React.FC = () => {
    const {data: session} = useSession()

    if (!session) {
        return <NotLogin/>
    }

    if ((session.user as User).walletType == null) {
        return <NoWallet/>
    }

    return <WalletAction/>
}


export default MainBody;
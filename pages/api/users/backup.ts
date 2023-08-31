import ProxyWallet from "@/utils/wallet";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" });
    } else {
        const session = await getServerSession(req, res, options)

        if (session) {
            let u = session?.user as User
            const prisma = new PrismaClient()
            let user = await prisma.user.findFirst({
                where: {
                    id: u.id
                }
            })

            if (user?.walletType == "private_key") {
                res.status(200).json({"data": user?.privateKey})
            }

            if (user?.walletType == "mnemonic") {
                res.status(200).json({"data": ProxyWallet.mnemonicTypeWalletToMnemonic({
                    type: "mnemonic",
                    secret: user?.privateKey!
                })})
            }
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
}
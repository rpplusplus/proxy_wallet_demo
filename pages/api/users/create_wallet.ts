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

            if (u.walletType != null) {
                res.status(400).json({ message: "Wallet already created" });
            } else {
                const { type } = req.body;
                const prisma = new PrismaClient()
                if (type == "private_key") {
                    let s = await ProxyWallet.generatePrivateKeyTypeWallet()
                    await prisma.user.update({
                        where: {
                            id: u.id
                        },
                        data: {
                            walletType: "private_key",
                            privateKey: s.secret
                        }
                    })

                    return res.status(200).json({ message: "Wallet created" });
                }

                if (type == "mnemonic") {
                    let s = ProxyWallet.generateMnemonicTypeWallet()
                    await prisma.user.update({
                        where: {
                            id: u.id
                        },
                        data: {
                            walletType: "mnemonic",
                            privateKey: s.secret
                        }
                    })

                    return res.status(200).json({ message: "Wallet created" });
                }

                return res.status(400).json({ message: "Invalid wallet type" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
}

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]";
import {PrismaClient, User} from "@prisma/client"
import ProxyWallet from "@/utils/wallet";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed" });
    } else {
        let session = await getServerSession(req, res, options)
        if (session) {
            let u = session.user as User
            if (u.walletType == null) {
                res.status(400).json({ message: "Wallet not created" });
            } else {
                const prisma = new PrismaClient()
                let user = await prisma.user.findFirst({
                    where: {
                        id: u.id
                }})
                let address = await ProxyWallet.getWalletAddress({
                    type: user!.walletType!,
                    secret: user!.privateKey!
                })

                res.status(200).json({ address: address });
            }
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
}
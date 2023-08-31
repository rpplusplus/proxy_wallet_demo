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
    
            let { amount, toAddress } = req.body
    
            try {
                let result = await ProxyWallet.sendTransaction({
                    type: user!.walletType!,
                    secret: user!.privateKey!
                }, toAddress, amount)
                
                console.log(result)
                res.status(200).json({ result });
            } catch (e) {
                console.log(e)
                res.status(400).json({ message: e });
            }
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
}
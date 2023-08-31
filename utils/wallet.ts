import { LocalWallet } from "@thirdweb-dev/wallets"
import { entropyToMnemonic, generateMnemonic, mnemonicToEntropy } from "bip39"
import { Mumbai } from "@thirdweb-dev/chains"
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export type Wallet = {
    type: string
    secret: string
}

class ProxyWallet {
    
    static async generatePrivateKeyTypeWallet(): Promise<Wallet> {
        let w = new LocalWallet()
        await w.generate()
        let privateKey = await w.export({
            encryption: false,
            strategy: "privateKey"
        })
        return {
            type: "private_key",
            secret: privateKey
        }
    }

    static generateMnemonicTypeWallet() : Wallet {
        let mnemonic = generateMnemonic()
        let privateKey = mnemonicToEntropy(mnemonic)
        return {
            type: "mnemonic",
            secret: privateKey
        }
    }

    static mnemonicTypeWalletToMnemonic(w: Wallet): string {
        if (w.type != "mnemonic") {
            throw new Error("Invalid wallet type")
        }
        
        return entropyToMnemonic(w.secret)
    }

    static async getWalletAddress(w: Wallet): Promise<string> {
        let wallet = await this._getWallet(w)
        return wallet.getAddress()        
    }

    static async _getWallet(w: Wallet): Promise<LocalWallet> {

        let wallet = new LocalWallet()
        if (w.type == "private_key") {
            await wallet.import({
                privateKey: w.secret,
                encryption: false
            })
            
            return wallet
        } 

        if (w.type == "mnemonic") {
            await wallet.import({
                mnemonic: this.mnemonicTypeWalletToMnemonic(w),
                encryption: false
            })
            
            return wallet
        }

        throw new Error("Invalid wallet type")
    }

    static async getBalance(w: Wallet): Promise<String> {
        let wallet = await this._getWallet(w)
        await wallet.connect({chainId: Mumbai.chainId})
        let b = await wallet.getBalance()

        console.log(b)
        return `${b.displayValue} ${b.symbol}`
    }

    static async sendTransaction(w: Wallet, to: string, amount: string) {
        let wallet = await this._getWallet(w)
        await wallet.connect({chainId: Mumbai.chainId})
        const sdk = await ThirdwebSDK.fromWallet(wallet, "mumbai", {
          clientId: process.env.THIRD_CLIENT_ID,
          secretKey: process.env.THIRD_WEB_SECRET_KEY
        });
        
        let address = await wallet.getAddress()

        let result = await sdk.wallet.sendRawTransaction({
          from: address,
          to: to,
          value: ethers.utils.parseEther(amount),
        })

        return result
    }

}

export default ProxyWallet
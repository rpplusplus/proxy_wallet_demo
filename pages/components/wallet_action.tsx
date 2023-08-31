import { getSession, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Loading from "./loading"

const WalletAction: React.FC = () => {
    const [address, setAddress] = useState<String>("")
    const { data: session } = useSession()
    const [showLoading, setShowLoading] = useState<boolean>(false)
    useEffect(()=>{
        fetch("/api/users/address").then(async res=>{
            let resp = await res.json()
            setAddress(resp.address)
        })
    }, []) 

    if (address != "") {
        return <div className="">
            <div className="text-[1.5rem] font-semibold">welcome {session!.user?.email}</div>
            <div className="mt-2">Your address is <span className="text-success">{address}</span></div>
            <div className="mt-2 text-warning"> Current chain is TESTNET Mumbai</div>
            <div className="mt-10 font-bold text-[1.5rem]"> ACTIONS </div>
            
            <div className="flex flex-col gap-5 mt-5">
                <a className="btn" href="https://mumbaifaucet.com" target="__blank"> faucet </a>
                
                <button className="btn" onClick={async ()=>{
                    setShowLoading(true)
                    try{
                        let resp = await fetch("/api/users/balance")
                        let data = await resp.json()
                        setShowLoading(false)
                        alert(`Current Balance: ${JSON.stringify(data.balance)}`)
                    } catch(e){
                        setShowLoading(false)
                        alert(e)
                    }
                    
                }}>Get Balance</button>
                
                <button className="btn" onClick={async ()=> {
                    if (confirm("Send 0.001 MATIC to 0xfBA56Dd0b1a0BD4c93D8a450916068860D95Eb6f")) {
                        setShowLoading(true)
                        try {
                            let resp = await fetch("/api/users/send_transcation", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    toAddress: '0xfBA56Dd0b1a0BD4c93D8a450916068860D95Eb6f',
                                    amount: '0.001'
                                })
                            })
    
                            let d = await resp.json()
                            setShowLoading(false)
                            if (resp.ok) {
                                if (confirm("success, goto explorer, find trx detail?")) {
                                    window.open(`https://mumbai.polygonscan.com/tx/${d.result.receipt.transactionHash}`, "__blank")
                                }
                            } else {
                                alert(d.message.code)
                            }
                        } catch(e) {
                            setShowLoading(false)
                            alert(e)
                        }
                    }
                }}>Send Transcation</button>
                
                <button className="btn" onClick={async ()=>{
                    setShowLoading(true)
                    let resp = await fetch("/api/users/backup", {
                        method: "POST"
                    })
                    let d = await resp.json()
                    setShowLoading(false)
                    alert(`Save It: ${d.data}`)
                }}>Backup</button>
            </div>
            <Loading open={showLoading}/>
        </div>
        
    } else {
        return <div/>
    }

    
}

export default WalletAction
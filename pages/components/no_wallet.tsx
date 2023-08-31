import { useContext, useState } from "react"
import RadioGroup from "./radio_group"

const NoWallet: React.FC = () => {

    const radioGroupItems = [{
        value: "private_key",
        label: "private key"
    }, {
        value: 'mnemonic',
        label: 'mnemonic'
    }]

    const [type, SetType] = useState<string>("private_key");

    return (<>
        <div>No wallet found, create proxy wallet type </div>
        <div className="mt-5">
            <RadioGroup
                items={radioGroupItems}
                onChange={(s) => SetType(s)} value={type} />
        </div>

        <button className="btn btn-success mt-5" onClick={async ()=>{
            const resp = await fetch('/api/users/create_wallet', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({type})
            })

            if (resp.ok) {
                location.reload()
            }
        }}>CREATE</button>
    </>)
}

export default NoWallet
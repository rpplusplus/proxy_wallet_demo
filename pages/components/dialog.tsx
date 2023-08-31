import { useState } from "react"

export type DialogProps = {
    width?: string
    maxWidth?: string
    disbaled?: boolean
    open: boolean

    onClose?: () => void
    onSubmit?: () => void
}

const Dialog: React.FC<DialogProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <>
            <input type="checkbox"  className="modal-toggle"  checked={props.open || false} onChange={()=>{}}/>
            <div className="modal">
                <div className={`modal-box ${props.width??""} ${props.maxWidth ?? ""}`}>
                    
                    {props.children}

                    <div className="modal-action">
                        {props.onClose && ( <button onClick={()=>props.onClose!()} className="btn btn-ghost">close</button>)}
                        {props.onSubmit && (
                            <button onClick={()=>props.onSubmit!() } className="btn btn-accent" disabled={props.disbaled}>submit</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dialog
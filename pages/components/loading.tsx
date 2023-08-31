type LoadingProps = {
    open: boolean
    title?: string
    message?: string
}

const LoadingIndicator = () => {
    return (
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    )   
}

const Loading: React.FC<LoadingProps> = (props) => {
    return (
        <>
            <input type="checkbox"  className="modal-toggle"  checked={props.open || false} onChange={()=>{}}/>
            <div className="modal">
                <div className={`modal-box p-2-3 flex flex-col items-center w-[300px]`}>
                    <h1 className="text-[1.3rem] mb-3 font-bold">{props.title ?? "Loading..."}</h1>
                    
                    <LoadingIndicator/>
                    
                    <div className="mt-3">{props.message ?? ""}</div>
                </div>
            </div>
        </>
    )
}

export default Loading
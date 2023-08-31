export type RadioGroupItems = {
    label: string
    value: string
    disabled?: boolean
}

type RadioGroupProps = {
    items: RadioGroupItems[]
    isVertical?: boolean
    onChange: (value: string) => void
    value: string
}

const RadioGroup:React.FC<RadioGroupProps> = (props) => {
    return (
        <div className={`flex ${props.isVertical ? 'flex-col' : 'flex-row'} gap-3`}>
            {
                props.items && props.items.map((item, index) => {
                    return (
                        <div className="flex flex-row items-center" key={index}>
                            <input type="radio" name="radio-1" className="radio radio-accent" disabled={item.disabled} checked={item.value === props.value}  onChange={()=>props.onChange(item.value)}/>
                            <span  className="ml-2">{item.label}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RadioGroup
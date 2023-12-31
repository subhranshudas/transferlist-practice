import React from "react"

interface CheckboxListProps {
    namespace: string
    options: string[]
    onSelection: (args0: string, args1: boolean) => void
}

export function CheckboxList({
    namespace,
    options,
    onSelection
} : CheckboxListProps) {
    
    const onChangeOfCheckbox = (e) => {
        const checkboxId = e.target.id;
        const checkboxValue = checkboxId.split(`${namespace}_`)[1]
        onSelection(checkboxValue, e.target.checked)
    }
   
    return (
        <div className="p-4">
            <p className="font-bold my-2">{namespace}</p>
            {options.map((option: string) => {
                const checkBoxId = `${namespace}_${option}`
                return (
                    <div key={checkBoxId} className="flex gap-2">
                        <input type="checkbox" id={checkBoxId} onChange={onChangeOfCheckbox}/>
                        <label htmlFor={checkBoxId}>{option}</label>
                    </div>
                )
            })}
        </div>
    )
}

interface TransferListProps {
  initialOptions: string[]
  namespaces: string[]
}

export default function TransferList({
    initialOptions,
    namespaces
} : TransferListProps) {

    const [leftOptions, setLeftOptions] = React.useState<string[]>(initialOptions)
    const [rightOptions, setRightOptions] = React.useState<string[]>([])

    const [leftSelectedOptions, setLeftSelectedOptions] = React.useState<string[]>([])
    const [rightSelectedOptions, setRightSelectedOptions] = React.useState<string[]>([])

    const disableMoveLeftButton = rightSelectedOptions.length === 0
    const disableMoveRightButton = leftSelectedOptions.length === 0

    const onLeftSelection = (selectedItem: string, isChecked: boolean) => {
        setLeftSelectedOptions(prevState => {
            if (isChecked) {
                return [...prevState, selectedItem];
            } else {
                return prevState.filter(item => item !== selectedItem);
            }
        });
    }
    
    const onRightSelection = (selectedItem: string, isChecked: boolean) => {
        setRightSelectedOptions(prevState => {
            if (isChecked) {
                return [...prevState, selectedItem];
            } else {
                return prevState.filter(item => item !== selectedItem);
            }
        });
    }

    const onMoveLeft = () => {
        if (rightSelectedOptions.length > 0) {
            // if selection made 
            const newRightOptions = rightOptions.filter(item => !rightSelectedOptions.includes(item));
            setRightOptions(newRightOptions)

            const newLeftOptions = [...leftOptions, ...rightSelectedOptions]

            setLeftOptions(newLeftOptions)
            setRightSelectedOptions([])
        }
    }

    const onMoveRight = () => {
        if (leftSelectedOptions.length > 0) {
            const newLeftOptions = leftOptions.filter(item => !leftSelectedOptions.includes(item));
            setLeftOptions(newLeftOptions)
    
            const newRightOptions = [...rightOptions, ...leftSelectedOptions]

            setRightOptions(newRightOptions)
            setLeftSelectedOptions([])
        }
    }


    return (
        <div className="flex flex-row justify-between border border-blue-200">
            <CheckboxList
                namespace={namespaces[0]}
                options={leftOptions}
                onSelection={onLeftSelection}
            />

            <div className="flex flex-col justify-center border p-4 w-[400px] gap-2">
                <button className={`px-6 py-2 border text-3xl text-red-500 ${disableMoveLeftButton ? 'cursor-not-allowed' : ''}`} onClick={onMoveLeft} disabled={disableMoveLeftButton}>&lt;</button>
                <button className={`px-6 py-2 border text-3xl text-green-600 ${disableMoveRightButton ? 'cursor-not-allowed' : ''}`} onClick={onMoveRight} disabled={disableMoveRightButton}>&gt;</button>
            </div>

            <CheckboxList
                namespace={namespaces[1]}
                options={rightOptions}
                onSelection={onRightSelection}
            />
        </div>
    )
}


import {useEffect, useState} from "react";

interface ListProps {
    data: string[]
}

export const List = ({data}: ListProps) => {
    const [list, setList] = useState<string[]>([])
    const [newItem, setNewItem] = useState('')

    useEffect(() => {
        setList(data)
    }, [data])

    function addToList() {
        setTimeout(() => {
            setList(prev => [...prev, newItem])
        }, 500)
    }

    function removeFromList(listItem: string) {
        setTimeout(() => {
            setList(prev => prev.filter(item => item !== listItem))
        }, 500)
    }

    return (
        <>
            <input
                type='text'
                placeholder='New Item'
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
            />
            <button onClick={addToList}>Add to list</button>
            {
                list.map((item) => (
                    <li key={item}>
                        {item}
                        <button onClick={() => removeFromList(item)}>Remove</button>
                    </li>
                ))
            }
        </>
    )
}
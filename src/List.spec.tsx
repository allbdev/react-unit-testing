import {act, render, waitFor, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {List} from "./components/List.tsx";

describe('App component', () => {
    it('should render list items', async () => {
        const {rerender} = render(<List data={['Diego', 'Rodz', 'Mayk']}/>)

        expect(screen.getByText('Diego')).toBeInTheDocument()
        expect(screen.getByText('Rodz')).toBeInTheDocument()
        expect(screen.getByText('Mayk')).toBeInTheDocument()

        rerender(<List data={['Giulia']}/>)

        expect(screen.getByText('Giulia')).toBeInTheDocument()
        await waitFor(() => {
            expect(screen.queryByText('Mayk')).not.toBeInTheDocument()
        })
    })

    it('should be able to add new items to the list', async () => {
        const {findByText, getByText, getByPlaceholderText} = render(<List data={[]}/>)
        const user = userEvent.setup()
        const addButton = getByText('Add to list')
        const newItemInput = getByPlaceholderText('New Item')

        await act(async () => {
            await user.type(newItemInput, 'New')
            await user.click(addButton)
        })

        expect(await findByText('New')).toBeInTheDocument()
    })

    it('should be able to remove items from the list', async () => {
        const {queryAllByText, queryByText} = render(<List data={['Diego']}/>)
        const user = userEvent.setup()

        const removeButton = queryAllByText('Remove')

        await act(async () => {
            await user.click(removeButton[0])
        })

        await waitFor(() => {
            expect(queryByText('Diego')).not.toBeInTheDocument()
        })
    })
})
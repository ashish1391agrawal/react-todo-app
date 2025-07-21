import { Box, TextField } from '@material-ui/core'
import { ChangeEvent, ReactElement, useState } from 'react'
import { EditTodoCardDialogInterface } from './types'
import useStyles from './styles'

const EditTodoCardDialog = (properties: EditTodoCardDialogInterface): ReactElement => {
    const {
        data,
        updateTodoCardData
    } = properties

    const [newTodoCardData, setNewTodoCardData] = useState(data)

    const classes = useStyles()

    const handleTextFieldData = (event: ChangeEvent<HTMLInputElement>): void => {
        const { target: { value, name }} = event

        const blogDataCopy = {
            ...newTodoCardData,
            [name]: value
        }
        setNewTodoCardData({ ...blogDataCopy })
    }

    return (
        <Box>
            <form id="editTodoCard" onSubmit={(event) => {
                event.preventDefault()
                updateTodoCardData({
                    ...data,
                    ...newTodoCardData
                })
            }}>
                <TextField
                    required
                    variant="outlined"
                    name="title"
                    value={newTodoCardData.title}
                    onChange={handleTextFieldData}
                    fullWidth
                    className={classes.textFieldContainer}
                    label="Title"
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={3}
                    value={newTodoCardData.description}
                    onChange={handleTextFieldData}
                    name="description"
                    className={classes.textFieldContainer}
                    label="Description"
                />
            </form>
        </Box>
    )
}

export default EditTodoCardDialog

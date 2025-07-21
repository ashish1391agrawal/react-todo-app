import { Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@material-ui/core"
import { EditTwoTone, DeleteForeverTwoTone } from '@material-ui/icons'
import { ChangeEvent, useState } from "react"
import useStyles from './styles'
import { TodoCardInterface } from './types'

const TodoCard = (properties: TodoCardInterface) => {
    const { 
        todoCard,
        // Methods
        changeColor,
        setDraggedData,
        editTodoCard,
        deleteTodoCard
    } = properties

    const {
        createdAt,
        description,
        id,
        title,
        color = '#fff'
    } = todoCard

    const [isDragStart, setIsDragStart] = useState(false)

    const handleColor = (event: ChangeEvent<HTMLInputElement>): void => {
        const { target: { value }} = event
        changeColor({
            cardId: id,
            value
        })
    }

    const classes = useStyles({ color, isDragStart })

    let createTime = new Date(createdAt).getDate().toString()
    createTime += ` / ${new Date(createdAt).getMonth() + 1}`
    createTime += ` / ${new Date(createdAt).getFullYear()}`

    return (
        <Card 
            className={classes.cardContainer}
            draggable
            onDragStart={() => setDraggedData(todoCard)}
            onDrag={() => setIsDragStart(true)}
            onDragEnd={() => setIsDragStart(false)}
        >
            <CardHeader
                title={title}
                action={
                    <Box className={classes.cardActionContainer}>
                        <Box>
                            <IconButton size="small" onClick={() => editTodoCard(todoCard)}>
                                <EditTwoTone />
                            </IconButton>
                        </Box>
                        <Box className={classes.colorOption}>
                            <input 
                                type="color" 
                                value={color} 
                                onChange={handleColor}
                                className={classes.colorInput}
                            />
                        </Box>
                    </Box>
                }
            />
            <CardContent>
                <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    component="p"
                    className={classes.todoDetailContainer}
                >
                    {description}
                </Typography>
            </CardContent>
            <CardActions className={classes.todoCardActionContainer}>
                <Typography variant="caption">
                    Created at: {createTime}
                </Typography>
                <IconButton size="small" onClick={() => deleteTodoCard(id)}>
                    <DeleteForeverTwoTone fontSize="small" />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default TodoCard

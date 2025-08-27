import { 
    Box, 
    Card, 
    CardActions, 
    CardContent, 
    CardHeader, 
    IconButton, 
    Typography,
    Select,
    MenuItem 
} from "@material-ui/core"
import { EditTwoTone, DeleteForeverTwoTone } from '@material-ui/icons'
import { ChangeEvent, useState } from "react"
import useStyles from './styles'
import { TodoCardDataInterface, TodoCardInterface } from './types'
import ConfirmationDialog from "../ConfirmDialog"

const TodoCard = (properties: TodoCardInterface) => {
    const { 
        todoCard,
        categoryList = [],
        // Methods
        changeColor,
        setDraggedData,
        editTodoCard,
        deleteTodoCard,
        updateListOnCategoryChange = (_data: TodoCardDataInterface, _id: string) => null
    } = properties

    const {
        createdAt,
        description,
        id,
        title,
        color = '#000',
        backgroundColor = '#fff',
        todoListId
    } = todoCard

    const [isDragStart, setIsDragStart] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    const handleColor = (event: ChangeEvent<HTMLInputElement>): void => {
        const { target: { value }} = event;
        changeColor({
            cardId: id,
            value
        })
    }

    const classes = useStyles({ color, isDragStart, backgroundColor })

    let createTime = new Date(createdAt).getDate().toString()
    createTime += ` / ${new Date(createdAt).getMonth() + 1}`
    createTime += ` / ${new Date(createdAt).getFullYear()}`

    const handleConfirmDialog = (status: boolean) => {
        if(status) {
            deleteTodoCard(id);
        }
        setShowConfirmDialog(false);
    }

    return (
        <>
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
                                    <EditTwoTone classes={{root: classes.iconFontSize}} />
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
                            {categoryList.length && (<Box className={classes.categoryList}>
                                <Select
                                    classes={{
                                        root: `${classes.otherFont}  ${classes.selectControl}`,
                                        icon: classes.selectControl
                                    }}
                                    labelId="demo-simple-small-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    value={todoListId}
                                    variant="standard"
                                    onChange={(event) => updateListOnCategoryChange(todoCard, event.target.value as string)}
                                >
                                    {categoryList.map((category) => (
                                        <MenuItem 
                                            classes={{root: classes.otherFont}}
                                            value={category.listId}
                                            key={category.listId}
                                        >{category.value}</MenuItem>
                                    ))}
                                </Select>
                            </Box>)}
                        </Box>
                    }
                    classes={{
                        root: classes.withoutMargin, 
                        action: classes.headerAction,
                        title: classes.titleFont
                    }}
                />
                {description && (<CardContent classes={{root: classes.withoutMargin}}>
                    <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        component="p"
                        className={classes.todoDetailContainer}
                    >
                        {description}
                    </Typography>
                </CardContent>)}
                <CardActions classes={{root: classes.todoCardActionContainer}}>
                    <Typography variant="caption" classes={{root: classes.otherFont}}>
                        Created at: {createTime}
                    </Typography>
                    <IconButton size="small" onClick={() => setShowConfirmDialog(true)}>
                        <DeleteForeverTwoTone 
                            fontSize="small" 
                            classes={{root: classes.iconFontSize}} 
                        />
                    </IconButton>
                </CardActions>
            </Card>
            <ConfirmationDialog
                onAction={handleConfirmDialog}
                open={showConfirmDialog}
                message="Are you sure want to delete this todo"
                description="You never retrive this data again!"
            />
        </>
    )
}

export default TodoCard

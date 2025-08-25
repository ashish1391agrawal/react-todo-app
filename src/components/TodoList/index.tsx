import { Box, Divider, IconButton, OutlinedInput, Typography } from "@material-ui/core"
import { AddCircleOutline, EditTwoTone, DeleteForeverTwoTone } from "@material-ui/icons"
import { ChangeEvent, DragEvent, useState } from 'react'
import TodoCard from "../TodoCard"
import { ChangeColorInterface, TodoCardDataInterface } from "../TodoCard/types"
import useStyles from './styles'
import { TodoListInterface } from './types'

const TodoList = (properties: TodoListInterface) => {
    const {
        todoList,
        categoryList = [],
        // methods
        addTodoCard,
        handleTodoCardColor,
        handleTodoListColor,
        updateListOnDrag,
        setDraggedData,
        editTodoCardData,
        updateTodoListData,
        deleteTodoCard,
        deleteTodoList,
        updateListOnCategoryChange
    } = properties

    const {
        createdAt,
        id,
        title,
        todoCards,
        color = '#fff'
    } = todoList

    const [isListEditable, setIsListEditable] = useState(false)
    const [titleState, setTitleState] = useState(title)

    let createTime = new Date(createdAt).getDate().toString()
    createTime += ` / ${new Date(createdAt).getMonth() + 1}`
    createTime += ` / ${new Date(createdAt).getFullYear()}`

    const changeTodoCardColor = (todoCardObject: ChangeColorInterface): void => {
        handleTodoCardColor({
            ...todoCardObject,
            todoListId: id
        })
    }

    const handleDraggedData = (data: TodoCardDataInterface): void => {
        setDraggedData({
            todoCardData: data,
            todoTargetListId: id
        })
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
        event.preventDefault()
        updateListOnDrag(id)
    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>): void => event.preventDefault()

    const changeTodoListColor = (event: ChangeEvent<HTMLInputElement>): void => {
        const { target: { value } } = event
        handleTodoListColor({
            listId: id,
            value
        })

    }

    const handleTodoCardData = (todoCardData: TodoCardDataInterface): void => {
        editTodoCardData({
            ...todoCardData,
            listId: id
        })
    }

    const handleTitleValue = (event: ChangeEvent<HTMLInputElement>): void => {
        const { target: { value }} = event
        setTitleState(value)
    }

    const updateTodoTitle = (): void => {
        setIsListEditable(false)
        if(!titleState || title === titleState) return
        updateTodoListData({
            ...todoList,
            title: titleState
        })
    }

    const removeTodoCard = (cardId: string): void => {
        deleteTodoCard({
            listId: id,
            cardId
        })
    }

    const classes = useStyles({ color: color })

    const overrideTextFieldInputStyle = {
        root: classes.overrideOutlineRoot,
        input: classes.overrideOutlineInput
    }

    return (
        <Box
            className={classes.todoListContainer}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <>
                <Box className={classes.cardActionContainer}>
                    {
                        isListEditable ? (
                            <OutlinedInput
                                value={titleState}
                                autoFocus
                                onChange={handleTitleValue}
                                onBlur={updateTodoTitle}
                                classes={overrideTextFieldInputStyle}
                            />
                        ) : (
                            <Typography
                                variant="body1"
                                className={classes.todoTitle}
                            >
                                {title}
                            </Typography>)
                    }
                    <Box className={classes.colorContainer}>
                        <IconButton 
                            size="small" 
                            onClick={() => setIsListEditable(true)}
                            disabled={isListEditable}
                        >
                            <EditTwoTone />
                        </IconButton>
                        <Box className={classes.colorOption}>
                            <input
                                type="color"
                                value={color}
                                onChange={changeTodoListColor}
                                className={classes.colorInput}
                            />
                        </Box>
                    </Box>
                </Box>
                <Divider />
                {
                    todoCards.map((todo) => (
                        <TodoCard
                            todoCard={todo}
                            categoryList={categoryList}
                            key={todo.id}
                            changeColor={changeTodoCardColor}
                            setDraggedData={handleDraggedData}
                            editTodoCard={handleTodoCardData}
                            updateListOnCategoryChange={updateListOnCategoryChange}
                            deleteTodoCard={removeTodoCard}
                        />
                    ))
                }
                <Box className={classes.addMoreIcon}>
                    <Box>
                        <Typography variant="caption">
                            Created at: {createTime}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton size="small" onClick={() => addTodoCard(id)}>
                            <AddCircleOutline fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => deleteTodoList(id)}>
                            <DeleteForeverTwoTone fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </>
        </Box>
    )
}

export default TodoList

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core"
import { CloseRounded } from '@material-ui/icons'
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import EditTodoCardDialog from "../EditTodoCardDialog"
import { DraggedTodoCardDataInterface, TodoCardDataInterface } from "../TodoCard/types"
import TodoList from "../TodoList"
import { DeleteTodoCardInterface, EditTodoCardDataInterface, HandleTodoCardColorInterface, HandleTodoListColorInterface, TodoListDataInterface } from "../TodoList/types"
import useStyles from './styles'
import { HomeInterface } from './types'

const Home = forwardRef((properties: HomeInterface, ref) => {
    const {
        todoLists = []
    } = properties

    const [todoListsState, setTodoListsState] = useState(todoLists)
    const [isEditTodoCardData, setIsEditTodoCardData] = useState(false)
    const [editableCardData, setEditableCardData] = useState<EditTodoCardDataInterface>()
    const [draggedDataState, setDraggedDataState] = useState<DraggedTodoCardDataInterface>()

    useEffect(() => {
        const myLocalData = localStorage.getItem('myTodoData');
        if (myLocalData) {
            const myLocalDataList = JSON.parse(myLocalData) as Array<TodoListDataInterface>;
            updateMyStateLocal(myLocalDataList);
        } else {
            updateMyStateLocal(todoListsState);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => {
        const addNewList = (): void => {
            const newListObject: TodoListDataInterface = {
                createdAt: Date.now(),
                id: Date.now().toString(),
                title: 'Title',
                todoCards: [],
                color: 'rgb(0, 0, 0)',
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
            }
            updateMyStateLocal([
                ...todoListsState,
                newListObject
            ]);
        }
        return { addNewList }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addTodoCard = (listId: string): void => {
        const defaultTodoCard: TodoCardDataInterface = {
            createdAt: Date.now(),
            description: 'Add your task description',
            id: Date.now().toString(),
            title: 'Task Title',
            color: '#000',
            backgroundColor: '#fff',
            todoListId: listId
        }

        const updatedTodoList = todoListsState.map((listData) => {
            if (listData.id === listId) {
                return {
                    ...listData,
                    todoCards: [...listData.todoCards, defaultTodoCard]
                }
            }
            return listData
        })
        updateMyStateLocal(updatedTodoList)
    }

    const handleTodoCardColor = (todoListObject: HandleTodoCardColorInterface): void => {
        const {
            cardId,
            todoListId,
            value
        } = todoListObject

        const updatedTodoList = todoListsState.map((listData) => {
            if (listData.id === todoListId) {
                const updatedTodoCard = listData.todoCards.map((todoCardObject) => {
                    if (todoCardObject.id === cardId) {
                        const colorObject = hexToRgbA(value, false);
                        return {
                            ...todoCardObject,
                            ...colorObject
                        }
                    }
                    return todoCardObject
                })
                return {
                    ...listData,
                    todoCards: [...updatedTodoCard]
                }
            }
            return listData
        })
        updateMyStateLocal(updatedTodoList)
    }

    const hexToRgbA = (hex: string, isUseRgba = true): {color: string, backgroundColor: string} => {
        let c: any = []
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('')
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]]
            }
            c = '0x' + c.join('');
            const colorArray = [(c >> 16) & 255, (c >> 8) & 255, c & 255];

            if(!isUseRgba) {
                return {
                    color: `rgb(${[(255 - colorArray[0]), (255 - colorArray[1]), (255 - colorArray[2])].join(',')})`,
                    backgroundColor: `rgba(${[colorArray[0], colorArray[1], colorArray[2]].join(',')}, 0.8)`
                };    
            }
            return {
                color: `rgba(${[(255 - colorArray[0]), (255 - colorArray[1]), (255 - colorArray[2])].join(',')}, 0.5)`,
                backgroundColor: `rgba(${[colorArray[0], colorArray[1], colorArray[2]].join(',')}, 0.5)`
            }
            // return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, 0.5)`;
        }
        throw new Error('Bad Hex')
    }

    const handleTodoListColor = (todoListObject: HandleTodoListColorInterface): void => {
        const {
            listId,
            value
        } = todoListObject

        const updatedTodoList = todoListsState.map((listData) => {
            if (listData.id === listId) {
                return {
                    ...listData,
                    ...hexToRgbA(value)
                }
            }
            return listData
        })
        updateMyStateLocal(updatedTodoList)
    }

    const updateListOnDrag = (listId: string, draggedDataStateValue = draggedDataState): void => {
        if (!draggedDataStateValue) draggedDataStateValue = draggedDataState;
        if (!draggedDataStateValue) return
        const {
            todoCardData,
            todoTargetListId
        } = draggedDataStateValue

        let updatedTodoList = todoListsState.map((listData) => {
            if (listData.id === todoTargetListId) {
                const todoCardIndex = listData.todoCards.findIndex((todoCard) => todoCard.id === todoCardData.id)
                listData.todoCards.splice(todoCardIndex, 1)
            }
            return listData
        })

        const draggedData = {
            ...draggedDataState,
            todoCardData: {
                ...draggedDataStateValue.todoCardData,
                todoListId: listId
            }
        }

        updatedTodoList = todoListsState.map((listData) => {
            if (listData.id === listId) {
                return {
                    ...listData,
                    todoCards: [...listData.todoCards, draggedData.todoCardData]
                }
            }
            return listData
        });
        updateMyStateLocal(updatedTodoList)
    }

    const setDraggedData = (data: DraggedTodoCardDataInterface): void => {
        setDraggedDataState(data)
    }

    const handleTodoCardData = (data: EditTodoCardDataInterface) => {
        setEditableCardData(data)
        setIsEditTodoCardData(true)
    }

    const updateTodoCardData = (data: EditTodoCardDataInterface): void => {
        const {
            listId: todoListId,
            id: todoCardId
        } = data

        const updatedTodoList = todoListsState.map((listData) => {
            if (listData.id === todoListId) {
                const updatedTodoCard = listData.todoCards.map((todoCardObject) => {
                    if (todoCardObject.id === todoCardId) {
                        return {
                            ...todoCardObject,
                            title: data.title,
                            description: data.description
                        }
                    }
                    return todoCardObject
                })
                return {
                    ...listData,
                    todoCards: [...updatedTodoCard]
                }
            }
            return listData
        })
        updateMyStateLocal(updatedTodoList)
        setIsEditTodoCardData(false)
    }

    const updateTodoListData = (data: TodoListDataInterface): void => {
        const {
            id: todoListId
        } = data

        const updatedTodoList = todoListsState.map((listData) => {
            if (listData.id === todoListId) {
                return {
                    ...listData,
                    ...data
                }
            }
            return listData
        })
        updateMyStateLocal(updatedTodoList)
    }

    const updateMyStateLocal = (updatedList: Array<TodoListDataInterface>) => {
        localStorage.setItem('myTodoData', JSON.stringify(updatedList));
        setTodoListsState(updatedList);
    }

    const deleteTodoCard = (data: DeleteTodoCardInterface) => {
        const {
            cardId,
            listId
        } = data

        const updatedTodoList = todoListsState.map((listData) => {
            if (listData.id === listId) {
                const cardIndex = listData.todoCards.findIndex((todoCard) => todoCard.id === cardId)
                if (cardIndex > -1) {
                    listData.todoCards.splice(cardIndex, 1)
                    return listData
                }
            }
            return listData
        })
        updateMyStateLocal(updatedTodoList)
    }

    const deleteTodoList = (listId: string) => {
        const todoListIndex = todoListsState.findIndex((listData) => listData.id === listId)
        if (todoListIndex > -1) {
            todoListsState.splice(todoListIndex, 1)
        }
        updateMyStateLocal([...todoListsState])
    }

    const updateListOnCategoryChange = (todoCardData: TodoCardDataInterface, todoListId: string) => {
        updateListOnDrag(todoListId, {
            todoTargetListId: todoCardData.todoListId,
            todoCardData
        });
    }

    const classes = useStyles()
    const categoryList = todoListsState.map((todoListData) => (
        {
            listId: todoListData.id,
            value: todoListData.title
        }
    ));

    return (
        <Box className={classes.root}>
            {
                todoListsState.map((todoList) => (
                    <TodoList
                        todoList={todoList}
                        key={todoList.id}
                        categoryList={categoryList}
                        addTodoCard={addTodoCard}
                        handleTodoCardColor={handleTodoCardColor}
                        handleTodoListColor={handleTodoListColor}
                        updateListOnDrag={updateListOnDrag}
                        setDraggedData={setDraggedData}
                        editTodoCardData={handleTodoCardData}
                        updateTodoListData={updateTodoListData}
                        deleteTodoCard={deleteTodoCard}
                        deleteTodoList={deleteTodoList}
                        updateListOnCategoryChange={updateListOnCategoryChange}
                    />
                ))
            }
            {
                editableCardData ? (
                    <Dialog open={isEditTodoCardData}>
                        <DialogTitle className={classes.dialogRoot}>
                            <Box className={classes.dialogContainer}>
                                <Typography variant="subtitle1">Edit todo card</Typography>
                                <IconButton onClick={() => setIsEditTodoCardData(false)}>
                                    <CloseRounded />
                                </IconButton>
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <EditTodoCardDialog
                                data={editableCardData}
                                updateTodoCardData={updateTodoCardData}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                color="primary"
                                form='editTodoCard'
                                type="submit"
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                ) : <></>
            }
        </Box>
    )
})

export default Home

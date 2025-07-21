import { ChangeColorInterface, DraggedTodoCardDataInterface, TodoCardDataInterface } from "../TodoCard/types";

export interface TodoListInterface {
    todoList: TodoListDataInterface;
    // Methods 
    addTodoCard: (todoId: string) => void;
    handleTodoCardColor: (todoCardObject: HandleTodoCardColorInterface) => void;
    updateListOnDrag: (listId: string) => void;
    setDraggedData: (data: DraggedTodoCardDataInterface) => void;
    handleTodoListColor: (todoListObject: HandleTodoListColorInterface) => void;
    editTodoCardData: (data: EditTodoCardDataInterface) => void;
    updateTodoListData: (data: TodoListDataInterface) => void;
    deleteTodoCard: (data: DeleteTodoCardInterface) => void;
    deleteTodoList: (listId: string) => void;
}

export interface DeleteTodoCardInterface {
    cardId: string;
    listId: string;
}

export interface EditTodoCardDataInterface extends TodoCardDataInterface {
    listId: string;
}

export interface HandleTodoListColorInterface {
    listId: string;
    value: string;
}

export interface HandleTodoCardColorInterface extends ChangeColorInterface {
    todoListId: string
}

export interface TodoListDataInterface {
    color?: string;
    title: string;
    id: string;
    createdAt: number;
    todoCards: Array<TodoCardDataInterface>;
}

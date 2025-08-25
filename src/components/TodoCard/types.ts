import { HandleTodoListColorInterface } from "../TodoList/types";

export interface TodoCardInterface {
    todoCard: TodoCardDataInterface;
    categoryList?: Array<HandleTodoListColorInterface>;
    // Methods
    changeColor: (cardData: ChangeColorInterface) => void;
    setDraggedData: (data: TodoCardDataInterface) => void;
    editTodoCard: (data: TodoCardDataInterface) => void;
    deleteTodoCard: (cardId: string) => void;
    updateListOnCategoryChange: (data: TodoCardDataInterface, listId: string) => void;
}

export interface ChangeColorInterface {
    cardId: string;
    value: string;
}

export interface TodoCardDataInterface {
    color?: string;
    title: string;
    id: string;
    createdAt: number;
    description: string;
    todoListId: string;
}

export interface DraggedTodoCardDataInterface {
    todoTargetListId: string;
    todoCardData: TodoCardDataInterface;
}

export interface TodoCardStyleInterface {
    color: string;
    isDragStart: boolean;
}

export interface TodoCardInterface {
    todoCard: TodoCardDataInterface;
    // Methods
    changeColor: (cardData: ChangeColorInterface) => void;
    setDraggedData: (data: TodoCardDataInterface) => void;
    editTodoCard: (data: TodoCardDataInterface) => void;
    deleteTodoCard: (cardId: string) => void;
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
}

export interface DraggedTodoCardDataInterface {
    todoTargetListId: string;
    todoCardData: TodoCardDataInterface;
}

export interface TodoCardStyleInterface {
    color: string;
    isDragStart: boolean;
}

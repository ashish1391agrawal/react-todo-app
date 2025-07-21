import { EditTodoCardDataInterface } from "../TodoList/types"

export interface EditTodoCardDialogInterface {
    data: EditTodoCardDataInterface; 
    updateTodoCardData: (data: EditTodoCardDataInterface) => void;
}

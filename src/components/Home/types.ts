import { MutableRefObject } from "react";
import { TodoListDataInterface } from "../TodoList/types";

export interface HomeInterface { 
    todoLists: Array<TodoListDataInterface>;
}

export interface ChildRefComponentInterface {
    addNewList: () => void;
}

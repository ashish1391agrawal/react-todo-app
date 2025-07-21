import todoLists from './todos.json'
import { MocksInterface } from './types' 

const mocks = (): MocksInterface => {
    const todoListsTyped = todoLists

    return {
        todoLists: todoListsTyped
    }
}

export default mocks
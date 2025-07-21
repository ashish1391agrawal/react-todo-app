import { ChangeEvent } from "react";

export interface HeaderInterface {
    handleBackground: (event: ChangeEvent<HTMLInputElement>) => void;
    addNewList: () => void;
}

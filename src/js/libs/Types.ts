import Block from "./Block.ts";

export interface ComplexBlock {
    items: Array<Block>;
    placeholderElem: string;
    placeholderId: string;
}

export type ChildrenType = Record<string, Array<Block> | ComplexBlock>;

export type NestedObject = {
    data?: { [key: string]: unknown };
    events?: { [key: string]: (e?: Event) => void };
    attr?: { [key: string]: string };
    children?: ChildrenType;
}

export type DefaultObjectString = {
    [key: string]: string;
}

export type submitForm = {
    apiUrl: string;
    onsubmit: (e?: XMLHttpRequest) => void;
}
export default {}

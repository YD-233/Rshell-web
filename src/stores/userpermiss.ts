// noinspection TypeScriptValidateTypes

import {defineStore} from "pinia"

interface ObjectList {
    [key: string]: string[];
}

interface PermissState {
    key: string[];
    defaultList: ObjectList;
}

interface PermissActions {
    handleSet(val: string[]): void;
    clear(): void;
}

export const usePermissStore = defineStore<"permiss", PermissState, {}, PermissActions>("permiss", {
    state: (): PermissState => {
        return {
            key: [] as string[],
            defaultList: {
                admin: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"],
                user: ["1", "2", "3", "11", "13", "14", "15"]
            } as ObjectList
        }
    },

    actions: {
        handleSet(val: string[]): void {
            this.key = val
        },
        clear(): void {
            this.key = []
        }
    },
    persist: {
        storage: localStorage,
        pick: ["key"],
    }
})
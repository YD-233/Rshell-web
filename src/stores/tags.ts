import {defineStore} from 'pinia';
import type {LocationQueryRaw} from "vue-router";

interface ListItem {
    name: string;
    path: string;
    title: string;
    query: LocationQueryRaw;
}

interface TagsState {
    list: ListItem[];
}

interface TagsGetters {
    show: (state: TagsState) => boolean;
    nameList: (state: TagsState) => string[];
    [key: string]: any;
}

interface TagsActions {
    delTagsItem(index: number): void;
    setTagsItem(data: ListItem): void;
    clearTags(): void;
    closeTagsOther(data: ListItem[]): void;
    closeCurrentTag(data: any): void;
}

export const useTagsStore = defineStore<'tags', TagsState, TagsGetters, TagsActions>('tags', {
    state: (): TagsState => {
        return {
            list: [] as ListItem[]
        };
    },
    getters: {
        show: (state: TagsState): boolean => {
            return state.list.length > 0;
        },
        nameList: (state: TagsState): string[] => {
            return state.list.map(item => item.name);
        }
    },
    actions: {
        delTagsItem(index: number): void {
            this.list.splice(index, 1);
        },
        setTagsItem(data: ListItem): void {
            this.list.push(data);
        },
        clearTags(): void {
            this.list = [];
        },
        closeTagsOther(data: ListItem[]): void {
            this.list = data;
        },
        closeCurrentTag(data: any): void {
            for (let i = 0, len = this.list.length; i < len; i++) {
                const item = this.list[i];
                if (item && item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        const nextItem = this.list[i + 1];
                        if (nextItem) {
                            data.$router.push(nextItem.path);
                        }
                    } else if (i > 0) {
                        const prevItem = this.list[i - 1];
                        if (prevItem) {
                            data.$router.push(prevItem.path);
                        }
                    } else {
                        data.$router.push('/');
                    }
                    this.list.splice(i, 1);
                    break;
                }
            }
        }
    },
    persist: {
        key: "tag",
        storage: sessionStorage,
    },
});

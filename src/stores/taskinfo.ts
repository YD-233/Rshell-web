import {defineStore} from 'pinia';
import router from '@/router/index'

interface TaskState {
    task_ids: string;
}

interface TaskActions {
    setTaskIds(val: string): void;
    getTaskIds(): string;
    clear(): void;
}

export const useTaskStore = defineStore<'tasks', TaskState, {}, TaskActions>('tasks', {
    state: (): TaskState => ({
        task_ids: '',
    }),
    actions: {
        //储存任务id
        setTaskIds(val: string): void {
            this.task_ids = val
        },
        getTaskIds(): string {
            return this.task_ids
        },
        clear(): void {
            this.task_ids = ''
            router.push('/Tasks')
        }
    },
    persist: {
        key: "task_info",
        storage: sessionStorage,
        pick: ["task_ids"]
    },
})
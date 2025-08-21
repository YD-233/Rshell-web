// 用户信息pinia配置信息

import {defineStore} from 'pinia'
import router from '@/router/index'

interface UserState {
    token: string;
    roles: string;
    username: string;
    refresh: string;
}

interface UserActions {
    setToken(val: string): void;
    getToken(): string;
    setRoles(val: string): void;
    getRoles(): string;

    setUserName(val: string): void;
    getUserName(): string;
    setRefresh(val: string): void;
    getRefresh(): string;
    logout(): void;
}

export const useUserStore = defineStore<'user', UserState, {}, UserActions>('user', {
    state: (): UserState => ({
        token: '',
        roles: '',
        username: '',

        refresh: ''
    }),
    actions: {
        // 登录成功后将返回的 token 存起来
        setToken(val: string): void {
            this.token = val
        },
        getToken(): string {
            return this.token
        },
        setRoles(val: string): void {
            this.roles = val
        },
        getRoles(): string {
            return this.roles
        },

        setUserName(val: string): void {
            this.username = val
        },
        getUserName(): string {
            return this.username
        },
        setRefresh(val: string): void {
            this.refresh = val
        },
        getRefresh(): string {
            return this.refresh
        },
        // 清空 token 和角色并跳转到登录页
        logout(): void {
            this.token = ''
            this.roles = ''
            this.username = ''
            this.refresh = ''
            router.push('/login')
        }
    },
    persist: {
        key: 'token',
        storage: localStorage,
        pick: ['token', 'roles', 'username', 'refresh']
    }
})
import {createApp} from "vue"
import ElementPlus from "element-plus"

import pinia from "@/stores/index";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import App from "./App.vue"
import router from "./router"
import {useUserStore} from "@/stores/user"
// import {useAxiosConfigStore} from '@/stores/server';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import "element-plus/dist/index.css"
import "./assets/main.css"

import plugins from '@/plugins'

// 执行方法得到实例
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(ElementPlus)
plugins(app)

// 自定义权限指令
// 移除v-permiss指令，不再需要权限验证

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Rshell`
    // const axiosConfig = useAxiosConfigStore();
    const users = useUserStore()
    if (!router.hasRoute(to.name ?? '')) {
        next('/404')
    } else if (!users.username && to.path !== "/login") {
        next("/login")
    } else {
        // 移除权限检查，所有登录用户都有完整权限
        next()
    }
})
// 导入element plus的icon库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)

app.mount("#app")

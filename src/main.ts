import {createApp} from "vue"
import ElementPlus from "element-plus"

import pinia from "@/stores/index";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import App from "./App.vue"
import router from "./router"
import {usePermissStore} from "@/stores/userpermiss"
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
const permiss = usePermissStore()
app.directive("permiss", {
    mounted(el, binding) {
        if (!permiss.key.includes(String(binding.value))) {
            el["hidden"] = true
        }
    }
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Rshell`
    // const axiosConfig = useAxiosConfigStore();
    const users = useUserStore()
    const permiss = usePermissStore()
    if (!router.hasRoute(to.name ?? '')) {
        next('/404')
    } else if (!users.username && to.path !== "/login") {
        next("/login")
    } else if (to.meta.permiss && !permiss.key.includes(String(to.meta.permiss))) {
        // 如果没有权限，则进入401
        next("/401")
    } else {
        next()
    }
})
// 导入element plus的icon库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)

app.mount("#app")

import java from "../components/backend/java.vue";
import python from "../components/backend/python.vue";
import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/java",
        name: "java",
        component: java
    },
    {
        path: "/python",
        name: "python",
        component: python
    }
]
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})
export default router;

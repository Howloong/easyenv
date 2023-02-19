import {createRouter, createWebHistory} from "vue-router";
import java from "../components/backend/java.vue";
import python from "../components/backend/python.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
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
})
export default router;

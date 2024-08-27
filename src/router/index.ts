import { createRouter, createWebHistory } from "vue-router"
import HomePage from "@/pages/HomePage.vue"
import StackBuilder from "@/pages/StackBuilder.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomePage },
    { path: "/stack", component: StackBuilder },
  ],
})

export default router

import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {path: '/', name: 'Home', component: () => import('../views/HomeView.vue')},
    {path: '/about', name: 'About', component: () => import('../views/AboutView.vue')},
    {path: '/posts', name: 'Posts', component: () => import('../views/PostsView.vue')},
    {path: '/posts/:id', name: 'Artist', component: () => import('../views/PostView.vue')},
    {path: '/artists', name: 'Artists', component: () => import('../views/ArtistsView.vue')},
    {path: '/artists/:id', name: 'Artist', component: () => import('../views/ArtistView.vue')},
]

const router = new VueRouter({ mode: 'history',  base: process.env.BASE_URL, routes })

export default router

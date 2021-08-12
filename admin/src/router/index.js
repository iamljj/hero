import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategroiesEdit from '../views/CategroyEdit.vue'
import Categroieslist from '../views/Catgorieslist.vue'
import Itemlist from '../views/Itemlist.vue'
import ItemEdit from '../views/ItemEdit.vue'
import Herolist from '../views/Herolist.vue'
import HeroEdit from '../views/HeroEdit.vue'
import Articlelist from '../views/Articlelist.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import Adlist from '../views/Adlist.vue'
import AdEdit from '../views/AdEdit.vue'
import AdminUserlist from '../views/AdminUserlist.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: Login,
        meta: { isPublic: true }
    },
    {
        path: '/',
        name: 'main',
        component: Main,
        children: [{
            path: 'categroies/create',
            component: CategroiesEdit
        }, {
            path: '/categories/edit/:id',
            component: CategroiesEdit,
            props: true
        }, {
            path: 'categories/list',
            component: Categroieslist
        }, {
            path: 'items/list',
            component: Itemlist
        }, {
            path: 'items/create',
            component: ItemEdit
        }, {
            path: 'items/edit/:id',
            component: ItemEdit,
            props: true
        }, {
            path: 'heroes/list',
            component: Herolist
        }, {
            path: 'heroes/create',
            component: HeroEdit
        }, {
            path: 'heroes/edit/:id',
            component: HeroEdit,
            props: true
        }, {
            path: 'articles/list',
            component: Articlelist
        }, {
            path: 'articles/create',
            component: ArticleEdit
        }, {
            path: 'articles/edit/:id',
            component: ArticleEdit,
            props: true
        }, {
            path: 'ads/list',
            component: Adlist
        }, {
            path: 'ads/create',
            component: AdEdit
        }, {
            path: 'ads/edit/:id',
            component: AdEdit,
            props: true
        }, {
            path: 'admin_users/list',
            component: AdminUserlist
        }, {
            path: 'admin_users/create',
            component: AdminUserEdit
        }, {
            path: 'admin_users/edit/:id',
            component: AdminUserEdit,
            props: true
        }]
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (!to.meta.isPublic && !localStorage.token) {
        console.log("neet login");
        return next('/login')
    }
    next()


})

export default router
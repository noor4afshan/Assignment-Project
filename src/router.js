import { createRouter, createWebHistory } from 'vue-router'
import userList from './components/userList.vue'
import userDetails from './components/userDetails.vue'
import editUser from './components/editUser.vue'


const routes = [

    { path: '/', name: 'userList', component: userList },
    { path: '/userDetails/:id', name: 'userDetails', component: userDetails, props: true },
    { path: '/editUser/:id', name: 'editUser', component: editUser },

]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
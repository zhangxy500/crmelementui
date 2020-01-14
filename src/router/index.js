import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Login
	},
	{
		path: '/login',
		name: 'Login',
		component: Login

	},
	{
		path: '/admin',
		name: 'Admin',
		component: Admin
		/*children:[
		{
			path:'/admin',
			name:'Welcome',
			component: HelloWorld
		},{
			path:'/admin/adduser',
			name:'User',
			component: User
		},{
			path:'/admin/updateuser',
			name:'User',
			component: User
		},{
			path:'/admin/deleteuser',
			name:'User',
			component: User
		},{
			path:'/admin/selectuser',
			name:'User',
			component: User
		}
		
		]*/
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
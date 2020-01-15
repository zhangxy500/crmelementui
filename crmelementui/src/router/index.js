import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import HelloWorld from '../components/HelloWorld.vue'
import saleChanceList from '../views/sale/saleChanceList.vue'
import InsertSaleChance from '../views/sale/InsertSaleChance.vue'
import UpdateSaleChance from '../views/sale/UpdateSaleChance.vue'
import AppointSaleChance from '../views/sale/AppointSaleChance.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },{
  	path: '/login',
    name: 'Login',
    component: Login
  },{
  	path:'/admin',
  	name:'Admin',
  	component:Admin,
  	children:[{
  		path:'/admin/',
  		name:'HelloWorld',
  		component:HelloWorld
  	},{
  		path: '/admin/salechancelist',
			name: 'SaleChanceList',
			component: saleChanceList
  	},{
  		path: '/admin/insertsalechance',
			name: 'InsertSaleChance',
			component: InsertSaleChance
  	},{
  		path: '/admin/updatesalechance',
			name: 'UpdateSaleChance',
			component: UpdateSaleChance
  	},{
  		path: '/admin/appointsalechance',
			name: 'AppointSaleChance',
			component: AppointSaleChance
  	}]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

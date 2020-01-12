import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import element from 'element-ui'
//由于elementui是ui组件,所以它也需要导入css文件
import 'element-ui/lib/theme-chalk/index.css'

//使用Vue.use(element),就可以在全局使用elementui了
Vue.use(element)

axios.defaults.baseURL = 'http://localhost:8081/news/';
Vue.prototype.$axios = axios;

//获取当前时间（XXXX-XX-XX）
function getCurDate() {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	return year + "-" + month + "-" + day;
}
Vue.prototype.$getCurDate = getCurDate;

//向sessionStorage中存储一个JSON对象
function setSessionStorage(keyStr, value) {
	sessionStorage.setItem(keyStr, JSON.stringify(value));
}
Vue.prototype.$setSessionStorage = setSessionStorage;

//从sessionStorage中获取一个JSON对象（取不到时返回null）
function getSessionStorage(keyStr) {
	var str = sessionStorage.getItem(keyStr);
	if (str == '' || str == null || str == 'null' || str == undefined) {
		return null;
	} else {
		return JSON.parse(str);
	}
}
Vue.prototype.$getSessionStorage = getSessionStorage;

//从sessionStorage中移除一个JSON对象
function removeSessionStorage(keyStr) {
	sessionStorage.removeItem(keyStr);
}
Vue.prototype.$removeSessionStorage = removeSessionStorage;

//分页函数
/*
 * 一、参数：
 * 1、查询总行数的url     （String）
 * 2、查询业务数据的url   （String）
 * 3、业务查询条件        （json对象；注意：如果不传这个参数，那么应该传null）
 * 4、当前页数           （int 如果当前页数为负数，那么默认为1；如果当前页数大于最大页数，那么默认为最大页数；）
 * 5、每页最大记录数      （int）
 * 6、回调函数           （function）
 * 
 * 二、返回值（json对象）：
 * 1、当前页数
 * 2、总行数
 * 3、总页数
 * 4、上一页
 * 5、下一页
 * 6、开始记录数
 * 7、业务数据
 * 8、返回信息：返回信息(默认为success，当总行数查询和业务数据查询失败时返回fail)
 * 
 * 三、注意事项：
 * 使用此函数时，服务器端必须要接收两个参数：beginNum（查询开始记录数）、maxNum（每页最大行数）
 */
function fenye(countUrl, dataUrl, dataParam, pageNum, maxNum, callback) {
	//初始化总行数
	var totalRow = 0;
	//初始化总页数
	var totalPageNum = 0;
	//初始化上一页
	var preNum = 0;
	//初始化下一页
	var nextNum = 0;
	//初始化开始记录数
	var beginNum = 0;

	//初始化回调函数中要返回的对象
	var result = {
		'pageNum': pageNum, //当前页数
		'totalRow': totalRow, //总行数
		'totalPageNum': totalPageNum, //总页数
		'preNum': preNum, //上一页
		'nextNum': nextNum, //下一页
		'beginNum': beginNum, //开始记录数
		'data': [], //业务数据
		'message': 'success', //返回信息(默认为success，当总行数查询和业务数据查询失败时返回fail)
	};

	//查询总行数
	this.$axios.post(countUrl, dataParam)
		.then(response => {
			//alert(JSON.stringify(response));
			//获取查询的总行数
			totalRow = response.data;

			//如果查询数据行数为0，那么直接调用回调函数，然后结束。
			if (totalRow == 0) {
				callback(result);
				return false;
			}
			//计算总页数
			totalPageNum = Math.ceil(totalRow / maxNum);
			//当前页数验证
			if (pageNum <= 0) {
				pageNum = 1;
			}
			if (pageNum > totalPageNum) {
				pageNum = totalPageNum;
			}
			//设置上一页和下一页
			preNum = pageNum;
			nextNum = pageNum;
			if (pageNum > 1) {
				preNum--;
			}
			if (pageNum < totalPageNum) {
				nextNum++;
			}
			//计算开始查询记录数
			beginNum = (pageNum - 1) * maxNum;

			//这里即使是没有业务查询条件，dataParam也不能为空，因为还需要beginNum、maxNum参数。
			if (dataParam == null) {
				dataParam = {};
			}
			dataParam.beginNum = beginNum;
			dataParam.maxPageNum = maxNum;
			this.$axios.post(dataUrl, dataParam)
				.then(response => {
					result.pageNum = pageNum;
					result.totalRow = totalRow;
					result.totalPageNum = totalPageNum;
					result.preNum = preNum;
					result.nextNum = nextNum;
					result.beginNum = beginNum;
					result.data = response.data;
					result.message = "success";
					callback(result);
				})
				.catch(error => {
					result.message = "fail";
					callback(result);
					console.log(error);
				});
		})
		.catch(error => {
			result.message = "fail";
			callback(result);
			console.log(error);
		});
}
Vue.prototype.$fenye=fenye;

router.beforeEach(function(to,from,next){
	const nextRoute=[
		'/admin',
		'/admin/newsTypeList',
		'/admin/newsList',
		'/admin/addNewsType',
		'/admin/updateNewsType',
		'/admin/addNews',
		'/admin/updateNews'
	];
	let users = sessionStorage.getItem('users');
	if(nextRoute.indexOf(to.path)>=0){
		if(users==null){
			router.push('/login');
			location.reload();
		}
	}
	next();
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

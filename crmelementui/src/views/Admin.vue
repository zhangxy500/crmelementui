<template>
<el-container style="height: 914px; border: 1px solid #eee">
  <el-aside width="200px" height="700px" style="background-color:#545c64 ;">
    <div class="aside"  style="background-color: #B3C0D1; border: 1px solid #B3C0D1 ;height: 78px;" >
        <h1 style=" text-align: center; line-height:50px;">CRM</h1>
        </div>
      <el-menu
      router
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>营销管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="/admin/salechancelist">销售机会管理</el-menu-item>
          <el-menu-item index="1-2">客户开发计划</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>客户管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="2-1">客户信息管理</el-menu-item>
          <el-menu-item index="2-2">客户流失管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>服务管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="3-1">服务创建</el-menu-item>
          <el-menu-item index="3-2">服务分配</el-menu-item>
          <el-menu-item index="3-3">服务处理</el-menu-item>
          <el-menu-item index="3-4">服务反馈</el-menu-item>
          <el-menu-item index="3-5">服务归档</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>统计报表</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="4-1">客户贡献分析</el-menu-item>
          <el-menu-item index="4-2">客户构成分析</el-menu-item>
          <el-menu-item index="4-3">客户服务分析</el-menu-item>
          <el-menu-item index="4-4">客户流失分析</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>基础数据</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="5-1">数据字典-企业客户等级</el-menu-item>
          <el-menu-item index="5-2">数据字典-服务类别</el-menu-item>
          <el-menu-item index="5-3">数据字典-地区</el-menu-item>
          <el-menu-item index="5-4">用户及权限管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


    </el-menu>
  </el-col>
</el-row>
  </el-aside>
  <el-container>
    <el-header style="text-align: right; font-size: 12px" height="80px">
      <el-badge class="item">欢迎你 :{{sysUser.userName}} |
      <el-link :underline="false" style=" color:#000000;">退出</el-link>
      </el-badge>
    </el-header>
    <el-main>
    <div id="main">
    	<router-view></router-view>
    </div>
    </el-main>

     <el-footer style="text-align: right; font-size: 12px" height="80px">
    
      <p align="center" style="color:#7f7f7f; font-size: 16px ; line-height:70px;">copyright@版权归张兴业所有</p>
    </el-footer>
  </el-container>

</el-container>
</template>
<style>
  .el-header,.el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 80px;
  }
  .el-submenu{
    padding-top:10px;
  }

  body{
    padding: 0;
    margin: 0;
  }
 .el-menu-vertical-demo{
   background-color: #B3C0D1;
 }
 span{
   font-size: 16px;
 }
</style>

<script>
  export default {
		name: 'Admin',
		data() {
			return {
				bodyHeight: 0,
				sysUser: ''
			}
		},
		created() {
			this.sysUser = this.$getSessionStorage('sysUser');
		},
		mounted() {
			document.getElementById('main').style.height = document.body.clientHeight - 120 + 'px';
			this.bodyHeight = document.body.clientHeight;
			//监听浏览器窗口尺寸改变事件
			window.onresize = () => {
				//获取body高度，赋值给this.bodyHeight
				this.bodyHeight = document.body.clientHeight;
			}
		},
		watch: {
			bodyHeight: function() {
				document.getElementById('main').style.height = this.bodyHeight - 120 + 'px';
			}
		},
		methods: {

		}
	}
</script>

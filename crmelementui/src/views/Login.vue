<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>登陆</span>
			</div>
			<div class="text item">
				<el-form ref="sysUser" :model="sysUser" label-width="70px">
					<el-form-item label="用户名">
						<el-input v-model="sysUser.userName"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="sysUser.userPassword" show-password></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="login()">登陆</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sysUser: {
					userName: '',
					userPassword: ''
				}
			}
		},
		methods: {
			
			login() {
				/*console.log(this.sysUser.username);*/
				if (this.sysUser.userName == '') {
					alert('用户名不能为空！');
					return;
				}
				if (this.sysUser.userPassword == '') {
					alert('密码不能为空！');
					return;
				}
				
				this.$axios.post('login',this.sysUser)
					.then((response) => {
						console.log(response);
						if(response.data==''){
							alert('用户名或密码输入错误！');
						}else{
							this.$setSessionStorage('sysUser',response.data);
							this.$router.push('/admin');
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 350px;
		margin: 0 auto;
		margin-top: 100px;
	}
</style>

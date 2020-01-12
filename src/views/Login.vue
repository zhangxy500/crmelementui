<template>
	<div>
		<el-card class="box-card">
			<div solt="hedar" class="clearfix">
				<span>登录</span>
			</div>
			<div class="text item">
				<el-form ref="user" :model="user" label-width="80px">
					<el-form-item label="用户名">
						<el-input v-model="user.name"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="user.password" showpassword></el-input>
					</el-form-item>

					<el-button type="primary" @click="onSubmit">立即创建</el-button>
					<el-button>取消</el-button>
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
				user: {
					name:'',
					password:''

				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
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
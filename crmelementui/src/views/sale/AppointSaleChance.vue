<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>销售机会管理</el-breadcrumb-item>
			<el-breadcrumb-item>指派销售机会</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button type="primary" size="small" @click="appointSaleChance()">指派</el-button>

		<el-form :inline="true" :model="saleChance" label-width="130px" style="margin-top: 15px;">
			<el-form-item label="销售机会编号">
				<el-input v-model="saleChance.chanceId" disabled></el-input>
			</el-form-item>
			<el-form-item label="机会来源">
				<el-input v-model="saleChance.chanceSource" disabled></el-input>
			</el-form-item>
			<el-form-item label="客户名称" >
				<el-input v-model="saleChance.chanceCustName" disabled></el-input>
			</el-form-item>
			<el-form-item label="成功概率(%)" >
				<el-input v-model="saleChance.chanceRate" disabled></el-input>
			</el-form-item>
			<el-form-item label="概要" >
				<el-input v-model="saleChance.chanceTitle" disabled></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model="saleChance.chanceLinkman" disabled></el-input>
			</el-form-item>
			<el-form-item label="联系人电话">
				<el-input v-model="saleChance.chanceTel" disabled></el-input>
			</el-form-item>
			<el-form-item label="创建人">
				<el-input v-model="userName" disabled></el-input>
			</el-form-item>
			<el-form-item label="创建时间">
				<el-input v-model="saleChance.chanceCreateDate" disabled></el-input>
			</el-form-item>
			<el-form-item label="机会描述">
				<el-input type="textarea" v-model="saleChance.chanceDesc" style="width:400px;" disabled></el-input>
			</el-form-item>
			<el-form-item label="指派给" required>
				<el-select v-model="saleChance.chanceDueId" placeholder="请选择指派人" style="width:400px;">
					<el-option v-for="item in sysUser" :key="item.userId" :label="item.userName" :value="item.userId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="指派日期">
				<el-input v-model="saleChance.chanceDueDate" disabled></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				saleChance: {
					chanceId: 0,
					chanceSource: '',
					chanceCustName: '',
					chanceTitle: '',
					chanceRate: 0,
					chanceLinkman: '',
					chanceTel: '',
					chanceDesc: '',
					chanceCreateId: 0,
					chanceCreateDate: '',
					chanceDueId: 0,
					chanceDueDate: '',
					chanceStatus: 0
				},
				userName: '11',
				sysUser: [],

			}
		},
		created() {
			this.$axios.post('selectSaleChanceByChanceId', {
					chanceId: this.$getSessionStorage("chanceId")
				})
				.then((response) => {
					console.log("aaa");
					console.log(response);
					this.saleChance = response.data;

					this.saleChance.chanceDueDate = this.$getCurDate();
				})
				.catch((error) => {
					console.log(error);
				})



			//查客户经理的用户
			this.$axios.post('selectSysUserByCondition', {
					userRoleId: 3
				})
				.then((response) => {
					console.log(response);
					this.sysUser = response.data;
				})
				.catch((error) => {
					console.log(error);
				})
			//根据id 查创建人的name
			this.$axios.post('selectSysUserByCondition', {
					userId: this.$getSessionStorage("userId")
				})
				.then((response) => {
					this.userName = response.data[0].userName;
				})
				.catch((error) => {
					console.log(error);
				})

		},
		methods: {
			appointSaleChance() {
				this.saleChance.chanceStatus = 1;
				this.$axios.post('updateSaleChance', this.saleChance)
					.then((response) => {
						if (response.data == 1) {
							this.$router.push('/admin/salechancelist');
						} else {
							alert('添加失败');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			}
		}
	}
</script>

<style scoped>
	.el-input {
		width: 400px;
	}

	.el-button {
		margin-top: 30px;
		margin-bottom: 10px;
		margin-left: 40px;
	}
</style>

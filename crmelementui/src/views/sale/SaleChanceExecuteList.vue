<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>营销管理</el-breadcrumb-item>
			<el-breadcrumb-item>客户开发计划</el-breadcrumb-item>
			<el-breadcrumb-item>执行机会列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :inline="true" :model="params" class="demo-form-inline" size="small">
			<el-form-item label="客户名称">
				<el-input v-model="params.chanceCustName"></el-input>
			</el-form-item>
			<el-form-item label="概要">
				<el-input v-model="params.chanceTitle"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model="params.chanceLinkman"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="warning" @click="clearConditions()">清空</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="selectSaleChanceByConditions()">查询</el-button>
			</el-form-item>

		</el-form>
		<el-table :data="result.data" stripe style="width: 100%">
			<el-table-column prop="chanceId" label="编号" width="180">
			</el-table-column>
			<el-table-column prop="chanceCustName" label="客户名称" width="250">
			</el-table-column>
			<el-table-column prop="chanceTitle" label="概要" width="300">
			</el-table-column>
			<el-table-column prop="chanceLinkman" label="联系人">
			</el-table-column>
			<el-table-column prop="chanceTel" label="联系电话">
			</el-table-column>
			<el-table-column prop="chanceCreateDate" label="创建时间">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button class="el-icon-edit-outline" title="制定计划" @click="salePlanFormulateView(scope.row.chanceId)" type="text"
					 size="medium"></el-button>
					<el-button class="el-icon-delete" title="执行计划" @click="salePlanExecuteView(scope.row.chanceId)" type="text" size="small"></el-button>
					<el-button class="el-icon-thumb" title="开发成功" @click="developsuc(scope.row.chanceId,scope.row.chanceCreateId)"
					 type="text" size="small"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next,jumper" :total="result.totalRow" :page-size="$store.state.maxPageNum"
		 @current-change="handleCurrentChange">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				result: '',
				params: {
					chanceCustName: '',
					chanceTitle: '',
					chanceLinkman: '',
					chanceStatus: 1,
					chanceDueId:0
				}

			}
		},
		created() {
			this.fenye(1);
			this.params.chanceDueId = this.$getSessionStorage('sysUser').userId;
		},
		methods: {
			fenye(pageNum) {
				this.$fenye('selectSaleChanceCount', 'selectSaleChancePaging', this.params, pageNum, this.$store.state.maxPageNum,
					(response) => {
						this.result = response;
					})
			},
			selectSaleChanceByConditions() {
				this.fenye(1);
			},
			clearConditions() {
				this.params.chanceCustName = '',
					this.params.chanceTitle = '',
					this.params.chanceLinkman = ''
			},
			//跳转制定计划界面
			salePlanFormulateView(chanceId) {
				this.$setSessionStorage('chanceId',chanceId)
				this.$router.push('/admin/saleplanformulateview');
			},
			handleCurrentChange(val) {
				this.fenye(val);
			},
			salePlanExecuteView(chanceId) {
				this.$setSessionStorage("chanceId", chanceId);
				this.$router.push('UpdateSaleChance');
			},
			developsuc(chanceId) {
				if (!confirm('确认删除？')) {
					return;
				}
				this.$axios.post('delSaleChance', {
						chanceId: chanceId
					})
					.then((response) => {
						if (response.data == 1) {
							console.log("删除成功");
							this.fenye(1);
						} else {
							alert('删除失败');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			appointSaleChanceView(chanceId, chanceCreateId) {
				this.$router.push("/admin/appointsalechance");
				this.$setSessionStorage("chanceId", chanceId);
				this.$setSessionStorage("chanceCreateId", chanceCreateId);
			}
		
		}

	}
</script>

<style>
	.demo-form-inline {
		margin-top: 15px;
		margin-bottom: 10px;
	}
</style>

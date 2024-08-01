<template>
  <div>
    <el-table :data="roles">
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="description" label="角色描述"></el-table-column>
      <el-table-column>
        <template v-slot="scope">
          <el-button @click="editRole(scope.row)">编辑</el-button>
          <el-button @click="deleteRole(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RoleList',
  data() {
    return {
      roles: []
    };
  },
  created() {
    this.fetchRoles();
  },
  methods: {
    fetchRoles() {
      axios.get('/api/roles', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          this.roles = response.data.data;
        })
        .catch(() => {
          this.$message.error('获取角色列表失败');
        });
    },
    editRole(role) {
      console.log(role);  // 确保 role 被定义和使用
      // 编辑角色逻辑
    },
    deleteRole(role) {
      console.log(role);  // 确保 role 被定义和使用
      axios.delete(`/api/roles/${role.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          this.fetchRoles();
          this.$message.success('角色删除成功');
        })
        .catch(() => {
          this.$message.error('角色删除失败');
        });
    }
  }
};
</script>
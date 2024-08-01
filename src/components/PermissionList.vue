<template>
  <div>
    <el-table :data="permissions">
      <el-table-column prop="name" label="权限名称"></el-table-column>
      <el-table-column prop="description" label="权限描述"></el-table-column>
      <el-table-column>
        <template v-slot="scope">
          <el-button @click="editPermission(scope.row)">编辑</el-button>
          <el-button @click="deletePermission(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PermissionList',
  data() {
    return {
      permissions: []
    };
  },
  created() {
    this.fetchPermissions();
  },
  methods: {
    fetchPermissions() {
      axios.get('/api/permissions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          this.permissions = response.data.data;
        })
        .catch(() => {
          this.$message.error('获取权限列表失败');
        });
    },
    editPermission(permission) {
      console.log(permission);  // 确保 permission 被定义和使用
      // 编辑权限逻辑
    },
    deletePermission(permission) {
      console.log(permission);  // 确保 permission 被定义和使用
      axios.delete(`/api/permissions/${permission.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          this.fetchPermissions();
          this.$message.success('权限删除成功');
        })
        .catch(() => {
          this.$message.error('权限删除失败');
        });
    }
  }
};
</script>
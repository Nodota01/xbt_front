<template>
  <div>
    <el-table :data="menus">
      <el-table-column prop="name" label="菜单名称"></el-table-column>
      <el-table-column prop="path" label="菜单路径"></el-table-column>
      <el-table-column>
        <template v-slot="scope">
          <el-button @click="editMenu(scope.row)">编辑</el-button>
          <el-button @click="deleteMenu(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MenuList',
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.fetchMenus();
  },
  methods: {
    fetchMenus() {
      axios.get('/api/menus', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          this.menus = response.data.data;
        })
        .catch(() => {
          this.$message.error('获取菜单列表失败');
        });
    },
    editMenu(menu) {
      console.log(menu);  // 确保 menu 被定义和使用
      // 编辑菜单逻辑
    },
    deleteMenu(menu) {
      console.log(menu);  // 确保 menu 被定义和使用
      axios.delete(`/api/menus/${menu.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          this.fetchMenus();
          this.$message.success('菜单删除成功');
        })
        .catch(() => {
          this.$message.error('菜单删除失败');
        });
    }
  }
};
</script>
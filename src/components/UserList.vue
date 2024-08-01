<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="searchForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件">
        <el-input v-model="searchForm.email" placeholder="请输入电子邮件"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="searchForm.phoneNumber" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchUsers">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="showCreateUserDialog">新增用户</el-button>

    <el-table :data="users">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="电子邮件"></el-table-column>
      <el-table-column prop="phoneNumber" label="电话号码"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="userNumber" label="用户编号"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column>
        <template v-slot="scope">
          <el-button @click="editUser(scope.row)">编辑</el-button>
          <el-button @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增用户" v-model="createUserDialogVisible">
      <el-form :model="newUser">
        <el-form-item label="用户名">
          <el-input v-model="newUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="newUser.password"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input v-model="newUser.email"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="newUser.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="newUser.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="newUser.gender">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户编号">
          <el-input v-model="newUser.userNumber"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createUser">创建</el-button>
          <el-button @click="createUserDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import sha256 from 'js-sha256';

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
      searchForm: {
        username: '',
        email: '',
        phoneNumber: ''
      },
      createUserDialogVisible: false,
      newUser: {
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        name: '',
        gender: '',
        userNumber: ''
      }
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          this.users = response.data.data;
        })
        .catch(() => {
          this.$message.error('获取用户列表失败');
        });
    },
    searchUsers() {
      axios.get('/api/users/search', {
        params: this.searchForm,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          this.users = response.data.data;
        })
        .catch(() => {
          this.$message.error('按条件查询用户失败');
        });
    },
    resetForm() {
      this.searchForm = {
        username: '',
        email: '',
        phoneNumber: ''
      };
      this.fetchUsers();
    },
    showCreateUserDialog() {
      this.createUserDialogVisible = true;
    },
    createUser() {
      const hashedPassword = sha256(this.newUser.password);
      const userToCreate = { ...this.newUser, password: hashedPassword };

      axios.post('/api/users/register', userToCreate, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          this.$message.success('用户创建成功');
          this.createUserDialogVisible = false;
          this.fetchUsers();
        })
        .catch(() => {
          this.$message.error('用户创建失败');
        });
    },
    editUser(user) {
      console.log(user);  // 确保 user 被定义和使用
      // 编辑用户逻辑
    },
    deleteUser(user) {
      console.log(user);  // 确保 user 被定义和使用
      axios.delete(`/api/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          this.fetchUsers();
          this.$message.success('用户删除成功');
        })
        .catch(() => {
          this.$message.error('用户删除失败');
        });
    }
  }
};
</script>
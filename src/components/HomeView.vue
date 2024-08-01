<template>
  <div>
    <h1>User Management</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="editUser(user)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <h2>{{ isEditing ? 'Edit User' : 'Create User' }}</h2>
      <form @submit.prevent="saveUser">
        <input v-model="form.username" placeholder="Username">
        <input v-model="form.password" type="password" placeholder="Password">
        <input v-model="form.role" placeholder="Role">
        <button type="submit">{{ isEditing ? 'Update' : 'Create' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      form: {
        id: null,
        username: '',
        password: '',
        role: ''
      },
      isEditing: false
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.$axios.get('/api/users');
        this.users = response.data.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async saveUser() {
      try {
        if (this.isEditing) {
          await this.$axios.put(`/api/users/${this.form.id}`, this.form);
        } else {
          await this.$axios.post('/api/users', this.form);
        }
        this.resetForm();
        this.fetchUsers();
      } catch (error) {
        console.error('Error saving user:', error);
      }
    },
    async deleteUser(id) {
      try {
        await this.$axios.delete(`/api/users/${id}`);
        this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    editUser(user) {
      this.form = { ...user };
      this.isEditing = true;
    },
    resetForm() {
      this.form = { id: null, username: '', password: '', role: '' };
      this.isEditing = false;
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>
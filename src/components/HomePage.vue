<template>
  <el-container>
    <el-aside :width="drawer ? '200px' : '64px'">
      <el-button @click="toggleDrawer" style="margin: 10px;">
        <i :class="drawer ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
      </el-button>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        mode="vertical"
        :collapse="!drawer"
      >
        <el-menu-item index="1" @click="navigateTo('users')">
          <template v-slot:title>用户管理</template>
          <i class="el-icon-user"></i>
        </el-menu-item>
        <el-menu-item index="2" @click="navigateTo('roles')">
          <template v-slot:title>角色管理</template>
          <i class="el-icon-s-tools"></i>
        </el-menu-item>
        <el-menu-item index="3" @click="navigateTo('permissions')">
          <template v-slot:title>权限管理</template>
          <i class="el-icon-lock"></i>
        </el-menu-item>
        <el-menu-item index="4" @click="navigateTo('menus')">
          <template v-slot:title>菜单管理</template>
          <i class="el-icon-menu"></i>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="logo">run-one</div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      activeIndex: '1',
      drawer: true
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    navigateTo(route) {
      this.$router.push(`/home/${route}`);
    }
  }
};
</script>

<style scoped>
.logo {
  font-size: 20px;
  color: white;
  text-align: center;
  padding: 10px;
}
.el-header {
  background-color: #409eff;
}
.el-menu-vertical-demo {
  line-height: 60px;
}
.el-aside {
  background-color: #333;
  color: #fff;
  transition: width 0.2s;
}
.el-menu-item {
  color: #fff;
}
.el-menu-item:hover {
  background-color: #409eff;
}
</style>
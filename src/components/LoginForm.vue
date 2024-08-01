<template>
  <div class="login-container">
    <div class="login-form">
      <h2>登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-row>
            <el-col :span="16">
              <el-input v-model="loginForm.captcha" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="captchaImage" @click="getCaptcha" alt="captcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import sha256 from 'js-sha256';

export default {
  name: 'LoginForm',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: '',
      },
      captchaImage: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    async getCaptcha() {
      if (!this.loginForm.username) {
        this.$message.error('请先输入用户名');
        return;
      }

      try {
        const response = await axios.get('/api/captcha', {
          params: { username: this.loginForm.username },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        console.log('Captcha response:', response.data); // 打印返回信息
        if (response.data.code === 200) {
          this.captchaImage = `data:image/png;base64,${response.data.data}`;
        } else {
          this.$message.error('获取验证码失败');
        }
      } catch (error) {
        console.error('Error getting captcha:', error); // 打印错误信息
        this.$message.error('获取验证码失败');
      }
    },
    async onSubmit() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            // 对密码进行哈希处理
            const hashedPassword = sha256(this.loginForm.password);

            const loginData = {
              username: this.loginForm.username,
              password: hashedPassword,
              captcha: this.loginForm.captcha,
            };

            const response = await axios.post('/api/login', loginData, {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            });
            console.log('Login response:', response.data); // 打印返回信息
            if (response.data.code === 200) {
              this.$message.success('登录成功');
              localStorage.setItem('token', response.data.data.token);
              this.$router.push({ path: '/home' });
            } else {
              this.$message.error(response.data.msg);
              this.getCaptcha();
            }
          } catch (error) {
            console.error('Error during login:', error); // 打印错误信息
            this.$message.error('登录失败，请重试');
            this.getCaptcha();
          }
        } else {
          this.$message.error('请填写完整的登录信息');
        }
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  background-image: url('@/assets/bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.el-button--primary {
  width: 100%;
}

.login-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

img {
  cursor: pointer;
  width: 100%;
  height: auto;
}
</style>
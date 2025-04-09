// vite.config.js
export default {
    server: {
      host: '127.0.0.1', // 强制使用 IPv4，避免 "::1" 错误
      port: 5174         // 可改成其他端口，比如 3000
    }
  };
  
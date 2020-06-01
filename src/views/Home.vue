<!--
 * @Descripttion: 
 * @version: 
 * @Author: Chen
 * @Date: 2019-09-18 10:59:29
 * @LastEditors  : Chen
 * @LastEditTime : 2020-01-16 16:51:07
 -->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
      name: "home",
  components: {
    HelloWorld,
  },  
        methods: {
    
  },
};
</script>
<style lang="scss" scoped>
.home {
}
</style>
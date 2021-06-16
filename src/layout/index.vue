<template>
    <div class="wrap">
        <Nav></Nav>
        <v-main>
          <keep-alive v-if="$route.meta.keepAlive">
            <router-view />
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" />
        </v-main>
        <Footer></Footer>
        <vMsg></vMsg>
    </div>
</template>
<script>
import  Footer from "./footer"
import  Nav from "./header"
import  vMsg from "@/components/vMsg"
export default {
    name: "layout",
    components: { Footer,  Nav, vMsg}
}
</script>
<style lang="less" scoped>
.wrap {
  height: 100%;
  width: 100%;
}
</style>

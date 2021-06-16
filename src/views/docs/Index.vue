<template>
  <div class="docs w1200 mx-auto d-flex flex-wrap">
    <v-card class="cards" hover>
      <v-card-title class="card-title pa-0 mb-3 justify-center">关于TAF Chain</v-card-title>
      <v-card-text class="card-content pa-0">TAF Chain，全名是 “Tachyon field Chain”，所发行的加密权益证明称为“TAF”，是历经三年集合全球顶级开发团队，通过完全自主研发打造的高效底层系统，是首条真正意义可以服务全球大规模商用的公有链。团队成员在区块链，信息管理和大数据领域具有独特的见解与经历，他们利用多年的开发经验和工程经验，进行技术革新…</v-card-text>
      <v-card-actions class="d-flex pa-0 flex-column align-start">
        <a class="btn">TAF Chain入门简介</a>
        <a class="btn">成为节点</a>
        <a class="btn">参与投票</a>
      </v-card-actions>
    </v-card>
    <v-card class="cards mx15" hover>
      <v-card-title class="card-title pa-0 mb-3 justify-center">关于TAF Chain</v-card-title>
      <v-card-text class="card-content pa-0">TAF Chain，全名是 “Tachyon field Chain”，所发行的加密权益证明称为“TAF”，是历经三年集合全球顶级开发团队，通过完全自主研发打造的高效底层系统，是首条真正意义可以服务全球大规模商用的公有链。团队成员在区块链，信息管理和大数据领域具有独特的见解与经历，他们利用多年的开发经验和工程经验，进行技术革新…</v-card-text>
      <v-card-actions class="d-flex pa-0 flex-column align-start">
        <a class="btn">TAF Chain入门简介</a>
        <a class="btn">成为节点</a>
        <a class="btn">参与投票</a>
      </v-card-actions>
    </v-card>
    <v-card class="cards" hover>
      <v-card-title class="card-title pa-0 mb-3 justify-center">关于TAF Chain</v-card-title>
      <v-card-text class="card-content pa-0">TAF Chain，全名是 “Tachyon field Chain”，所发行的加密权益证明称为“TAF”，是历经三年集合全球顶级开发团队，通过完全自主研发打造的高效底层系统，是首条真正意义可以服务全球大规模商用的公有链。团队成员在区块链，信息管理和大数据领域具有独特的见解与经历，他们利用多年的开发经验和工程经验，进行技术革新…</v-card-text>
      <v-card-actions class="d-flex pa-0 flex-column align-start">
        <a class="btn">TAF Chain入门简介</a>
        <a class="btn">成为节点</a>
        <a class="btn">参与投票</a>
      </v-card-actions>
    </v-card>
    <v-card class="cards" hover>
      <v-card-title class="card-title pa-0 mb-3 justify-center">关于TAF Chain</v-card-title>
      <v-card-text class="card-content pa-0">TAF Chain，全名是 “Tachyon field Chain”，所发行的加密权益证明称为“TAF”，是历经三年集合全球顶级开发团队，通过完全自主研发打造的高效底层系统，是首条真正意义可以服务全球大规模商用的公有链。团队成员在区块链，信息管理和大数据领域具有独特的见解与经历，他们利用多年的开发经验和工程经验，进行技术革新…</v-card-text>
      <v-card-actions class="d-flex pa-0 flex-column align-start">
        <a class="btn">TAF Chain入门简介</a>
        <a class="btn">成为节点</a>
        <a class="btn">参与投票</a>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "docs",
  data: ()=> ({

  })
}
</script>

<style scoped lang="less">
.docs {
  padding: 70px 0 130px 0;
}
.cards {
  width: 390px;
  height: 308px;
  background: #FFFFFF;
  box-shadow: 2px 2px 8px 0px rgba(45, 69, 133, 0.17);
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 30px;
  &.mx15 {
    margin: 0 15px;
  }
  .card-title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #030D2E;
    line-height: 22px;
  }
  .card-content {
    height: 144px;
    width: 100%;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #646B83;
    line-height: 24px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  }
  .btn {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #E6B433;
    position: relative;
    &:after {
      position: absolute;
      right: -30px;
      top: -4px;
      content: '';
      width: 30px;
      height: 30px;
      background: url("../../assets/icon_xw_more@2x.png") center center no-repeat;
    }
  }
}
</style>

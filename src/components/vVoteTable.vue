<template>
  <v-card flat v-bind="$attrs">
    <v-card-title class="d-flex justify-center">
      <img src="@/assets/icon_toupiao@2x.png" alt="icon" class="table-icon">
      <slot name="title">{{ $t("text4") }}</slot>
    </v-card-title>
    <v-data-table
      :disable-sort="true"
      :no-data-text="$t('text65')"
      hide-default-footer
      :headers="headers"
      :items="data"
      :loading="loading"
      loading-text="Loading..."
      class="vote-table"
    >

      <template v-slot:item.miners="{ item }">
          <span class="default-yellow" @click="toAccount(item.miners)">
            {{ item.miners }}
          </span>
      </template>
      <template v-slot:item.toVote="{ item }">
            <v-btn
              color="#646B83"
              plain
              :disabled="disabled && currentIdx == item.index"
              @click="onVote(item.index)"
            >
              {{ $t('text71') }}
            </v-btn>
      </template>
<!--      <template v-slot:item="{index}">-->
<!--        <tr>-->
<!--          <td>{{ index + 1 }}</td>-->
<!--          <td>-->
<!--            <span class="default-yellow" @click="toAccount(data[index].miners)">{{ data[index].miners }}</span></td>-->
<!--          <td>{{ data[index].share }}</td>-->
<!--          <td>{{ data[index].bonus }}</td>-->
<!--          <td>-->
<!--            <v-btn-->
<!--              color="#646B83"-->
<!--              plain-->
<!--              :disabled="disabled && currentIdx == index"-->
<!--              @click="onVote(index)"-->
<!--            >-->
<!--              {{ $t('text71') }}-->
<!--            </v-btn>-->
<!--          </td>-->
<!--        </tr>-->
<!--      </template>-->
    </v-data-table>
  </v-card>
</template>

<script>
import { GetVote } from "@/api/request"
export default {
  name: "vVoteTable",
  data: () => ({
    loading: false,
    disabled: false,
    data: [],
    currentIdx: -1,
    timer1: undefined,
    timer2: undefined
  }),
  computed: {
    headers() {
      return [
        {
          text: this.$t("text66"),
          align: "center",
          value: "index",
        },
        {
          text: this.$t("text67"),
          align: "center",
          value: "miners"
        },
        // {
        //   text: this.$t("text68"),
        //   align: "center",
        //   value: "share"
        // },
        // {
        //   text: this.$t("text69"),
        //   align: "center",
        //   value: "bonus"
        // },
        // {
        //   text: this.$t("text70"),
        //   align: "center",
        //   value: "toVote"
        // },
      ];
    },
  },
  created() {
    // console.log(this.$attrs);
  },
  watch: {
    '$attrs.currentPage': {
      handler(cur) {
        cur = cur || 1
        this.getData(cur);
      },
      immediate: true
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // this.getData();
    },
    getData(page_index) {
      this.loading = true;
      let data = {
        page_index,
        page_size: this.$attrs.limit
      }
      console.log( data )
      GetVote(data).then(res=> {
        this.$emit('update:pageTotal', res.data.page_num)
        this.data = res.data.data || []
        // let sorted = this.data.reverse()
        // sorted.map( (el, index)=> {
        //   return el.index = index + 1
        // } )
        // this.data = sorted
      }).finally(()=> {
        this.timer1 = setTimeout(()=> {
          this.loading = false
        }, 500)
      })
    },
    onVote(index) {
      this.currentIdx = index
      this.disabled = true
      this.timer2 = setTimeout(()=> {
        console.log('this is onVote', this.data[index])
        this.disabled = false
      }, 1000)
    },
    toAccount(user) {
      this.$store.dispatch("TO_ACCOUNT", user)
    }
  },
  beforeDestroy(){
    clearTimeout(this.timer1)
    clearTimeout(this.timer2)
  }
};
</script>

<style scoped lang="less">
.vote-table {
  tbody tr {
    text-align: center;
  }
}

</style>

import router from "@/router"
export default {
    TO_BLOCK_DETAIL({commit}, value) {
        commit('SAVE_BLOCK_NUM', value)
        router.push({
            name: "blockDetail",
        });
    },
    TO_ACCOUNT({commit}, value) {
        commit('SAVE_ACCOUNT', value)
        router.push({
            name: "accountDetail",
        })
    },
    TO_CONTRACT_DETAIL({commit}, value) {
        commit('SAVE_CONTRACT_NAME', value)
        router.push({
            name: "contractDetail",
        })
    },
    TO_TRADE_DETAIL({commit}, value) {
        commit('SAVE_TRADE_ID', value)
        router.push({
            name: "transactionDetail",
        })
    }
}

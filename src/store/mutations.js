export default {
    TOGGLE_SNACKBAR(state,{ msg='', bool = true }) {
        state.snackbar.isShow = bool
        state.snackbar.msg = msg
    },
    SAVE_BLOCK_NUM(state, data) {
        state.block_num = data
    },
    SAVE_ACCOUNT(state, data) {
        state.account = data
    },
    SAVE_CONTRACT_NAME(state, data) {
        state.contract_name = data
    },
    SAVE_TRADE_ID(state, data) {
        state.trade_id = data
    },
}

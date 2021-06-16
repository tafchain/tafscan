import {get , post} from "./service"

const baseUrl = 'api/v1/'
export function name1(params) {
    return get('', params)
}
export function GetInfo(params ) {
    return post(baseUrl + 'homepage/count', params)
}
export function GetAccount(params = {}) {
    return post(baseUrl + '/account/info', params)
}

export function GetBlock(params) {
    return post(baseUrl + 'block/list', params)
}
export function GetSingleBlock(params) {
    return post(baseUrl + 'block/info', params)
}

export function GetContract(params) {
    return post(baseUrl + 'contract/list', params)
}
export function GetSingleContract(params) {
    return post(baseUrl + 'contract/info', params)
}
export function GetTrade(params) {
    return post(baseUrl + 'transaction/list', params)
}

export function GetSingleTrade(params) {
    return post(baseUrl + 'transaction/info', params)
}

export function GetVote(params) {
    return post(baseUrl + 'vote/list', params)
}
export function GetVoteCount(params) {
    return post(baseUrl + 'vote/count', params)
}
export function GetAccountList(params) {
    return post(baseUrl + 'account/list', params)
}

export function Search(params) {
    return post(baseUrl + 'homepage/search', params)
}

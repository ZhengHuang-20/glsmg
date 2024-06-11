import {requestBak, METHOD} from '@/utils/request'
import {BASE_URL} from "@/services/api";

//get
export function getAction(url, parameter) {
    return requestBak(BASE_URL + url, METHOD.GET, parameter)
}

//deleteAction
export function deleteAction(url, parameter) {
    return requestBak(BASE_URL + url, METHOD.DELETE, parameter)
}

export function postAction(url, parameter) {
    return requestBak(BASE_URL + url, METHOD.POST, parameter)
}

export function httpAction(url, parameter, method) {
    return requestBak(BASE_URL + url, method, parameter)
}

export default {
    getAction,
    deleteAction,
    postAction
}

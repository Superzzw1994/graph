import API from '../config'
import {fetchGet} from "@/utils/fetch";

export const getTags = (params) => fetchGet(API.GET_TAGS, {
  params, headers: {
    accountId: 1,
    userId: 1
  }
})

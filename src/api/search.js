import request from "@/utils/request"

export const searchHotList = params => {
  return request({
    url: "/search/hot",
    params
  })
}
export const cloudSearchList = params => { 
  return request({
    url:"/cloudsearch",
    params
  })
}
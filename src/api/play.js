import request from "@/utils/request";


//获取歌曲详情
export const getSongById = (id) => request({
  url:`/song/detail?ids=${id}`
})


//获取歌词
export const getLyricById = (id) => request({
  url : `/lyric?id=${id}`
})

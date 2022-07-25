import request from "@/utils/request";

export const recommendSongList = (params) => {
  return request({
    url: "/personalized",
    params, //params:params,
  });
};

export const newSong = (params) => { 
  return request({
    url: "/personalized/newsong",
    params,
  })
}
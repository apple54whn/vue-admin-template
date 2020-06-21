import request from '@/utils/request'

const baseUrl = 'http://127.0.0.1:7300/mock/5eeec1baa6143f5e12c9bbad/demo'

export function getList(params) {
  return request({
    url: baseUrl + '/recycle-manage/storage',
    method: 'post',
    params
  })
}

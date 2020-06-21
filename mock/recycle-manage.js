const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
    id: '@id',
    action: 'action',
    content: '@csentence(20, 5)',
    status: '@integer(1,5)',
    other1: '@csentence(10,15)',
    other2: '@csentence(10,15)',
    createTime: '@datetime',
  }]
})


module.exports = [
  {
    url: '/recycle-manage/storage',
    type: 'post',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]

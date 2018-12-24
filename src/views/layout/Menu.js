const menuObj = {
  menus: [
    {
      menuName: 'prismx',
      path: '/prismx/index'
    },
    {
      menuName: '数据集',
      sub: [
        {
          menuName: '数据集列表',
          path: '/dataset/components/list'
        },
        {
          menuName: '新建数据集',
          path: '/dataset/components/create'
        }
      ]
    },
    {
      menuName: '测试目录',
      sub: [
        {
          menuName: '测试数据集列表',
          path: '/test/testDataset'
        },
        {
          menuName: '测试form',
          path: '/test/testForm'
        },
        {
          menuName: '测试tree',
          path: '/test/testTree'
        },
        {
          menuName: '测试select',
          path: '/test/testSelect'
        },
        {
          menuName: '测试分档',
          path: '/test/bracket'
        }
      ]
    }
  ]
}
export default menuObj

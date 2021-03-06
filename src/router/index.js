import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: '/prismx/',
  routes: [
    { path: '/prismx/prismx', component: () => import('@/views/prismx/prismx'), name: 'prismx' },
    { path: '/dataset/components/list', component: () => import('@/views/dataset/components/list'), name: 'datasetList' },
    { path: '/dataset/components/create', component: () => import('@/views/dataset/components/create'), name: 'datasetCreate' },
    { path: '/test/testDataset', component: () => import('@/views/test/testDataset'), name: 'testDataset' },
    { path: '/test/testForm', component: () => import('@/views/test/testForm'), name: 'testForm' },
    { path: '/test/testTree', component: () => import('@/views/test/testTree'), name: 'testTree' },
    { path: '/test/testSelect', component: () => import('@/views/test/testSelect'), name: 'testSelect' },
    { path: '/test/table', component: () => import('@/views/test/table'), name: 'table' },
    { path: '/test/bracket', component: () => import('@/views/test/bracket'), name: 'bracket' },
    { path: '/test/luckywheel', component: () => import('@/views/test/luckywheel'), name: 'luckywheel' },
    { path: '/test/ninesquare', component: () => import('@/views/test/ninesquare'), name: 'ninesquare' },
    { path: '/test/test', component: () => import('@/views/test/test'), name: 'test' }
  ]
})

// module.exports = file => () => import('@/view/' + file + '.vue')  // 开发
module.exports = file => require('@/view/' + file + '.vue').default // 打包时

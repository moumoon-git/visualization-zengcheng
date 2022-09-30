import Vue from 'vue'
import Router from 'vue-router'
import _import from './import'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router);
/**
 * 重写路由的push方法
 */
export default new Router({
  mode:'hash',
  routes: [
    {path: '/duty', name: 'duty', component: _import('duty/duty')},
    {path: '/command', name: 'command', component: _import('command/command')},
    {path: '/warnings', name: 'warnings', component: _import('warning/warnings')},
    {path: '/NewGeneral', name: 'NewGeneral', component: _import('New_General/NewGeneral')},
    {path: '/test', name: 'test', component: _import('test/test')},
    {path: '/Outbreak', name: 'Outbreak', component: _import('Outbreak/Outbreak')},
    {path: '/Outbreaks', name: 'Outbreaks', component: _import('Outbreak/Outbreaks')},
    {path: '/barGraph', name: 'barGraph', component: _import('barGraph/barGraph')},
    {path: '/visual', name: 'visual', component: _import('visual/visual')},
    {path: '/BasicDataVisual', name: 'BasicDataVisual', component: _import('BasicDataVisual/BasicDataVisual')},
    /**
     * @author tanjinfeng
     * @date 2020-09-11
     * @desc 新增垃圾分类页面
     */
    {path: '/GarbageClassification', name: 'GarbageClassification', component: _import('GarbageClassification/GarbageClassification')},
    /**
     * @author tanjinfeng
     * @date 2020-10-29
     * @desc 新增矛盾纠纷页面
     */
    {path: '/Disputes', name: 'Disputes', component: _import('Disputes/Disputes')},
  ]
})


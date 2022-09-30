import Bus from '@/utils/bus.js'
const phoneFun = {
  machineFlag () {
        // 已摘机
    let obj = {
      data: ['allTypeFlag', 'machineFlag'],
      val: true
    }
    Bus.$emit('callPhoneStatex', obj)
  },
  notpPickFlag () {
        // 未摘机
    let obj = {
      data: ['allTypeFlag', 'notpPickFlag'],
      val: true
    }
    Bus.$emit('callPhoneStatex', obj)
  },
  expirationOutFlag () {
        // 呼入
    let obj = {
      data: ['allTypeFlag', 'expiration_OutFlag'],
      val: true
    }
    Bus.$emit('callPhoneStatex', obj)
  },
  leisure () {
    let obj = {
      data: [],
      val: false,
      type: 'all'
    }
    Bus.$emit('callPhoneStatex', obj)
  }
}
export default phoneFun

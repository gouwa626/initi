// 大乐透拆票逻辑
class DLTSplitter {
  // 构造函数
  constructor(lotteryType) {
    this.lotteryType = lotteryType
    this.red = 5
    this.blue = 2
  }

  action(payslips, times) {
    // 预设返回结果
    let status = new DigitalStatus(STATUS_OK, 0, '')

    // 是否有胆拖
    let dt = payslips.indexOf('$') > -1

    let array = _.chain(payslips.split('|')).map((payslip) => {
      if (payslip.indexOf('$') > -1) {
        // 如果有胆拖, 计算胆码和拖码
        let tmpArr = payslip.split('$')
        return {
          'dNum': tmpArr[0].split(',').length,
          'tNum': tmpArr[1].split(',').length
        }
      } else {
        return {
          'dNum': 0,
          'tNum': payslip.split(',').length
        }
      }
    }).value()

    // 得到红球个数
    let reds = array[0]
    // 得到篮球个数
    let blues = array[1]
    // 计算注数
    let bets = combination(reds.tNum, this.red - reds.dNum) * combination(blues.tNum, this.blue - blues.dNum)

    status.bets = bets
    status.price = bets * times * 2
    status.gameTypeId = dt > -1 ? WF_DLT_DT : (bets > 1 ? WF_DLT_DS : WF_DLT_FS)

    return status
  }
}

// 竞彩拆票逻辑
class ContestSplitter {
  // 构造函数
  constructor(lotteryType) {
    this.lotteryType = lotteryType
  }

  action(gameTypeId, payslips, singles, passTypes, times) {
    // 预设返回结果
    let status = new ContestStatus(STATUS_OK, 0, 0, 0, 0)

    // 是否有单关
    let supportSingle = passTypes.indexOf('1*1') > -1

    // 默认单关的参数
    let contests1 = {
      minPrize: 0,
      maxPrize: 0,
      bets: 0
    }

    // 默认单关的参数
    let contests2 = {
      minPrize: 0,
      maxPrize: 0,
      bets: 0
    }

    if (supportSingle) {
      _.chain(singles).map((payslip) => {
        return this.calculateSingle(payslip, times)
      }).reduce((s, n) => {
        // 最小奖金获取
        if (s.minPrize === 0 || s.minPrize > n.minPrize) {
          s.minPrize = n.minPrize
        }
        // 最大奖金获取
        s.maxPrize = s.maxPrize + n.maxPrize
        // 总注数
        s.bets = s.bets + n.bets
        return s
      }, contests1).value()

    }

    // 计算串关(去掉单关)
    _.chain(passTypes.split(',')).remove((passType) => {
      return passType !== '1*1'
    }).map((passType) => {
      // 过关方式字符串转数字
      return parseInt(passType.split('*')[0])
    }).map((num) => {
      // 对每种过关方式进行全组合
      return this.getCombination(payslips, num)
    }).map((payslip) => {
      // 计算每种组合的金额
      return this.calculate(payslip, times)
    }).reduce((s, n) => {
      // 最小奖金获取
      if (s.minPrize === 0 || s.minPrize > n.minPrize) {
        s.minPrize = n.minPrize
      }
      // 最大奖金获取
      s.maxPrize = s.maxPrize + n.maxPrize
      // 总注数
      s.bets = s.bets + n.bets
      return s
    }, contests2).value()

    let minPrize = contests1.minPrize + contests2.minPrize
    let maxPrize = contests1.maxPrize + contests2.maxPrize
    status.minPrize = Math.round(minPrize * 100) / 100
    status.maxPrize = Math.round(maxPrize * 100) / 100
    status.bets = contests1.bets + contests2.bets
    status.price = status.bets * 2 * times

    return status
  }

  /**
   * 计算单关 TODO: 单关计算目前不是100%准确
   * @param payslip
   * @param times
   * @returns {{minPrize: number, 最低奖金, maxPrize: number, 最高奖金, bets, 注数}}
   */
  calculateSingle(payslip, times) {
    // 对阵票串
    let contests = payslip.split(',')
    // 赔率匹配正则
    let regExp = /(\(.*?\))/g

    // 得到每个场次的投注选项个数, 得到类似 [1, 1, 2, 3] 这样的数组
    let options = _.chain(contests).map((contest) => {
      // 过滤掉赔率得到,并且去掉场次号,得到各个选项 83/81 这样的数组
      return contest.replace(regExp, '').split('=')[1]
    }).flatMap((option) => {
      // 进行flapMap转换,得到每个场次号每个选项的总长度
      return option.split('/').length
    }).value()

    // 得到每个场次的所有赔率的二维数组, 得到类似 [[2.3, 3.3], [3.3], [1.2] 这样的数组
    let odds = _.chain(contests).map((contest) => {
      // 过滤掉赔率得到,并且去掉场次号,得到各个选项 83(2,3)/81(2.1) 这样的数组
      return contest.split('=')[1].match(regExp)
    }).map((array) => {
      return array.map((item) => {
        return parseFloat(item.replace('(', '').replace(')', ''))
      })
    }).value()

    // 得到每个场次的最小赔率, 得到类似 [2.3, 2.3, 1.3, 1.2] 这样的数组
    let minOdds = _.chain(odds).map((oddArray) => {
      return _.min(oddArray)
    }).value()

    // 得到每个场次的最大赔率, 得到类似 [2.3, 3.3, 3.3, 1.2] 这样的数组
    let maxOdds = _.chain(odds).map((oddArray) => {
      return _.max(oddArray)
    }).value()

    return this.calculateSinglePrize(minOdds, maxOdds, options, times)
  }
  /**
   * 计算串关方法
   * @param array
   * @param times
   * @returns {{minPrize: number, maxPrize: number, bets: number}}
   */
  calculate(array, times) {
    // 默认串关的参数
    let status = {
      minPrize: 0,
      maxPrize: 0,
      bets: 0
    }

    this.filterPayslip(array)

    _.chain(array).map((item) => {
      return item.map((payslip) => {
        return payslip.split(',')
      })
    }).map((item) => {
      // 继续排列
      return this.getArrayCombination(item)
    }).flatMap((payslip) => {
      // 降维
      return payslip
    }).flatMap((payslip) => {
      // 降维为一维数组在计算
      return this.parsePayslip(payslip, times)
    }).reduce((s, n) => {
      // 最小奖金获取
      if (s.minPrize === 0 || s.minPrize > n.minPrize) {
        s.minPrize = n.minPrize
      }
      // 最大奖金获取
      s.maxPrize = s.maxPrize + n.maxPrize
      // 总注数
      s.bets = s.bets + n.bets
      return s
    }, status).value()

    return status
  }

  /**
   * 解析串关票串
   * @param payslip
   * @param times
   * @returns {{minPrize: Number, 最低奖金, maxPrize: Number, 最高奖金, bets: number, 注数}}
   */
  parsePayslip(payslip, times) {
    // 对阵票串
    let contests = payslip.split(',')
    // 赔率匹配正则
    let regExp = /(\(.*?\))/g

    // 得到每个场次的投注选项个数, 得到类似 [1, 1, 2, 3] 这样的数组
    let options = _.chain(contests).map((contest) => {
      // 过滤掉赔率得到,并且去掉场次号,得到各个选项 83/81 这样的数组
      return contest.replace(regExp, '').split('=')[1]
    }).flatMap((option) => {
      // 进行flapMap转换,得到每个场次号每个选项的总长度
      return option.split('/').length
    }).value()

    // 得到每个场次的所有赔率的二维数组, 得到类似 [[2.3, 3.3], [3.3], [1.2] 这样的数组
    let odds = _.chain(contests).map((contest) => {
      // 过滤掉赔率得到,并且去掉场次号,得到各个选项 83(2,3)/81(2.1) 这样的数组
      return contest.split('=')[1].match(regExp)
    }).map((array) => {
      return array.map((item) => {
        return parseFloat(item.replace('(', '').replace(')', ''))
      })
    }).value()

    // 得到每个场次的最小赔率, 得到类似 [2.3, 2.3, 1.3, 1.2] 这样的数组
    let minOdds = _.chain(odds).map((oddArray) => {
      return _.min(oddArray)
    }).value()

    // 得到每个场次的最大赔率, 得到类似 [2.3, 3.3, 3.3, 1.2] 这样的数组
    let maxOdds = _.chain(odds).map((oddArray) => {
      return _.max(oddArray)
    }).value()

    return this.calculateMultiplePrize([contests.length], minOdds, maxOdds, options, [], [], times)
  }

  /**
   * 单关计算 -- 单关不需要支持胆拖
   * @param oddMinAry 每个场次最小赔率数组 [1, 2]
   * @param oddMaxAry 每个场次最大赔率数组 [3.32, 4.43]
   * @param multiCountAry 每个场次号的选项个数 [1, 2, 2]
   * @param times 倍数
   * @returns {{minPrize: number 最低奖金, maxPrize: number 最高奖金, bets 注数}}
   */
  calculateSinglePrize(oddMinAry, oddMaxAry, multiCountAry, times) {
    // 计算单关奖金方法
    function doCalculation(arr) {
      return _.chain(arr).map((odd) => {
        return odd * 2 * times
      }).sum().value()
    }

    let minPrize = doCalculation(oddMinAry)
    let maxPrize = doCalculation(oddMaxAry)
    let bets = _.chain(multiCountAry).sum().value()

    return {
      minPrize: Math.round(minPrize * 100) / 100,
      maxPrize: Math.round(maxPrize * 100) / 100,
      bets: bets
    }
  }

  /**
   * 奖金计算 -- TODO: 暂不考虑胆拖
   * @param optionsAry 过关方式数组 [2, 3, 5] 单关不用该方法
   * @param oddMinAry 每个场次最小赔率数组 [1, 2]
   * @param oddMaxAry 每个场次最大赔率数组 [3.32, 4.43]
   * @param multiCountAry 每个场次号的选项个数 [1, 2, 2]
   * @param oddDanAry 胆拖数组
   * @param dCountAry 胆拖选项个数
   * @param times 倍数
   * @returns {{minPrize: Number 最低奖金, maxPrize: Number 最高奖金, bets: number 注数}}
   */
  calculateMultiplePrize(optionsAry, oddMinAry, oddMaxAry, multiCountAry, oddDanAry, dCountAry, times) {
    let minPrize = 0
    let maxPrize = 0
    let bets = 0

    for (let i = 0; i < optionsAry.length; i++) {
      // 判断胆拖
      let len = Number(optionsAry[i]) - oddDanAry.length
      if (len < 0) {
        // 不够串关方式 直接忽略
        continue
      }
      // 如果场次号里面有超过1个以上的选项
      if (multiCountAry != null) {
        let tmpAry = this.getCombination(multiCountAry, len)
        for (let m = 0; m < tmpAry.length; m++) {
          tmpAry[m] = tmpAry[m].join('*')
          if (tmpAry[m] === '') {
            tmpAry[m] = 1
          }
          // 如果有胆拖选项
          if (dCountAry.length > 0) {
            tmpAry[m] += '*' + dCountAry.join('*')
          }
        }
        bets += this.eval(tmpAry.join('+'))
      }

      // 计算最小奖金
      let resultMinAry = this.getCombination(oddMinAry, len)
      for (let j = 0; j < resultMinAry.length; j++) {
        let mergeAry = resultMinAry[j].concat(oddDanAry)
        let tmpPrize = this.eval(mergeAry.join('*'))
        minPrize += this.prizeMNLimit(tmpPrize, Number(optionsAry[i]), times)
      }

      // 计算最大奖金
      let resultMaxAry = this.getCombination(oddMaxAry, len)
      for (let j = 0; j < resultMaxAry.length; j++) {
        let mergeAry = resultMaxAry[j].concat(oddDanAry)
        let tmpPrize = this.eval(mergeAry.join('*'))
        maxPrize += this.prizeMNLimit(tmpPrize, Number(optionsAry[i]), times)
      }
    }
    return {
      minPrize: Math.round(minPrize * 100) / 100,
      maxPrize: Math.round(maxPrize * 100) / 100,
      bets: bets
    }
  }


  filterPayslip(array) {
    let rq = { "001": 1, "002": -1 }
    _.chain(array).map((item) => {
      let result = _.chain(item).map((payslip) => {
        return payslip.split(',')
      }).flatMap((payslip) => {
        return payslip
      }).map((payslip) => {
        let tmp = payslip.split('=')
        return { 'sequenceNo': tmp[0], 'gameType': tmp[1] }
      }).groupBy('sequenceNo').map((array, key) => {
        return key + '=' + _.chain(array).map((item) => {
          return item.gameType
        }).join(',').value()
      }).value()
      debugger
      return "1"
    }).map((item) => {
      debugger
      // 继续排列
      return this.getArrayCombination(item)
    }).value()
    return true
  }

  /**
   * 得到竞彩的映射关系
   * @param n 让球数
   * @returns {*[]}
   */
  getPosition(n) {
    let n = -1 * Number(n);
    let zsArr = n > 0 ? [1, 0, -1] : [1];
    let zfArr = n < 0 ? [1, 0, -1] : [-1];
    if (Math.abs(n) === 1) {
      zsArr = n > 0 ? [1, 0] : [1];
      zfArr = n < 0 ? [0, -1] : [-1];
    } else {
      zsArr = n > 0 ? [1, 0, -1] : [1];
      zfArr = n < 0 ? [1, 0, -1] : [-1];
    }
    // 每个玩法选项的下标的对应关系
    // 例如 n = 1 => [[0], [1 - 0 - n], [0], [0, 1], [1], [0]]
    // 胜平负的: 胜;
    // 让球胜负平的: 净胜球 不是让球胜平负的选项;
    // 算法 this > 0 ? 0 : (this < 0 ? 2 : 1)
    // 如果净胜球大于0, 则取让胜, 如果小于0, 取让负, 否则取让平
    // 比分: 1:0
    // 半全场的: 胜胜, 平胜。 注意睿择和澳客的映射不一样，需要修改一下
    // 总进球的: 1球;
    let spArr = [
      [[0], [1 - 0 - n], [0], [0, 1], [1], [0]],
      [[0], [2 - 0 - n], [1], [0, 1], [2], [0]],
      [[0], [2 - 1 - n], [2], [0, 1, 2], [3], [0]],
      [[0], [3 - 0 - n], [3], [0, 1], [3], [0]],
      [[0], [3 - 1 - n], [4], [0, 1, 2], [4], [0]],
      [[0], [3 - 2 - n], [5], [0, 1, 2], [5], [0]],
      [[0], [4 - 0 - n], [6], [0, 1], [4], [0]],
      [[0], [4 - 1 - n], [7], [0, 1, 2], [5], [0]],
      [[0], [4 - 2 - n], [8], [0, 1, 2], [6], [0]],
      [[0], [5 - 0 - n], [9], [0, 1], [5], [0]],
      [[0], [5 - 1 - n], [10], [0, 1, 2], [6], [0]],
      [[0], [5 - 2 - n], [11], [0, 1, 2], [7], [0]],
      [[0], zsArr, [12], [0, 1, 2], [6, 7], [0]],
      [[1], [0 - 0 - n], [13], [4], [0], [0]],
      [[1], [1 - 1 - n], [14], [3, 4, 5], [2], [0]],
      [[1], [2 - 2 - n], [15], [3, 4, 5], [4], [0]],
      [[1], [3 - 3 - n], [16], [3, 4, 5], [6], [0]],
      [[1], [-1 * n], [17], [3, 4, 5], [7], [0]],
      [[2], [0 - 1 - n], [18], [7, 8], [1], [1]],
      [[2], [0 - 2 - n], [19], [7, 8], [2], [1]],
      [[2], [1 - 2 - n], [20], [6, 7, 8], [3], [1]],
      [[2], [0 - 3 - n], [21], [7, 8], [3], [1]],
      [[2], [1 - 3 - n], [22], [6, 7, 8], [4], [1]],
      [[2], [2 - 3 - n], [23], [6, 7, 8], [5], [1]],
      [[2], [0 - 4 - n], [24], [7, 8], [4], [1]],
      [[2], [1 - 4 - n], [25], [6, 7, 8], [5], [1]],
      [[2], [2 - 4 - n], [26], [6, 7, 8], [6], [1]],
      [[2], [0 - 5 - n], [27], [7, 8], [5], [1]],
      [[2], [1 - 5 - n], [28], [6, 7, 8], [6], [1]],
      [[2], [2 - 5 - n], [29], [6, 7, 8], [7], [1]],
      [[2], zfArr, [30], [6, 7, 8], [6, 7], [1]]
    ]
    return spArr
  }

  /**
   * 四舍六入五成双
   * @param data 奖金
   * @param m 倍数
   * @returns {*}
   */
  roundPrize(data, m) {
    let dt = data.toFixed(8).toString()
    let pos = dt.length
    // 如果数据中在万以上，就不处理
    if (dt.indexOf('万') > 0) return data
    if (dt.indexOf('.') >= 0) {
      // 如果有小数点呢
      pos = dt.indexOf('.') + 3
    }

    let key = dt.charAt(pos)
    let vals = ''
    if (key < 5) {
      vals = dt.substr(0, pos)
    } else if (key > 5) {
      vals = parseFloat(dt.substr(0, pos)) + 0.01
    } else {
      if (dt.charAt(pos - 1) % 2) {
        vals = parseFloat(dt.substr(0, pos)) + 0.01
      } else {
        vals = parseFloat(dt.substr(0, pos))
      }
    }
    // vals已经是2位小数，使用toFixed(2)使之补零操作
    return (parseFloat(vals) * m).toFixed(2)
  }

  /**
   * 最高奖金限制
   * @param bonus 奖金
   * @param len 串关场次数量
   * @param times 倍数
   */
  prizeMNLimit(bonus, len, times) {
    bonus = this.roundPrize(bonus * 2, 1)
    // 奖金限制
    switch (len) {
      case 2:
      case 3:
        if (bonus > 200000) bonus = 200000
        break
      case 4:
      case 5:
        if (bonus > 500000) bonus = 500000
        break
      case 6:
      case 7:
      case 8:
        if (bonus > 1000000) bonus = 1000000
        break
    }
    return Number((bonus * times).toFixed(2))
  }

  /**
   * 得到组合方式
   * @param arr 要组合的数组
   * @param num 组合的场次个数
   * @returns {Array}
   */
  getCombination(arr, num) {
    let r = [];
    (
      function f(t, a, n) {
        if (n === 0) {
          return r.push(t)
        }
        for (let i = 0, l = a.length; i <= l - n; i++) {
          f(t.concat(a[i]), a.slice(i + 1), n - 1)
        }
      }
    )([], arr, num)
    return r
  }

  /**
   * 得到数组组合方式
   * @param array
   */
  getArrayCombination(array) {
    let results = []
    let result = [];
    (
      function f(arr, depth) {
        for (let i = 0; i < arr[depth].length; i++) {
          result[depth] = arr[depth][i]
          if (depth !== arr.length - 1) {
            f(arr, depth + 1)
          } else {
            results.push(result.join(','))
          }
        }
      }
    )(array, 0)
    return results
  }

  // 计算表达式的值, 替换默认eval而发出的警告
  eval(fn) {
    // 一个变量指向Function，防止有些前端编译工具报错
    let Fn = Function
    return new Fn('return ' + fn)()
  }
}

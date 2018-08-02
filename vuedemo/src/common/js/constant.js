// 彩种类别
const TC = 'TC'
const JC = 'JC'
const GP = 'GP'
const FC = 'FC'

/* 彩种列表 */
// 1.排列3
const TC_P3 = 'TC_P3'
// 2.排列5
const TC_P5 = 'TC_P5'
// 3.七星彩
const TC_QXC = 'TC_QXC'
// 4.大乐透
const TC_DLT = 'TC_DLT'
// 5.七乐彩
const FC_QLC = 'FC_QLC'
// 6.3D
const FC_3D = 'FC_3D'
// 7.双色球
const FC_SSQ = 'FC_SSQ'
// 8.竞彩足球
const TC_JCZQ = 'TC_JCZQ'
// 9.竞彩篮球
const TC_JCLQ = 'TC_JCLQ'
// 10.北京单场
const TC_BJDC = 'TC_BJDC'
// 11.四场进球
const TC_4JQ = 'TC_4JQ'
// 12.六场半全场
const TC_6BQC = 'TC_6BQC'
// 13.任选9
const TC_RX9 = 'TC_RX9'
// 14.胜负彩
const TC_SFC = 'TC_SFC'
// 15.山东11选5
const TC_SD11X5 = 'TC_SD11X5'
// 16.广东11选5
const TC_GD11X5 = 'TC_GD11X5'
// 17.山西11选5
const TC_SHX11X5 = 'TC_SHX11X5'
// 18.陕西11选5
const TC_SX11X5 = 'TC_SX11X5'
// 19.新疆11选5
const TC_XJ11X5 = 'TC_XJ11X5'
// 20.吉林快3
const FC_JLK3 = 'FC_JLK3'
// 21.江苏快3
const FC_JSK3 = 'FC_JSK3'
// 22.江西快三
const FC_JXK3 = 'FC_JXK3'
// 23.快乐扑克
const TC_SDKLPK = 'TC_SDKLPK'
// 24.湖南幸运赛车
const TC_HNXYSC = 'TC_HNXYSC'
// 25.重庆时时彩
const FC_CQSSC = 'FC_CQSSC'

/* 玩法配置 */
/* 数字彩票玩法 */
// 双色球单式
const WF_SSQ_DS = 'WF_SSQ_DS'
// 双色球复式
const WF_SSQ_FS = 'WF_SSQ_FS'
// 双色球胆拖
const WF_SSQ_DT = 'WF_SSQ_DT'
// 七乐彩单式
const WF_QLC_DS = 'WF_QLC_DS'
// 七乐彩复式
const WF_QLC_FS = 'WF_QLC_FS'
// 七乐彩胆拖
const WF_QLC_DT = 'WF_QLC_DT'
// 七星彩单式
const WF_QXC_DS = 'WF_QXC_DS'
// 七星彩复式
const WF_QXC_FS = 'WF_QXC_FS'
// 大乐透单式
const WF_DLT_DS = 'WF_DLT_DS'
// 大乐透复式
const WF_DLT_FS = 'WF_DLT_FS'
// 大乐透胆拖
const WF_DLT_DT = 'WF_DLT_DT'
// 大乐透追加单式
const WF_DLT_ZJ_DS = 'WF_DLT_ZJ_DS'
// 大乐透追加复式
const WF_DLT_ZJ_FS = 'WF_DLT_ZJ_FS'
// 大乐透追加胆拖
const WF_DLT_ZJ_DT = 'WF_DLT_ZJ_DT'
// 排列三直选单式
const WF_P3_ZX_DS = 'WF_P3_ZX_DS'
// 排列三直选复式
const WF_P3_ZX_FS = 'WF_P3_ZX_FS'
// 排列三直选和值
const WF_P3_ZX_HZ = 'WF_P3_ZX_HZ'
// 排列三组三单式
const WF_P3_ZU3_DS = 'WF_P3_ZU3_DS'
// 排列三组三复式
const WF_P3_ZU3_FS = 'WF_P3_ZU3_FS'
// 排列三组六单式
const WF_P3_ZU6_DS = 'WF_P3_ZU6_DS'
// 排列三组六复式
const WF_P3_ZU6_FS = 'WF_P3_ZU6_FS'
// 3D直选单式
const WF_3D_ZX_DS = 'WF_3D_ZX_DS'
// 3D直选复式
const WF_3D_ZX_FS = 'WF_3D_ZX_FS'
// 3D直选和值
const WF_3D_ZX_HZ = 'WF_3D_ZX_HZ'
// 3D组三单式
const WF_3D_ZU3_DS = 'WF_3D_ZU3_DS'
// 3D组三复式
const WF_3D_ZU3_FS = 'WF_3D_ZU3_FS'
// 3D组六单式
const WF_3D_ZU6_DS = 'WF_3D_ZU6_DS'
// 3D组六复式
const WF_3D_ZU6_FS = 'WF_3D_ZU6_FS'
// 排列五单式
const WF_P5_DS = 'WF_P5_DS'
// 排列五复式
const WF_P5_FS = 'WF_P5_FS'


/* 竞彩足球 */
// 比分
const WF_JCZQ_BF = 'JCZQ_BF'
// 半全场
const WF_JCZQ_BQC = 'JCZQ_BQC'
// 混合
const WF_JCZQ_HH = 'JCZQ_HH'
// 进球数
const WF_JCZQ_JQS = 'JCZQ_JQS'
// 让球胜平负
const WF_JCZQ_RQSPF = 'JCZQ_RQSPF'
// 胜平负
const WF_JCZQ_SPF = 'JCZQ_SPF'

/* 竞彩足球玩法数组 */
const WF_JCZQ_BF_LIST = ['10', '20', '21', '30', '31', '32', '40', '41', '42', '50', '51', '52', '90', '00', '11', '22', '33', '99', '01', '02', '12', '03', '13', '23', '04', '14', '24', '05', '15', '25', '09']
const WF_JCZQ_BQC_LIST = ['60', '61', '62', '63', '64', '65', '66', '67', '68']
const WF_JCZQ_JQS_LIST = ['70', '71', '72', '73', '74', '75', '76', '77']
const WF_JCZQ_RQSPF_LIST = ['88', '86', '85']
const WF_JCZQ_SPF_LIST = ['83', '81', '80']

/* 兼中兼得映射 */
const WF_MAPPING = {
  '83': 0,
  '81': 1,
  '10': 1,
  '20': 2,
  '30': 3,
  '31': 4,
  '32': 5,
  '40': 6,
  '41': 7,
  '42': 8,
  '50': 9,
  '51': 10,
  '52': 11,
  '90': 12,
  '00': 13,
  '11': 14,
  '22': 15,
  '33': 16,
  '99': 17,
  '01': 18,
  '02': 19,
  '12': 20,
  '03': 21,
  '13': 22,
  '23': 23,
  '04': 24,
  '14': 25,
  '24': 26,
  '05': 27,
  '15': 28,
  '25': 29,
  '09': 30,
  '70': 0,
  '71': 1,
  '72': 2,
  '73': 3,
  '74': 4,
  '75': 5,
  '76': 6,
  '77': 7,
  '60': 1,
  '61': 4,
  '62': 7,
  '63': 2,
  '64': 5,
  '65': 8,
  '66': 3,
  '67': 6,
  '68': 9

}

// 成功
const STATUS_OK = { 'code': 10000, 'message': '成功' }
// 票串格式有误
const STATUS_FORMAT_ERROR = { 'code': 10001, 'message': '票串格式有误,请仔细检查.' }

// 竞彩拆票状态
class ContestStatus {
  constructor(status, minPrize, maxPrize, bets, price) {
    this.code = status.code
    this.message = status.message
    this.minPrize = minPrize
    this.maxPrize = maxPrize
    this.bets = bets
    this.price = price
  }

  bind(status) {
    this.code = status.code
    this.message = status.message
  }
}

// 数字彩拆票状态
class DigitalStatus {
  constructor(status, bets, gameTypeId) {
    this.code = status.code
    this.bets = bets
    this.price = gameTypeId
  }

  bind(status) {
    this.code = status.code
    this.message = status.message
  }
}

// 自定义组合函数(就是数学排列组合里的C)
function combination(m, n) {
  return factorial(m, n) / factorial(n, n);// 就是Cmn(上面是n，下面是m) = Amn(上面是n，下面是m /Ann(上下都是n)
}

// 自定义排列函数(就是数学排列组合里的A)
function array(m, n) {
  return factorial(m, n);//就是数学里的Amn,上面是n，下面是m
}

// 自定义一个阶乘函数，就是有n个数相乘，从m开始，每个数减1，如factorial(5,4)就是5*(5-1)*(5-2)*(5-3),相乘的数有4个
function factorial(m, n) {
  let num = 1;
  let count = 0;
  for (let i = m; i > 0; i--) {
    if (count === n) {// 当循环次数等于指定的相乘个数时，即跳出for循环
      break;
    }
    num = num * i;
    count++;
  }
  return num;
}
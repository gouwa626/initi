//  定义工厂列表类，实现抽象工厂模式，以及策略模式结合使用
class LotteryFactory {
  constructor() {
    //  用于保存不同的策略名称，及对应的方案
    this.strateges = {};
    this.addClass(ContestSplitter, TC_JCZQ)
    this.addClass(SSQSplitter, FC_SSQ)
    this.addClass(DLTSplitter, TC_DLT)
  }

  addClass(factoryClass, lotteryType) {
    //  new 后要跟真正的类不能是类名的字符串,这里接收的参数是真正的类，使用它的name属性获取类名
    this.strateges[lotteryType] = function (lotteryType) {
      return new factoryClass(lotteryType)
    };
  }

  getFactory(lotteryType) {
    return this.strateges[lotteryType].call(null, lotteryType);
  }
}


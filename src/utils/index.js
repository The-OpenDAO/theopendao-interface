// slice
export function reSetData(dataList, num) {
  let arr = []
  let len = dataList.length
  for (let i = 0; i < len; i += num) {
    arr.push(dataList.slice(i, i + num))
  }
  return arr
}

// true is PC and false is Phone
export function IsPC() {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

/**
 *
 * @param {} val
 * @param {number} n
 * @returns
 */

export function formatMoney(money, n = 2) {
  let s = Number(
    parseFloat(money)
      .toFixed(n + 1)
      .slice(0, -1)
  )
  s += ''
  if (s.indexOf('.') == -1) s += '.0'
  if (/\.\d$/.test(s)) s += '0'
  while (/\d{4}(\.|,)/.test(s)) s = s.replace(/(\d)(\d{3}(\.|,))/, '$1,$2')
  return `${s}`
}

export function debounce(fun, delay) {
  return function (args) {
    let that = this
    let _args = args
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, _args)
    }, delay)
  }
}

export function jumpTo(e, domid = 'claim') {
  document.getElementById(domid).scrollIntoView({ behavior: 'smooth' })
}

export function SushiTo(e, domid = 'Sushi') {
  document.getElementById(domid).scrollIntoView({ behavior: 'smooth' })
}

export function jumpTop(e, domid = 'topBanner') {
  document.getElementById(domid).scrollIntoView({ behavior: 'smooth' })
}
export function compare(p) {
  return function (m, n) {
    var a = m[p]
    var b = n[p]
    return b - a //ASC
  }
}
export function AprToApy(apr) {
  // console.log(apr);
  const SECONDS_PER_YEAR = 365.2425 * 86400 /** SECONDS_PER_YEAR = 31,556,952 */
  const BLOCKS_IN_A_YEAR = SECONDS_PER_YEAR / 13.25
  return (((1 + apr / 100 / BLOCKS_IN_A_YEAR) ** BLOCKS_IN_A_YEAR - 1) * 100).toFixed(2)
}

export async function AddTokenToMetamask(token) {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: token.address, // The address that the token is at.
            symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: token.decimals, // The number of decimals in the token
            image: token.image, // A string url of the token logo
          },
        },
      })
      .then
      // errorRef.value.openError('Add Token Succeccful', "You already add SOS token successful", true)
      ()

    if (wasAdded) {
      // console.log('Thanks for your interest! ************');
    } else {
      // console.log('Your loss!');
    }
  } catch (error) {
    console.log(error)
  }
}

export function formatNumber(num) {
  return `${num}`.replace(/(\d)(?=(\d{3})+\b)/g, '$1,')
}

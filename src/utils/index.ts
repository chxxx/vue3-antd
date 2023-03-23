/**
 * 处理await成功失败信息
 * 参考：https://juejin.cn/post/6844903767129718791
 * @param {*} promise
 */

export function awaitWrap<T, U = any>(promise: Promise<T>): Promise<[U | null, T | null]> {
  return promise.then<[null, T]>((data: T) => [null, data]).catch<[U, null]>((err) => [err, null])
}

/*
 * 第一种方法：
 * @param paramName
 * 用来获取url中的某个参数
 */
export const getQueryParamByKey = (paramName: string) => {
  let url = document.location.toString()
  // 如果url中有特殊字符则需要进行一下解码
  url = decodeURI(url)
  const arrObj = url.split('?')
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&')
    let arr
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] == paramName) {
        return decodeURIComponent(arr[1])
      }
    }
    return ''
  } else {
    return ''
  }
}
/*
 * 用来获取url中的所有参数
 * let url = 'http://192.168.1.122:9020/?appId=wxf4b72971eacba4d6&loginScene=1#/'
 */
export const getQueryParams = <T>(url = document.location.toString()) => {
  // let url =
  // 如果url中有特殊字符则需要进行一下解码
  url = decodeURI(url)
  const arr1 = url.split('?')
  const obj = {} as T
  if (arr1.length > 1) {
    const index = arr1[1].indexOf('#')
    arr1[1] = index == -1 ? arr1[1] : arr1[1].slice(0, index)
    const arr2 = arr1[1].split('&')
    for (let i = 0; i < arr2.length; i++) {
      const curArr: string[] = arr2[i].split('=')
      obj[curArr[0]] = decodeURIComponent(curArr[1])
    }
  }
  return obj
}

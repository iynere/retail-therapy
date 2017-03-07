export const functionName = func => {
  let result = func.toString()
  result = result.substr('function '.length)
    result = result.substr(0, result.indexOf('('))
    return result
}
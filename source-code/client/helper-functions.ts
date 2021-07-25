
/* export function is<T1, T2>(
  firstObject: T1, 
  {equalTo, then}:{equalTo: T1, then: T2}
): T2 | '' {
  if(firstObject == equalTo){
    return then
  }
  return ''
} */

export const is = val => ({
  if: condition => condition ? val : ''
})

export const randomNumber = ({from,to}) => {
  return Math.round(Math.random()*(to-from))
}

export const numberLoop = (amount, func): any[] => {
  let returnVal = []
  for(let number = 1; number <= amount; number++){
    returnVal.push(func(number))
  }
  return returnVal
}



/* export function is<T1, T2>(
  firstObject: T1, 
  {equalTo, then}:{equalTo: T1, then: T2}
): T2 | '' {
  if(firstObject == equalTo){
    return then
  }
  return ''
} */

export const is = val => ({if: condition => condition ? val : ''})


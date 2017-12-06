const LEVELS = [
  { number: 10, string: 'basic' },
  { number: 20, string: 'intermediate' },
  { number: 30, string: 'advanced' }
]

// const translate = (level) => {
//   if ( typeof level === 'number' ) return LEVELS.find( ({ number }) => number === level ).string;
//   if ( typeof level === 'string') return LEVELS.find( ({ string }) => string === level ).number;
// }
// export default translate;

export const numToStr = (number) => {
 return LEVELS.find( level => number === level.number ).string;
}

export const strToNum = (string) => {
 return LEVELS.find( level => string === level.string ).number;
}

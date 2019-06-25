export const createOptionList = options => options.reduce((accumulator, option) => accumulator.concat({
  key: option.name,
  value: option.name,
  text: option.name,
}), []); // eslint-disable-line

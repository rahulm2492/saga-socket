export const createOptionList = options => options.reduce((accumulator, option) => accumulator.concat({
  key: option.name,
  value: option.name,
  text: option.name,
}), []); // eslint-disable-line


export const subscribeMsg = inst => ({
  event: 'bts:subscribe',
  data: {
    channel: `order_book_${inst}`
  }
});

export const unSubscribeMsg = inst => ({
  event: 'bts:unsubscribe',
  data: {
    channel: `order_book_${inst}`
  }
});

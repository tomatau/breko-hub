export type Message = {
  id: string,
  type: 'error' | 'good' | 'info',
  message: string,
};

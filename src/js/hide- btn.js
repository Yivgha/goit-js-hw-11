import { getRefs } from './getRef';
const { btnRef } = getRefs();

export function hideBtn() {
  return {
    isHide: btnRef.classList.add('is-hidden'),
    isVisible: btnRef.classList.remove('is-hidden'),
  };
}
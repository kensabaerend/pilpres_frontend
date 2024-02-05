import { atom } from 'recoil';

const decryptData = (encryptedData) => atob(encryptedData);

const userAtom = atom({
  key: 'userAtom',
  default: localStorage.getItem('user-pileg')
    ? JSON.parse(decryptData(localStorage.getItem('user-pileg')))
    : null,
});

export default userAtom;

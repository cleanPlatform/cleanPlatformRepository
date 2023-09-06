import { getCookie } from './functions.js';

//  cookie 에 사장이 아니면 경고문을 띄우고 메인으로 리디렉션한다.
document.addEventListener('DOMContentLoaded', function () {
  const isOwner = getCookie('permission');

  if (isOwner !== 'owner') {
    alert('권한이 부족합니다!\n메인 페이지로 이동합니다.');
    window.location.href = '/';
  }
});

import { getCookie } from './functions.js';

//  로그인이 되어 있으면 로그인 버튼을 숨기고 로그아웃 버튼을 보인다.
document.addEventListener('DOMContentLoaded', function () {
  const authorizationToken = getCookie('Authorization');
  // const permission = sessionStorage.getItem('permission');
  const permission = getCookie('permission');

  if (authorizationToken) {
    const loginButton = document.querySelector('.btn-primary[data-target="#logIn"]');
    const logoutButton = document.querySelector('.btn-primary[data-target="#logOut"]');
    if (loginButton) {
      loginButton.style.display = 'none';
    }
    if (logoutButton) {
      logoutButton.style.display = '';
    }
  }

  // 사장으로 로그인 시 내 업장 관리 버튼 활성화
  if (permission === 'owner') {
    const myCompanyButton = document.querySelector('.btn-primary[data-target="#myCompany"]');
    if (myCompanyButton) {
      myCompanyButton.style.display = '';
    }
  }
});

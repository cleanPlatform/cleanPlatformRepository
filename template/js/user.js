//  회원가입
async function signUp() {
  console.log('회원가입 함수 시작');
  const permission = document.querySelector('#signup-permission').value;
  const name = document.querySelector('#signup-name').value;
  const nickname = document.querySelector('#signup-nickname').value;
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;
  const passwordConfirm = document.querySelector('#signup-confirm-password').value;
  const address = document.querySelector('#signup-address').value;
  const phoneNumber = document.querySelector('#signup-phone-number').value;

  const response = await fetch(`/api/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      permission,
      name,
      nickname,
      email,
      password,
      passwordConfirm,
      address,
      phoneNumber,
    }),
  });
  const result = await response.json();
  console.log(result.message);
  window.location.reload();
  return alert(result.message);
}

// '회원가입' 버튼 클릭 시 모달을 열기 위한 이벤트 리스너 추가
document
  .querySelector('.btn-primary[data-target="#signUp"]')
  .addEventListener('click', function () {
    showModal(
      'signUp',
      '회원가입',
      `
      <form>
      <div class="modal-body">
          <div class="form-group">
              <label for="permission" class="col-form-label">사업자/개인:</label>
              <select id="signup-permission" name="선택">
                  <option value='guest'>일반 회원</option>
                  <option value='owner'>사업자 회원</option>
              </select>
          </div>
          <div class="input-group">
              <label for="signup-name">이름　</label>
              <input id="signup-name" type="text" placeholder="홍길동" />
          </div>
          <div class="input-group">
              <label for="signup-email">이메일　</label>
              <input id="signup-email" type="email" placeholder="email@gmail.com" />
          </div>
          <div class="input-group">
              <label for="signup-password">비밀번호　</label>
              <input id="signup-password" type="password" placeholder="password" />
          </div>
          <div class="input-group">
              <label for="signup-confirm-password">비밀번호 확인　</label>
              <input id="signup-confirm-password" type="password" placeholder="confirm-password" />
          </div>
          <div class="input-group">
              <label for="signup-nickname">닉네임　</label>
              <input id="signup-nickname" type="text" placeholder="nickname" />
          </div>
          <div class="input-group">
              <label for="signup-address">주소　</label>
              <input id="signup-address" type="text" placeholder="XX시 XX로 XXXXX" />
          </div>
          <div class="input-group">
              <label for="signup-phone-number">연락처　</label>
              <input id="signup-phone-number" type="text" placeholder="010-XXXX-XXXX" />
          </div>
      </div>
  </form>
  </div>
  <div class="modal-footer">
      <button id="signup-btn" type="submit" class="btn">Close</button>
      <button type="button" class="btn btn-primary" onclick="signUp()">회원 가입</button>
  </div>
  `
    );
  });

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

//  업장으로 이동
document
  .querySelector('.btn-primary[data-target="#myCompany"]')
  .addEventListener('click', function () {
    window.location.href = '/myCompany';
  });

// 쿠키에서 특정 이름의 쿠키 값을 가져오는 함수
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

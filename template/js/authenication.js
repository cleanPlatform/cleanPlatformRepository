//  로그인
async function logIn() {
  console.log('로그인 함수 시작');
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  const response = await fetch(`/api/sign/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const result = await response.json();

  console.log('loginToken :', result.permission);

  if (response.status == 200) {
    // sessionStorage.setItem('permission', result.permission);
    location.reload();
  }

  return alert(result.message);
}

// '로그인' 버튼 클릭 시 모달을 열기 위한 이벤트 리스너 추가
document.querySelector('.btn-primary[data-target="#logIn"]').addEventListener('click', function () {
  showModal(
    'logIn',
    '로그인',
    `
      <form>
        <div class="modal-body">
            <div class="input-group">
                <label for="login-email">로그인 이메일　</label>
                <input id="login-email" type="text" placeholder="xxxx@xxxx.com" />
            </div>
            <div class="input-group">
                <label for="login-password">비밀번호　</label>
                <!-- <i class="fa fa-eye fa-lg"></i> -->
                <input type="password" id="login-password" type="email" placeholder="비밀번호" />
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button id="signup-btn" type="submit" class="btn">Close</button>
        <button type="button" class="btn btn-primary" onclick="logIn()">로그인</button>
    </div>
    `
  );
});

//  로그아웃
async function logOut() {
  console.log('로그아웃 함수 시작');

  const response = await fetch(`/api/sign/signout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Bearer 형식의 JWT 토큰을 삭제하고, permission 삭제
  removeBearerTokenCookie();
  // sessionStorage.removeItem('permission');

  console.log('로그아웃 되었습니다.');

  location.reload();
  alert('로그아웃 되었습니다.');
}

// Bearer 제거
function removeBearerTokenCookie() {
  const cookies = document.cookie.split(';');
  console.log(cookies);
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('Authorization=Bearer')) {
      document.cookie = 'Authorization=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;';
    }
    if (cookie.startsWith('permission')) {
      document.cookie = 'permission=;';
    }
  }
}

// '로그아웃' 버튼 클릭 시 모달을 열기 위한 이벤트 리스너 추가
document
  .querySelector('.btn-primary[data-target="#logOut"]')
  .addEventListener('click', function () {
    showModal(
      'logOut',
      '로그아웃',
      `
      <p>진짜로 로그아웃 하시겠습니까?</p>
  <div class="modal-footer">
      <button id="signup-btn" type="submit" class="btn">취소</button>
      <button type="button" class="btn btn-primary" onclick="logOut()">로그아웃</button>
  </div>
  `
    );
  });

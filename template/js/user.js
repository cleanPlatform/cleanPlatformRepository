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

  const response = await fetch(`http://localhost:8080/api/user/signup`, {
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

//  로그인
async function logIn() {
  console.log('로그인 함수 시작');
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  const response = await fetch(`http://localhost:8080/api/sign/signin`, {
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

  console.log(result.message);
  console.log(result.toeken);

  const loginToken = result.token;

  if (response.status == 200) {
    // localStorage.setItem('Authorization', loginToken);
    sessionStorage.setItem('Authorization', loginToken);
  }

  location.reload();
  return alert(result.message);
}

//  로그아웃
async function logOut() {
  console.log('로그아웃 함수 시작');

  sessionStorage.removeItem('Authorization');

  console.log('로그아웃 되었습니다.');

  location.reload();
  alert('로그아웃 되었습니다.');
}

// 모달을 생성하고 초기화하는 함수
function createModal(modalId, modalTitle, modalContent) {
  const modalHtml = `
    <div class="modal fade" id="${modalId}" tabindex="-1" role="dialog" aria-labelledby="${modalId}Label" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="${modalId}Label">${modalTitle}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ${modalContent}
                </div>
            </div>
        </div>
    </div>
  `;

  // 모달을 현재 문서에 추가
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// 모달이 열릴 때 실행되는 함수
function showModal(modalId, modalTitle, modalContent) {
  // 모달을 생성하고 초기화하는 작업을 수행할 수 있습니다.
  createModal(modalId, modalTitle, modalContent);

  // // 아이콘 추가
  // $(document).ready(function () {
  //   $('.main i').on('click', function () {
  //     $('input').toggleClass('active');
  //     if ($('input').hasClass('active')) {
  //       $(this).attr('class', 'fa fa-eye-slash fa-lg').prev('input').attr('type', 'text');
  //     } else {
  //       $(this).attr('class', 'fa fa-eye fa-lg').prev('input').attr('type', 'password');
  //     }
  //   });
  // });
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

//  로그인이 되어 있으면 로그인 버튼을 숨기고 로그아웃 버튼을 보인다.
document.addEventListener('DOMContentLoaded', function () {
  const authorizationToken = sessionStorage.getItem('Authorization');

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
});

// '로그아웃' 버튼 클릭 시 모달을 열기 위한 이벤트 리스너 추가
document
  .querySelector('.btn-primary[data-target="#logOut"]')
  .addEventListener('click', function () {
    showModal(
      'logOut',
      '로그아웃',
      `
  <div class="modal-footer">
      <button id="signup-btn" type="submit" class="btn">취소</button>
      <button type="button" class="btn btn-primary" onclick="logOut()">로그아웃</button>
  </div>
  `
    );
  });

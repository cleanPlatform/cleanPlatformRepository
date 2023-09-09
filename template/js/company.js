//  로그인 상태에 따라서 다르게 버튼을 보여줌
function isLogin() {
  fetch('/data')
    .then((response) => response.json())
    .then((data) => {
      var lookValue = data.look;

      if (lookValue <= 1) {
        alert('잘못 된 요청!\n메인 페이지로 이동합니다.');
        window.location.href = '/';
      }
    })
    .catch((error) => {
      console.error('데이터 가져오기 오류:', error);
    });
}
// 페이지 로드 시 스크립트 실행
window.onload = function () {
  isLogin();
};

//  소유한 업장 불러오기
async function onPageLoad() {
  await getMyCompanyList();
}

document.addEventListener('DOMContentLoaded', onPageLoad);

async function getMyCompanyList() {
  try {
    const myCompanyList = await fetch(`/api/company/MyCompanies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (myCompanyList.ok) {
      // status 가 200~299 인 경우만.
      const responseData = await myCompanyList.json();
      const myCompanies = responseData.data;

      // myCompanyList 에 붙일 div
      const myCompanyListContainer = document.querySelector('.myCompanyList');

      // 기존 내용 비우기
      // myCompanyListContainer.innerHTML = '';

      // 한줄한줄 만들기
      myCompanies.forEach((company) => {
        const companyName = company.companyName;
        const modalContent = `
          <div class="companyList">
              <div>${companyName}　</div>
              <button>조회</button>
          </div>
        `;
        myCompanyListContainer.innerHTML += modalContent;
      });
    } else {
      console.error('응답이 실패했습니다.', myCompanyList.status);
    }
  } catch (err) {
    console.error('에러 :', err);
  }
}

//  업장 등록하기
async function createCompany() {
  const companyName = document.querySelector('#createCompany-name').value;
  const address = document.querySelector('#createCompany-adress').value;
  const phoneNumber = document.querySelector('#createCompany-phoneNumber').value;

  console.log(companyName, address, phoneNumber);

  const response = await fetch(`/api/company/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      companyName,
      address,
      phoneNumber,
    }),
  });
  const result = await response.json();
  console.log(result);

  window.location.reload();
  return alert(result.message);
}

// '업장 등록하기' 버튼 클릭 시 모달을 열기 위한 이벤트 리스너 추가
document
  .querySelector('.btn.btn-primary[data-target="#createCompany"]')
  .addEventListener('click', function () {
    showModal(
      'createCompany',
      '업장 등록하기',
      `
    <form>
      <div class="modal-body">
          <div class="input-group">
              <label for="createCompany-name">회사 이름　</label>
              <input id="createCompany-name" type="text" placeholder="회사 이름" />
          </div>
          <div class="input-group">
              <label for="createCompany-adress">회사 주소　</label>
              <input id="createCompany-adress" type="text" placeholder="회사 주소" />
          </div>
          <div class="input-group">
              <label for="createCompany-phoneNumber">회사 전화번호　</label>
              <input id="createCompany-phoneNumber" type="text" placeholder="회사 전화번호" />
          </div>
      </div>
  </form>
<div class="modal-footer">
    <button id="signup-btn" type="submit" class="btn">취소</button>
    <button type="button" class="btn btn-primary" onclick="createCompany()">업장 등록하기</button>
</div>
`
    );
  });

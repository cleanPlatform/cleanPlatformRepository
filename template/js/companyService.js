const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const companyId = params.companyId;
const companyName = params.companyName;

document.getElementById('companyIdHeader').textContent = `"${companyName}"의 서비스 관리페이지`;

// '서비스 등록하기' 버튼 클릭 시 모달을 열기 위한 이벤트 리스너 추가
document
  .querySelector('.btn.btn-primary[data-target="#createService"]')
  .addEventListener('click', function () {
    showModal(
      'createService',
      '서비스 등록하기',
      `
    <form>
      <div class="modal-body">
          <div class="input-group">
              <label for="offerName">서비스 이름　</label>
              <input id="offerName" type="text" placeholder="서비스 이름" />
          </div>
          <div class="input-group">
              <label for="offerNumber">서비스 순서　</label>
              <input id="offerNumber" type="text" placeholder="서비스 순서" />
          </div>
          <div class="input-group">
              <label for="price">서비스 가격　</label>
              <input id="price" type="text" placeholder="서비스 가격" />
          </div>
      </div>
  </form>
<div class="modal-footer">
    <button id="signup-btn" type="submit" class="btn">취소</button>
    <button type="button" class="btn btn-primary" onclick="createCompanyService()">서비스 등록하기</button>
</div>
`
    );
  });

//  서비스 등록하기
async function createCompanyService() {
  const offerName = document.querySelector('#offerName').value;
  const offerNumber = document.querySelector('#offerNumber').value;
  const price = document.querySelector('#price').value;

  console.log(offerName, offerNumber, price, companyId);

  const response = await fetch(`/api/offer/companies/${companyId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      offerName,
      offerNumber,
      price,
    }),
  });
  const result = await response.json();
  console.log(result);

  window.location.reload();
  return alert(result.message);
}

//  서비스 목록 불러오기
async function onPageLoad() {
  await getMyCompanySerivceList();
}

document.addEventListener('DOMContentLoaded', onPageLoad);

async function getMyCompanySerivceList() {
  try {
    const myCompanyServiceList = await fetch(`/api/offer/companies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (myCompanyServiceList.ok) {
      // status 가 200~299 인 경우만.
      const responseData = await myCompanyServiceList.json();
      const myCompanies = responseData.data;

      // myCompanyList 에 붙일 div
      const myCompanyListContainer = document.querySelector('.myCompanyList');

      // 한줄한줄 만들기
      myCompanies.forEach((company) => {
        console.log('myCompanies :', myCompanies);
        const compnayName = company.offerName;
        const Id = company.offerId;
        const modalContent = `
          <div class="companyList">
              <div>${compnayName}　</div>
              <button onclick="toggleUpdateMyCompanyService(${Id})">조회/수정</button>
              <button onclick="deleteMyCompany(${Id} , '${compnayName}')">삭제</button>
              </div>
          <div id="updateMyCompany${Id}" style="display: none">
            <div class="input-group">
              <label for="update-name">서비스 번호　</label>
              <div style=" text-align: left">${Id}</div>
            </div>
            <div class="input-group">
              <label for="update-name">서비스 명칭　</label>
              <input id="update-name" type="text" placeholder="서비스 명칭" value="${compnayName}">
            </div>
            <div class="input-group">
              <label for="update-address">서비스 순서　</label>
              <input id="update-address" type="text" placeholder="서비스 순서" value="${company.offerNumber}">
            </div>
            <div class="input-group">
              <label for="update-phone">서비스 가격　</label>
              <input id="update-phone" type="text" placeholder="서비스 가격" value="${company.price}">
            </div>
            <div class="input-group">
              <div>　</div>
              <button onclick="updateMyCompanyService(${Id}, ${company.companyId})">정보 업데이트 하기</button>
            </div>
            <br>
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

//  업장 수정 펼치기
async function toggleUpdateMyCompanyService(id) {
  var updateCompanyInfo = document.getElementById(`updateMyCompany${id}`);

  let displayNow = updateCompanyInfo.style.display;

  if (displayNow === 'none') {
    displayNow = '';
  } else {
    displayNow = `none`;
  }

  updateCompanyInfo.style.display = displayNow;
}

//  업장수정하기
async function updateMyCompanyService(offerId, companyId) {
  const offerName = document.querySelector(`#update-name`).value;
  const offerNumber = document.querySelector(`#update-address`).value;
  const price = document.querySelector(`#update-phone`).value;

  const response = await fetch(`/api/offer/companies/${companyId}/${offerId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      offerName,
      offerNumber,
      price,
    }),
  });
  const result = await response.json();
  console.log(result.message);
  window.location.reload();
  return alert(result.message);
}

//  내 회사로
document
  .querySelector('.btn-primary[data-target="#goToMyCompany"]')
  .addEventListener('click', function () {
    window.location.href = '/myCompany';
  });

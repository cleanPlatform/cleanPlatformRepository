//  업장 등록하기
async function createCompany() {
  console.log('업장등록 함수 시작');
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
  console.log('api 요청 지나감');
  const result = await response.json();
  //  console.log("@@@@@@@@@=>",response)
  // console.log(result.message);

  window.location.reload();
  return alert(result.message);
}

// '업장 등록하기' 버튼 클릭 시 모달을 열기 위한 이벤트 리스너 추가
document
  .querySelector('.btn-primary[data-target="#createCompany"]')
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

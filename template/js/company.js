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

  return alert(result.message);
  // location.reload();
}

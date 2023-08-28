// function goToSignUp() {
//   location.href = 'http://localhost:8080/signup.html';
// }

async function signup() {
  const permission = document.querySelector('#permission').value;
  const name = document.querySelector('#name').value;
  const nickname = document.querySelector('#nickname').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const passwordConfirm = document.querySelector('#passwordConfirm').value;
  const address = document.querySelector('#address').value;
  const phoneNumber = document.querySelector('#phoneNumber').value;

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

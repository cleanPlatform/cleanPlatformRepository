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

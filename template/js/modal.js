function showModal(modalId, modalTitle, modalContent) {
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

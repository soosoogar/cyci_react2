export default function LoginModal() {
    return (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>로그인</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <p>로그인 처리가 완료되었습니다.</p>
              <p>아이디: {formData.id}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={closeModal}>확인</button>
            </div>
          </div>
        </div>
    )
}
// Toast Notification Component

export function renderToast(state) {
  if (!state.toast) return '';

  return `
    <div class="toast-container">
      <div class="toast">
        <span>${state.toast.message}</span>
        ${state.toast.actionLabel ? `
          <button class="toast-action-btn" id="toast-action">${state.toast.actionLabel}</button>
        ` : ''}
      </div>
    </div>
  `;
}

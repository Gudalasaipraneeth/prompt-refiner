function injectRefineButtons() {
  document.querySelectorAll('textarea').forEach((textarea) => {
    if ((textarea as HTMLElement).dataset.refineInjected) return;
    const btn = document.createElement('button');
    btn.textContent = 'Refine';
    btn.style.marginLeft = '4px';
    btn.onclick = async (e) => {
      e.preventDefault();
      const text = (textarea as HTMLTextAreaElement).value;
      chrome.runtime.sendMessage({ action: 'refine', text }, (response: any) => {
        if (response && response.prompt) {
          alert('Refined Prompt:\n' + response.prompt);
        } else {
          alert('Error: Could not refine prompt.');
        }
      });
    };
    textarea.insertAdjacentElement('afterend', btn);
    (textarea as HTMLElement).dataset.refineInjected = 'true';
  });
}

// Run on load and whenever the DOM changes
injectRefineButtons();
const observer = new MutationObserver(injectRefineButtons);
observer.observe(document.body, { childList: true, subtree: true }); 
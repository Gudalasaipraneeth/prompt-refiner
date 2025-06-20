chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (message.action === 'refine') {
    fetch('http://localhost:3456/refine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message.text })
    })
      .then(res => res.json())
      .then(data => {
        sendResponse(data);
      })
      .catch(err => {
        sendResponse({ error: err.message });
      });
    return true; // Indicates async response
  }
}); 
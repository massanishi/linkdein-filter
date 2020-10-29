function isDisabled() {
  const data = {
    type: 'IS_DISABLED',
  };
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(data, resp => {
      const disabled = resp.disabled;

      resolve(disabled);
    });
  });
}

function disable(evt) {
  const disabling = !evt.target.checked;

  const data = {
    type: 'UPDATE_DISABLED',
    disabling,
  };
  chrome.runtime.sendMessage(data, () => {
    chrome.tabs.reload();
  });
}

// disabled switch
const onOffSwitch = document.getElementById('turn-onoff-switch');
onOffSwitch.addEventListener('change', disable);

isDisabled()
.then(disabled => {
  onOffSwitch.checked = !disabled;
});
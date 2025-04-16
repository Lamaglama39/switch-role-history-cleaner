document.getElementById("clearButton").addEventListener("click", async () => {
  // 現在のタブを取得
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const statusElement = document.getElementById("status");

  // AWSコンソールのURLかチェック
  if (tab.url.includes("console.aws.amazon.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: deleteCookie,
    });

    statusElement.textContent = "履歴を削除しました！";
    statusElement.className = "success";

    // 1秒待ってからページをリロード
    setTimeout(() => {
      chrome.tabs.reload(tab.id);
    }, 1000);
  } else {
    statusElement.textContent = "AWSマネジメントコンソールで実行してください";
    statusElement.className = "error";
  }
});

function deleteCookie() {
  //
  document.cookie =
    "noflush_awsc-roleInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.aws.amazon.com; secure";
  return true;
}

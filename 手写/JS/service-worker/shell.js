// shell.js — App Shell 骨架逻辑（Tab 切换 + 网络状态）

// Tab 切换
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));

    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) panel.classList.remove('hidden');
  });
});

// 网络状态监测
function updateNetworkStatus() {
  const badge = document.getElementById('network-status');
  if (navigator.onLine) {
    badge.textContent = '在线';
    badge.classList.remove('offline');
  } else {
    badge.textContent = '离线';
    badge.classList.add('offline');
  }
}

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
updateNetworkStatus();

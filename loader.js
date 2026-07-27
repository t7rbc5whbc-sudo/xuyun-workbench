// 徐云工作台 v10 加载器 - 从中国CDN镜像加载
(function() {
  const CDN_URLS = [
    'https://gcore.jsdelivr.net/gh/t7rbc5whbc-sudo/xuyun-workbench@main/index.html',
    'https://testingcf.jsdelivr.net/gh/t7rbc5whbc-sudo/xuyun-workbench@main/index.html'
  ];

  function tryLoad(i) {
    if (i >= CDN_URLS.length) {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f5f9ff;font-family:sans-serif"><div style="background:white;border-radius:20px;padding:30px;text-align:center;box-shadow:0 8px 30px rgba(74,144,226,.2)"><div style="width:70px;height:70px;background:#4a90e2;border-radius:18px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:34px;color:white;font-weight:bold">徐</div><h2 style="color:#1f2937">加载失败</h2><p style="color:#6b7280;font-size:14px;margin-top:8px">所有CDN源都无法访问，请检查网络连接后刷新页面重试</p></div></div>';
      return;
    }
    fetch(CDN_URLS[i], { cache: 'no-store' })
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(text => {
        if (text.includes('徐云工作台') && text.length > 5000) {
          document.open();
          document.write(text);
          document.close();
        } else {
          tryLoad(i + 1);
        }
      })
      .catch(() => tryLoad(i + 1));
  }

  tryLoad(0);
})();

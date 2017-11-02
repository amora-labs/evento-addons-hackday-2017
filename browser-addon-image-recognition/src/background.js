const panelUrl = browser.extension.getURL('html/panel.html');

const run = (url) => {
  browser.sidebarAction.setPanel({
    panel: `${panelUrl}?image=${url}`,
  });

  browser.sidebarAction.open();
};
// listen
browser.contextMenus.create({
  id: 'image-recognition',
  title: 'See recognition data',
  contexts: ['image'],
});

browser.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'image-recognition') {
    run(info.srcUrl);
  }
});

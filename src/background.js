import 'webextension-polyfill';

browser.alarms.create('http://google.com', {
  delayInMinutes: 1,
});

function openTab(alarmInfo) {
  console.log(alarmInfo);
  browser.tabs.create({
    url: alarmInfo.name,
  });
}

browser.alarms.onAlarm.addListener(openTab);


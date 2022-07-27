import { Metacom } from './metacom.js';

window.addEventListener('load', async () => {
  const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
  const metacom = Metacom.create(`${protocol}://${location.host}/api`);
  window.api = metacom.api;
  await metacom.load('example', 'chat', 'registry', 'auth');
});

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/worker.js');
}

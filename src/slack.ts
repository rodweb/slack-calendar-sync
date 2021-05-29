import { WebClient } from '@slack/web-api';

const token = process.env.SLACK_TOKEN;

console.log(token);

const web = new WebClient(token);

async function updateStatus() {
  const now = new Date();
  const ONE_HOUR_IN_MS = 60 * 60 * 1000;
  const expiration = Math.round((+new Date() + ONE_HOUR_IN_MS)/1000);
  const res = await web.users.profile.set({
    profile: JSON.stringify({
      status_text: 'testing',
      status_emoji: ':eyes:',
      status_expiration: expiration,
    })
  })
  console.log(res);
}

async function clearStatus() {
  const res = await web.users.profile.set({
    profile: JSON.stringify({
      status_text: '',
      status_emoji: '',
      status_expiration: 0,
    })
  })
  console.log(res);
}

async function getDnd() {
  const res = await web.dnd.info();
  console.log(res);
}

async function setSnooze() {
  const res = await web.dnd.setSnooze({
    num_minutes: 60,
  });
  console.log(res);
}

async function endSnooze() {
  const res = await web.dnd.endSnooze();
  console.log(res);
}

async function setAway() {
  const res = await web.users.setPresence({
    presence: 'away',
  })
  console.log(res);
}

;(async () => {
  await clearStatus();
})().catch(error => {
  console.log(error);
});

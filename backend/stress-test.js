import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 50 },   // ramp-up to 50 users
        { duration: '20s', target: 50 },   // stay at 50 users
        { duration: '10s', target: 0 },    // ramp-down to 0
    ],
};

const BASE_URL = 'https://babyroy.onrender.com/api'; // 🔁 Replace with your real API domain

export default function () {
    // Telegram OAuth simulation
    let oauthRes = http.post(`${BASE_URL}/auth/telegramOauth`, JSON.stringify({
        id: 123456,
        first_name: "Test",
        last_name: "testuser",
        hash: "898847475748tt2bhavuhfeu8s76tu3vudatf3;kd/...dfhuuae", // fake hash for test
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
    check(oauthRes, {
        'telegramOauth status was 200': (r) => r.status === 200,
    });

    // Get tasks
    let taskListRes = http.get(`${BASE_URL}/tasks/`);
    check(taskListRes, {
        'get tasks status 200': (r) => r.status === 200,
    });

    // Verify telegram task
    let verifyTelegramRes = http.post(`${BASE_URL}/tasks/verify/telegram`, JSON.stringify({
        userId: '123456',
        taskId: "68308f56b32ae3cace08a127",
        telegramId: "1093757742",
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
    check(verifyTelegramRes, {
        'verify telegram task status 200': (r) => r.status === 200,
    });

    // // Connect wallet
    // let connectRes = http.post(`${BASE_URL}/tasks/verify/connect`, JSON.stringify({
    //     userId: '123456',
    //     wallet: 'EQAvz...FakeAddress',
    //     taskId: '68308f56b32ae3cace08a128'
    // }), {
    //     headers: { 'Content-Type': 'application/json' }
    // });
    // check(connectRes, {
    //     'wallet connect status 200': (r) => r.status === 200,
    // });

    //   // Invite verification
    //   let inviteRes = http.post(`${BASE_URL}/tasks/verify/inviteFriends`, JSON.stringify({
    //     userId: '123456',
    //     invited: 3
    //   }), {
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    //   check(inviteRes, {
    //     'invite verification status 200': (r) => r.status === 200,
    //   });

    sleep(1); // wait 1s to simulate user delay
}

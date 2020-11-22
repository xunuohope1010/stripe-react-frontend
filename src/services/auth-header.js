export default function authHeader() {
    const cookie = JSON.parse(localStorage.getItem('cookie'));

    if (cookie && cookie.token) {
        return { Authorization: 'Bearer ' + cookie.token }; // for Spring Boot back-end
        // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
        return {};
    }
}

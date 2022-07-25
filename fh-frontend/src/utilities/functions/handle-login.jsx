export default function HandleLogin(event) {
    event.preventDefault();

    const authWindow = window.open("http://localhost/auth", "_blank", `width=450, height=800, left=${(window.screen.width / 2) - (450 / 2)}, top=${(window.screen.height / 2) - (800 / 2)}`);
    const authInterval = setInterval(() => {
        if (authWindow.closed) {
            clearInterval(authInterval);

            window.location.href = "/dashboard";
        };
    }, 100);
};
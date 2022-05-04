// Array deconstructing for quick-access in form validate
const [email, psw, checkbox, btn] = document.querySelector(".login__form");

// Checks if userToken exists
const allCookies = document.cookie.split("; ")
const cookieData = [];
allCookies.forEach((cookie) => {
    cookieData.push({
        name: cookie.split("=")[0],
        value: cookie.split("=")[1]
    })
})
const userToken = cookieData.find(cookie => cookie.name == "userToken")

// If it exists
if (userToken) {
    // Check DB for that user
    fetch(`https://hifi-jsonserver.herokuapp.com/customers/${userToken.value}`)
        .then(res => {
            // If user still exists return user
            if (res.status === 200 || res.status === 201) {
                return res.json()
            } else {
                // Else clear cookies and return eror
                alert("problems with getting your saved userinfo")
                document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                return false
            }

        })
        .then(data => {
            // If returned data is userinfo, go to profile else register
            data ? window.location.href = "/profile" : window.location.href = "/register"
        })
}

// Form validation
btn.onclick = (event) => {
    event.preventDefault()

}
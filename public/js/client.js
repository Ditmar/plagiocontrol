class ApiClient {
    constructor() {
        var mainmenu = document.querySelector(".nav-item .nav-link");
        console.log(mainmenu);
        mainmenu.addEventListener("click", (e) => {
            console.log(e);
        });
        console.log(mainmenu);
        console.log("OK")
    }
}
var api = new ApiClient();
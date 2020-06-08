class ApiClient {
  constructor() {
    this.mainmenu = document.querySelectorAll(".nav .nav-item .nav-link");
    this.contenthtml = document.getElementById("maincontent");
    this.root = "HOLA AMIGOS";
    this.renderPage();
    this.mainmenu.forEach((item, i) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(item.attributes.href.value);
        document.location.href = "#" + item.attributes.href.value;
        this.mainmenu.forEach((item, i) => {
          item.classList.remove("active");
          this.renderPage();
        });
        item.classList.add("active");
      });
    });
  }
  insertAndExecute(id, text) {
    document.getElementById(id).innerHTML = text;
    var scripts = Array.prototype.slice.call(document.getElementById(id).getElementsByTagName("script"));
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src != "") {
            var tag = document.createElement("script");
            tag.src = scripts[i].src;
            document.getElementsByTagName("head")[0].appendChild(tag);
        }
        else {
            eval(scripts[i].innerHTML);
        }
    }
}
  renderPage() {
    var uri = document.location.href;
    var check = uri.match(/\#\/\w+/g);
    var url = "/";
    if (check) {
      var ur = check[0].replace(/\#/, "");
      url = "/server" + ur;
      var misCabeceras = new Headers();
      fetch(url, {
        method: "GET",
        headers: misCabeceras,
      })
        .then((response, data) => {
          return response.text();
        })
        .then((data) => {
            //this.contenthtml.innerHTML = data;
            //this.insertAndExecute("maincontent", data);
            $("#maincontent").html(data);
        });
    }
  }
}
var api = new ApiClient();

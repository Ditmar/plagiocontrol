class ApiClient {
  constructor() {
    this.mainmenu = document.querySelectorAll("a");
    this.contenthtml = document.getElementById("maincontent");
    this.serchbtn = document.getElementById("buscar");
    this.criteria = document.getElementById("criteria");
    this.root = "HOLA AMIGOS";
    this.renderPage();
    this.serchbtn.addEventListener("click", (e) => {
      fetch("/server/search", {
        method: "POST",
        body: JSON.stringify({ searchcriterion: this.criteria.value }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response, data) => {
          return response.text();
        })
        .then((data) => {
          $("#maincontent").html(data);
        });
    });
    this.mainmenu.forEach((item, i) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        document.location.href = "#" + item.attributes.href.value;
        this.renderPage();
        this.mainmenu.forEach((item, i) => {
          item.classList.remove("active");
        });
        item.classList.add("active");
      });
    });
  }
  insertAndExecute(id, text) {
    document.getElementById(id).innerHTML = text;
    var scripts = Array.prototype.slice.call(
      document.getElementById(id).getElementsByTagName("script")
    );
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src != "") {
        var tag = document.createElement("script");
        tag.src = scripts[i].src;
        document.getElementsByTagName("head")[0].appendChild(tag);
      } else {
        eval(scripts[i].innerHTML);
      }
    }
  }
  renderPage() {
    var uri = document.location.href;
    var check = uri.match(/\#\/.+/g);
    var url = "/";
    //document.getElementById("myNav").style.width = "100%";
    if (check) {
      var ur = check[0].replace(/\#/, "");
      url = "/server" + ur;
      var misCabeceras = new Headers();
      console.log("TESTTT");
      $( "#maincontent" ).animate({
        left: "900",
        opacity: 0
      }, 500, function() {
        fetch(url, {
          method: "GET",
          headers: misCabeceras,
        })
          .then((response, data) => {
            return response.text();
          })
          .then((data) => {
            $("#maincontent").css("opacity", 0);
              $("#maincontent").html(data);
              $( "#maincontent" ).animate({
                left: "0",
                opacity: 1
              }, 500, function() {
              });     
          });
      });
      
    }
  }
}
var api = new ApiClient();

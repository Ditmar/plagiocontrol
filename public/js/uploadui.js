class UploadUi {
    constructor(path) {
      this.path = path;
      console.log("LOAD CONSTRUCT");
        this.dropzone = document.getElementById('drop-zone');
        this.defaultmsn = document.getElementById('defaultmsn');
        this.fileicon = document.getElementsByClassName('filesicon');
        
        if (this.dropzone == null) {
            console.log("drop-zone div is not defined");
            return;
        }
        if (this.fileicon == null) {
            console.log("filesicon is necesary for proced with the upload");
            return;
        }
        this.dropzone.ondrop = (e) => {
            e.preventDefault();
            this.dropzone.className = 'upload-drop-zone';
            this.startUpload(e.dataTransfer.files)
        }
    
        this.dropzone.ondragover = function() {
            this.className = 'upload-drop-zone drop';
            return false;
        }
    
        this.dropzone.ondragleave = function() {
            this.className = 'upload-drop-zone';
            return false;
        }
    }
    startUpload(files) {
        console.log(files[0]);
        if (files.length > 0) {
            var name = files[0].name
            var type = files[0].type;
            var realsize = (files[0].size / 1024) / 1024;
            var size = Math.round(realsize * 100) / 100;
            var badformat = true;
            var typeformat = "/img/pdf.png";
            if (type.match(/pdf/g) == null) {
              badformat = false;
            }
            if (type.match(/jpg/g) == null) {
              badformat = false;
              typeformat = "/img/jpg.png"
            }
            if (!badformat) {
                this.defaultmsn.style.display = "none";

                var htmlpoint = `<li>
                <img src="${typeformat}" alt="">
                <div id="filename">
                  ${name}
                </div>
                <div id = "filename">
                ${size} MB
                </div>
                <a name="" id="deletebutton" class="btn btn-danger" href="#" role="button">
                  <img src="/img/trash.svg" alt="" width="20px" height="20px"/>
                </a>
              </li>`;
              this.fileicon[0].innerHTML = htmlpoint;
              var deletebutton = document.getElementById("deletebutton");
              deletebutton.addEventListener("click", (e) => {
                  e.preventDefault();
                  this.fileicon[0].innerHTML = "";
                  this.defaultmsn.style.display = "block";
              });
              var data = new FormData()
                data.append('file', files[0])
                data.append('user', 'hubot')
              fetch(this.path, { // Your POST endpoint
                  method: 'POST',
                  body: data // This is your file object
                }).then(
                  response => response.text()// if the response is a JSON object
                ).then(
                  success => {
                    $("#maincontent").html(success);
                  } 
                ).catch(
                  error => console.log(error) // Handle the error response object
                );
            } else {
                console.log("Formato incorrecto")
            }
        }
        
    }
}
export { UploadUi };
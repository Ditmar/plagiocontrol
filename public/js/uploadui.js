class UploadUi {
    constructor(path, socket, code,callback) {
      this.path = path;
      this.data = null;
      this.code  = code;
        this.dropzone = document.getElementById('drop-zone');
        this.defaultmsn = document.getElementById('defaultmsn');
        this.fileicon = document.getElementsByClassName('filesicon');
        this.sendbtn = document.getElementById("sendbtn");
        this.sendbtn.addEventListener("click", (e) => {
          e.preventDefault();
          if (this.data != null) {
            document.getElementById("myNav").style.width = "100%";
            fetch(this.path, { // Your POST endpoint
              method: 'POST',
              body: this.data // This is your file object
            }).then(
              response => response.text()// if the response is a JSON object
            ).then(
              success => {
                //document.getElementById("myNav").style.width = "0%";
                document.getElementById("myNav").style.width = "0%";
                callback(success);
              } 
            ).catch(
              error => console.log(error) // Handle the error response object
            );
          }
        });
        socket.on('msn', function(msn)
        {
          $("#msn_msn").html(msn.msn);
        });
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
        //document.getElementById("myNav").style.width = "100%";
        console.log("ENTER HERE " + files.length);
        if (files.length > 0) {
            var name = files[0].name
            var type = files[0].type;
            var realsize = (files[0].size / 1024) / 1024;
            var size = Math.round(realsize * 100) / 100;
            var badformat = true;
            var typeformat = "/img/pdf.png";
            console.log(type);
            if (type.match(/pdf/g) != null) {
              badformat = false;
            }
            if (type.match(/jpg/g) != null | 
            type.match(/jpeg/g) != null | 
            type.match(/png/g) != null) {
              console.log("IS JPG");
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
                <br/>
                <div id = "filename">
                ${size} MB
                </div>
                <a name="" id="deletebutton" class="btn btn-danger" href="#" role="button">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash2-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.037 3.225l1.684 10.104A2 2 0 0 0 5.694 15h4.612a2 2 0 0 0 1.973-1.671l1.684-10.104C13.627 4.224 11.085 5 8 5c-3.086 0-5.627-.776-5.963-1.775z"/>
                <path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z"/>
              </svg>
                </a>
              </li>`;
              this.fileicon[0].innerHTML = htmlpoint;
              var deletebutton = document.getElementById("deletebutton");
              deletebutton.addEventListener("click", (e) => {
                  e.preventDefault();
                  this.fileicon[0].innerHTML = "";
                  this.defaultmsn.style.display = "block";
              });
              this.data = new FormData()
              this.data.append('file', files[0])
              this.data.append('user', 'hubot')
              this.data.append('code', this.code);
              /*fetch(this.path, { // Your POST endpoint
                  method: 'POST',
                  body: data // This is your file object
                }).then(
                  response => response.text()// if the response is a JSON object
                ).then(
                  success => {
                    //document.getElementById("myNav").style.width = "0%";
                    document.getElementById("myNav").style.width = "0%";
                    console.log(success);
                    $("#maincontent").html(success);
                  } 
                ).catch(
                  error => console.log(error) // Handle the error response object
                );*/
            } else {
                console.log("Formato incorrecto")
            }
        }
        
    }
}
export { UploadUi };
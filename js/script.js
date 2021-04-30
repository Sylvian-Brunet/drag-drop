function addPreview(files, container) {
    container.innerHTML = "";
    files.forEach(function(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            let fileSplit = file.name.split(".");
            let extension = fileSplit[ fileSplit.length-1 ];
            if (['jpg', 'png', 'jpeg'].includes(extension)) {
                container.innerHTML += 
                    "<div class='border p-1 m-1'>" +
                        "<div class='imgContainer'>" +
                            "<img src='" + e.target.result + "'>" +
                        "</div>" +
                        "<div class='text-center imgSubTitle'>" + file.name + "</div>" +
                    "</div>";
            } else {
                container.innerHTML += 
                    "<div class='border p-1 m-1'>" +
                        "<div class='imgContainer'>" +
                            "<i class='bi bi-file-earmark-fill' style='font-size: 35px;'></i>" +
                        "</div>" +
                        "<div class='text-center imgSubTitle'>" + file.name + "</div>" +
                    "</div>";  
            }
        }
        reader.readAsDataURL(file);
    });
}

let dropContainer = document.getElementById('container');
let fileInput = document.getElementById('fileInput');
let allowedExtensions = ["jpg", "jpeg", "png", "pdf"];

dropContainer.ondragover = dropContainer.ondragenter = function(e) {
    e.preventDefault();
};

dropContainer.ondrop = function(e) {
    let objFiles = e.dataTransfer.files;
    let files = Object.values(objFiles);
    
    for (let i = 0; i < files.length; i++) {
        let fileSplit = files[i].name.split(".");
        let extension = fileSplit[ fileSplit.length-1 ];
        if (!allowedExtensions.includes(extension)) {
            files.splice(i, 1);
        }
    }

    addPreview(files, dropContainer);
    fileInput.files = objFiles;
    e.preventDefault();
};
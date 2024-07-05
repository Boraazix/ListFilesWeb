// active the input file/folder
function activeInputFile() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

// show the folder name
function getFolderName(input) {
    if (input.files.length > 0) {
        var fullPath = input.files[0].webkitRelativePath || input.files[0].relativePath || '';
        var path = fullPath.split('/');
        path.pop();
        var caminho = path.join('/');
        document.getElementById('folderPath').value = caminho;
    }
    else
    {
        alert('Esta pasta não possui arquivos!'); 
    }
}

// if the field is empty, put a '0'
function noEmpty(input) {
    if (input.value === '') { input.value = 0; }
}

// toggle the separator between enabled and disabled
function toggleSeparator(enumerateListCheckbox) {
    var separatorInput = document.getElementById('separator');

    if (enumerateListCheckbox.checked) {
        separatorInput.disabled = false;
    } else {
        separatorInput.disabled = true;
    }
}

// create the files list
function listFiles() {
    const showExtension = document.getElementById('showExtension').checked;
    const subfolder = document.getElementById('subfolder').checked;
    const enumerateList = document.getElementById('enumerateList').checked;
    const separator = document.getElementById('separator').value;
    const ignoreStart = parseInt(document.getElementById('ignoreStart').value, 10);
    const ignoreEnd = parseInt(document.getElementById('ignoreEnd').value, 10);
    const fileListContainer = document.getElementById('fileList');
    const fileInput = document.getElementById('fileInput');

    // Clearing the list
    fileListContainer.innerHTML = '';

    if (fileInput.files.length === 0) {
        alert('Por favor, selecione uma pasta.');
        return;
    }

    // Getting the files directly into the selected folder
    const files = fileInput.files[0].webkitEntries || fileInput.files;
    const filesToShow = [];

    // Filtering only files directly within the selected folder, or not
    for (let i = 0; i < files.length; i++) {
        const file = files[i]; 
        if (subfolder || file.webkitRelativePath.split('/').length <= 2) {
            filesToShow.push(file);
        }
    }

    // Removing files to be ignored from the beginning and end
    const filesToDisplay = filesToShow.slice(ignoreStart, filesToShow.length - ignoreEnd);

    // Displaying files in the list
    filesToDisplay.forEach((file, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${enumerateList ? index + 1 + separator : ''}${showExtension ? file.name : file.name.substring(0, (file.name.lastIndexOf('.') <= 0 ? file.name.length : file.name.lastIndexOf('.')))}`;
        fileListContainer.appendChild(listItem);
    });
}

// copy the list files to the transfer area
function copyFiles() {
    const fileListContainer = document.getElementById('fileList');
    const items = fileListContainer.getElementsByTagName('li');
    let text = '';

    if (fileListContainer.innerHTML != '') {
        for (let i = 0; i < items.length; i++) {
            text += items[i].textContent + '\n';
        }

        // copy text to the transfer area
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        alert('Lista copiada para a área de transferência!');
    }
}

//clear the fields
function clearFields()
{
    document.getElementById('folderPath').value = '';
    document.getElementById('fileInput').value = '';
    document.getElementById('ignoreStart').value = 0;
    document.getElementById('ignoreEnd').value = 0;
    document.getElementById('showExtension').checked = true;
    document.getElementById('subfolder').checked = false;
    document.getElementById('enumerateList').checked = true;
    document.getElementById('separator').value = ' - ';
    document.getElementById('separator').disabled = false;
    document.getElementById('fileList').innerHTML = '';
}


 //"GGC.CGA.TTA.ATG.CTT.AAA.TGC.GGC.CTA.AAT.TAT"

 window.onload = function () {
  //Check the support for the File API support
  if (window.File && window.FileReader && window.FileList && window.Blob) {
      var fileSelected = document.getElementById('arquivo');
      fileSelected.addEventListener('change', function (e) {
          //Set the extension for the file
          var fileExtension = /text.*/;
          //Get the file object
          var fileTobeRead = fileSelected.files[0];
          //Check of the extension match
          if (fileTobeRead.type.match(fileExtension)) {
              //Initialize the FileReader object to read the 2file
              var fileReader = new FileReader();
              fileReader.onload = function (e) {
                  var fileContents = document.getElementById('filecontents');
                  //fileContents.innerText = fileReader.result;
                  transcription(fileReader.result.split('.'));
              }
              fileReader.readAsText(fileTobeRead);
          }
          else {
              alert("Por favor selecione arquivo texto");
          }

      }, false);
  }
  else {
      alert("Arquivo(s) não suportado(s)");
  }
}

 const baseMap = new Map();

 baseMap.set('A','U')
 baseMap.set('T','A')
 baseMap.set('G','C')
 baseMap.set('C','G')

 function render(codons, mRNA ) {
   
  const mRnaTexElement = document.createTextNode(mRNA.join(''));
  const modalrnaElement = document.createElement('p');
  modalrnaElement.appendChild(mRnaTexElement);
  const dnaTextElement = document.createTextNode(codons);
  const modaldnaPElement = document.createElement('p');
  modaldnaPElement.appendChild(dnaTextElement);

  const modalBodyElement = document.querySelector('div[class=modal-body]');

  modalBodyElement.appendChild(modaldnaPElement);
  modalBodyElement.appendChild(modalrnaElement);


  modal.style.display = "block";

 }

 function transcription( codons ) {
   event.preventDefault()
     let mRNA = []; 
     let fita35 = codons.join('').split('');
     fita35.map( (base) => {
       mRNA.push(baseMap.get(base));
     })
     render(codons, mRNA)
   }
 
 const inputElement = document.querySelector('input[name=DNA]');
 // Get the button that opens the modal
 const btnElement = document.querySelector('button.btn');
 
 btnElement.onclick = function () {
  event.preventDefault()
   const DNA = inputElement.value;
   const codons = DNA.split('.');   
   transcription(codons);
 }


 // Get the modal
 var modal = document.getElementById("myModal");

 //var btn = document.getElementById("myBtn");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal 
/*  btnElement.onclick = function() {
   event.preventDefault()
   modal.style.display = "block";
 } */

 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
   modal.style.display = "none";
   inputElement.value ='';
   const modalBodyElement = document.querySelector('div[class=modal-body]');
   modalBodyElement.innerHTML = "";

 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }
 
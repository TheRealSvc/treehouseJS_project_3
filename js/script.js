// 3 have name focused as default after reloading *************************
document.getElementsByName("user-name")[0].focus() ;


// 4 job description field ************************************************
const otherJob = document.getElementById("other-job-role")
otherJob.setAttribute("type","hidden") ;
const jobDes = document.querySelector("select[id=title]")
jobDes.addEventListener('change', (e) => { 
  if(e.target.value == "other") {
    otherJob.setAttribute("type","defaultValue") ;
  } else {  
    otherJob.setAttribute("type","hidden"); }
})


// 5 T-shirt Info ***********************************************************
const colorDiv = document.querySelector("div.shirt-colors") ; // hides colorSelector... pops up for a split second after reload. Fix later !  
colorDiv.style.visibility='hidden' ;

const elCol = document.querySelectorAll("#color option") ;
const optionSel = "data-theme" ; // for testing

const designThemeSelector = document.querySelector("#design") ;
designThemeSelector.addEventListener('change', (e) => {
for (i=0; i < elCol.length ; i++) {
  if(elCol[i].getAttribute("data-theme")  === e.target.value) {    
    elCol[i].style.display = 'block' ;
    elCol[i].setAttribute("selected","selected") ;  // that did the trick to set an valid element as selected (together with the "remove" in the else) 
  } else  { 
    elCol[i].style.display = 'none' ;
    elCol[i].removeAttribute("selected") ;
  } 
  elCol[0].parentNode.style.visibility = 'visible' ;
  }
}
) 


// 6 "Register for Activities" section ****************************************
const activityCheckboxes = document.querySelector("#activities-box") ;
const checkInputs = activityCheckboxes.children ;


activityCheckboxes.addEventListener('change', (e) => {
  let totalSum = 0 ;
  if (e.target.checked) {
      e.target.parentElement.classList.remove("disabled") ;
      var currentName = e.target.getAttribute("name") ;
      var currentDateTime = e.target.getAttribute("data-day-and-time");
      console.log(currentName)
      console.log('/n')
  } 
  
  for (i = 0; i < checkInputs.length; i++) {
    if( checkInputs[i].children[0].checked) {
      totalSum += parseInt(checkInputs[i].children[0].getAttribute('data-cost')) ; 
      for (k = 0; k < checkInputs.length; k++) {
        if(checkInputs[k].children[0].getAttribute("name") !== currentName && checkInputs[k].children[0].getAttribute("data-day-and-time") === currentDateTime) {
          checkInputs[k].children[0].checked = false ;
          checkInputs[k].children[0].classList.add("disabled") ;
          checkInputs[i].children[0].classList.remove("disabled") ;
        }   
      }
    } 
  }
  document.querySelector(".activities-cost").innerText = 'Total: $'+ totalSum ;
 }
)

// 7 "Payment Info" section *****************************************************
const payCol = document.querySelectorAll("#payment option") ;
for (i=0 ; i < payCol.length; i++)  {
  payCol[i].removeAttribute("selected") ;
  if (payCol[i].value==='credit-card') { payCol[i].setAttribute('selected','selected') ; } 
}

const payTop = document.querySelector("#payment") ;
payTop.addEventListener( 'change', (e) => {
  console.log(e.target.value) ;
  if(e.target.value==='credit-card') {
    document.querySelector('#credit-card').style.display='block' ;
  } else {
    document.querySelector('#credit-card').style.display='none' ;
  }
} ) ; 


// 8 Form validation *************************************************************

/**
 * this helper function acts to dispaly/remove hints. It doesnt return anything
 */
function doHinting(elem, flag) {
  flag ? elem.parentElement.classList.remove("not-valid") : elem.parentElement.classList.add("not-valid") ; 
  flag ? elem.parentElement.lastElementChild.style.display = 'none' : elem.parentElement.lastElementChild.style.display = 'block' ;
} 

/**
 * this helper function idenzifies the selected payment method
 */
function getSelectedPayment(payCol) {
  for (i=0; i < payCol.length ; i++) {
    if (payCol[i].getAttribute('selected') === 'selected') {
      var payMethodSelected = payCol[i].value ;
      break ; }  
  }
  return payMethodSelected ; 
}  

/**
 * Validation of the Name field
 */
const validateName = (elem) => {
  const nameIsValid = /^[a-z]+$/.test(elem.value);
  doHinting(elem,nameIsValid) ;
  if(/^\d$/.test(elem.value)) { // if contains numbers show different message 
   document.querySelector("#name-hint").textContent= "Name cannot contain numbers"
  } else {document.querySelector("#name-hint").textContent ="Name must contain no numbers and at least one letter"
  } 
return nameIsValid ;
}

/**
 * Validation of the Email field
 */
const validateEmail = (elem) => {
  const emailIsValid = /^\w+@\w+.com$/.test(elem.value);
  doHinting(elem,emailIsValid) ;
return emailIsValid ;
}

/**
 * Validation of the Activities 
 */
const validateActivities = (elem) => { 
 const actValid = elem.innerText !== 'Total: $0' ; 
 doHinting(elem, actValid) ;
 return actValid ; 
}

/**
 * Validation of the Credit Card info 
 */
const validateCreditCard = () => {
  var zipEl = document.querySelector("#zip") ;
  var zipElFlag = /\d{5}/.test(zipEl.value) ;
  doHinting(zipEl, zipElFlag)
 
  var ccNumEl = document.querySelector("#cc-num") ; 
  var ccNumElFlag = /^\d{13,16}$/.test(ccNumEl.value) ;
  doHinting(ccNumEl,ccNumElFlag) ;
 
  var ccCvv = document.querySelector("#cvv") ;
  var ccCvvFlag =/\d{3}/.test(ccCvv.value) ;
  doHinting(ccCvv, ccCvvFlag) ;

  return zipElFlag && ccNumElFlag && ccCvvFlag ;   
}

// The actual execution ...
const form = document.querySelector("form");

// what happens on submit event ...
form.addEventListener('submit', e => {
  var nameInput = document.querySelector("#name") ;
  var valName = validateName(nameInput) ;
  var emailInput = document.querySelector("#email") ;
  var valEmail = validateEmail(emailInput) ;
  var actInput = document.querySelector(".activities-cost") ;
  var valActivities = validateActivities( actInput ) ;
  if (getSelectedPayment(payCol) === "credit-card") {
   var valCreditCard = validateCreditCard() ;
   if (valCreditCard) {
     e.target.parentNode.removeAttribute("class") ;
   }
  } 
  if (!valName || !valEmail || !valActivities || !valCreditCard ) {
   e.preventDefault(); // this is fired when validation did not pass
  }
}) 


 // Accessibility part 1 ***********************************************

// what happens when focus changes on pressing tab or otherwise  
form.addEventListener('focusin', (e) => {     
  // since blur events dont bubble we loop over all children to remove the focus 
  for (i=0; i < checkInputs.length; i++) {
    checkInputs[i].classList.remove('focus') ;
  }
  e.target.parentElement.classList.add("focus") ;  //  focus put on the "active parent"  
}) 


// Exceedt (part, remaining is above) *******************************

// 2.1 here i use the keyup on the name input  
nameInput = document.querySelector("#name") ;
nameInput.addEventListener('keyup', e => {
  var valName = validateName(nameInput) ; 
})

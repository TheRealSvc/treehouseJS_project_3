// 3 have name focused as default after reloading *************************
document.getElementsByName("user-name")[0].focus() ;

// display only credit card  
document.querySelector('#credit-card').style.display='block' ;
document.querySelector('#paypal').style.display='none' ;
document.querySelector('#bitcoin').style.display='none' ;

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
const colorDiv = document.querySelector("div.shirt-colors") ; // hides colorSelector
colorDiv.style.visibility='hidden' ;

const elCol = document.querySelectorAll("#color option") ;
const optionSel = "data-theme" ; 

const designThemeSelector = document.querySelector("#design") ;
designThemeSelector.addEventListener('change', (e) => {
var flag = true  ;
for (i=0; i < elCol.length ; i++) {  
  if(elCol[i].getAttribute("data-theme")  === e.target.value) {    
    elCol[i].style.display = 'block' ; // that makes the option visible 
    if (flag) { elCol[i].setAttribute("selected","selected") }  ;  // that updates the visible color option to select the first match 
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
  if(e.target.value==='credit-card') {
    document.querySelector('#credit-card').style.display='block' ;
    document.querySelector('#paypal').style.display='none' ;
    document.querySelector('#bitcoin').style.display='none' ;
  } else if (e.target.value==='paypal'){
    document.querySelector('#paypal').style.display='block' ;
    document.querySelector('#credit-card').style.display='none' ;
    document.querySelector('#bitcoin').style.display='none' ;
  } else if (e.target.value==='bitcoin'){
    document.querySelector('#bitcoin').style.display='block' ;
    document.querySelector('#credit-card').style.display='none' ;
    document.querySelector('#paypal').style.display='none' ;
  }
}) ; 


// 8 Form validation *************************************************************

/**
 * this helper function acts to dispaly/remove hints. It doesn't return anything
 * In this section i deviated from setting the valid, not-valid className to the fieldset of the activity. In my opinion it looks better ...
 * at the label. The out commented lines would be used to use the fieldset. 
 */
function doHinting(elem, flag, actFlag) {
  //const actElem = document.querySelector("#activities") ;
  if(flag && !actFlag) { 
    elem.parentElement.classList.remove("not-valid") ; elem.parentElement.classList.add("valid") ;
    elem.parentElement.lastElementChild.style.display = 'block' ; elem.parentElement.lastElementChild.style.display = 'none' ;
  } else if(!flag && !actFlag) {  
    elem.parentElement.classList.remove("valid") ; elem.parentElement.classList.add("not-valid") ;
    elem.parentElement.lastElementChild.style.display = 'none' ; elem.parentElement.lastElementChild.style.display = 'block' ;
  }
  if(flag && actFlag) { 
    elem.parentElement.firstElementChild.classList.remove("not-valid") ; elem.parentElement.firstElementChild.classList.add("valid") ;
    //actElem.classList.remove("not-valid")  ; actElem.classList.add("valid")  ;
    elem.parentElement.lastElementChild.style.display = 'block' ; elem.parentElement.lastElementChild.style.display = 'none' ;
  } else if(!flag && actFlag)  {  
    elem.parentElement.firstElementChild.classList.remove("valid") ; elem.parentElement.firstElementChild.classList.add("not-valid") ;
    //actElem.classList.remove("valid")  ; actElem.classList.add("not-valid")  ;
    elem.parentElement.lastElementChild.style.display = 'none' ; elem.parentElement.lastElementChild.style.display = 'block' ;
  }  
} 

/**
 * this helper function identifies the selected payment method
 */
function getSelectedPayment(payCol) {
  for (i=1; i < payCol.length ; i++) {
    if (payCol[i].selected === true) {
      var payMethodSelected = payCol[i].value ;
      break ; }  
  }
  return payMethodSelected ; 
}  

/**
 * Validation of the Name field
 */
const validateName = (elem) => {
  const nameIsValid = /^[a-zA-Z\s]+$/.test(elem.value) ;
  doHinting(elem,nameIsValid, false) ;
  if(/^\d$/.test(elem.value)) { // if contains numbers show different message 
   document.querySelector("#name-hint").textContent= "Name cannot contain numbers"
  } else { document.querySelector("#name-hint").textContent ="Name must contain no numbers and at least one letter"
  } 
return nameIsValid ;
}

/**
 * Validation of the Email field
 */
const validateEmail = (elem) => {
  const emailIsValid = /^\w+@\w+.com$/.test(elem.value) ;
  doHinting(elem,emailIsValid, false) ;
return emailIsValid ;
}

/**
 * Validation of the Activities 
 */
const validateActivities = (elem) => { 
 const actValid = elem.innerText !== 'Total: $0' ; 
 doHinting(elem, actValid, true) ;
 return actValid ; 
}

/**
 * Validation of the Credit Card info 
 */
const validateCreditCard = () => {
  var zipEl = document.querySelector("#zip") ;
  var zipElFlag = /^\d{5}$/.test(zipEl.value) ;
  doHinting(zipEl, zipElFlag, false)
 
  var ccNumEl = document.querySelector("#cc-num") ; 
  var ccNumElFlag = /^\d{13,16}$/.test(ccNumEl.value) ;
  doHinting(ccNumEl,ccNumElFlag, false) ;
 
  var ccCvv = document.querySelector("#cvv") ;
  var ccCvvFlag =/^\d{3}$/.test(ccCvv.value) ;
  doHinting(ccCvv, ccCvvFlag, false) ;

  return zipElFlag && ccNumElFlag && ccCvvFlag ;   
}

// The actual execution follows below ... 
const form = document.querySelector("form");

// what happens on submit event ...
form.addEventListener('submit', e => {
  var nameInput = document.querySelector("#name") ;
  var valName = validateName(nameInput) ;
  var emailInput = document.querySelector("#email") ;
  var valEmail = validateEmail(emailInput) ;
  var actInput = document.querySelector(".activities-cost") ;
  var valActivities = validateActivities( actInput ) ;
  var ccSelectFlag = getSelectedPayment(payCol) === "credit-card" ;
  if (ccSelectFlag) {
   var valCreditCard = validateCreditCard() ;
   //if (valCreditCard) {
   //  e.target.parentNode.removeAttribute("class") ;
  } 
  if (!valName || !valEmail || !valActivities || (!valCreditCard && ccSelectFlag) ) {
   e.preventDefault(); // this is fired when validation did not pass
  }
}) 


 // 9 Accessibility part 1 ***********************************************

// what happens when focus changes on pressing tab or otherwise  
form.addEventListener('focusin', (e) => {     
  // since blur events dont bubble we loop over all children to remove the focus 
  for (i=0; i < checkInputs.length; i++) {
    checkInputs[i].classList.remove('focus') ;
  }
  e.target.parentElement.classList.add("focus") ;  //  focus put on the "active parent"  
}) 


// Exceed (part, remaining is above) *******************************

// 2.1 here i use the keyup on the name input  
nameInput = document.querySelector("#name") ;
nameInput.addEventListener('keyup', e => {
  var valName = validateName(nameInput) ; 
})

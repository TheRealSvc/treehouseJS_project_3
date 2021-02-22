// 3 have name focused as default after reloading 
document.getElementsByName("user-name")[0].focus() ;


// 4 job description field 
const otherJob = document.getElementById("other-job-role")
otherJob.setAttribute("type","hidden") ;
const jobDes = document.querySelector("select[id=title]")
jobDes.addEventListener('change', (e) => { if(e.target.value == "other") {
    otherJob.setAttribute("type","defaultValue") ;
    } else {  otherJob.setAttribute("type","hidden"); }
})

// 5 T-shirt Info 
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


// 6 "Register for Activities" section
const activityCheckboxes = document.querySelector("#activities-box") ;
const checkInputs = activityCheckboxes.children ;

activityCheckboxes.addEventListener( 'change', () => {
  let totalSum = 0 ;
  for (i=0; i < checkInputs.length; i++) {
    if( checkInputs[i].children[0].checked) {
      totalSum += parseInt(checkInputs[i].children[0].getAttribute('data-cost')) ;
    } 
  }
  document.querySelector(".activities-cost").innerText = 'Total: $'+ totalSum ;
}
)

// 7 "Payment Info" section
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


// 8 Form validation

// some helper functions first
/**
 * this helper function acts to dispaly/remove hints. It doesnt return anything
 */
function doHinting(elem, flag) {
  flag ? elem.parentElement.classList.remove("not-valid") : elem.parentElement.classList.add("not-valid") ; 
  flag ? elem.parentElement.lastElementChild.style.display = 'none' : elem.parentElement.lastElementChild.style.display = 'block' ;
} 

function getSelectedPayment(payCol) {
  for (i=0; i < payCol.length ; i++) {
    if (payCol[i].getAttribute('selected') === 'selected') {
      var payMethodSelected = payCol[i].value ;
      break ; }  
  }
  return payMethodSelected ; 
}  

const validateName = (elem) => {
  const nameIsValid = /^[a-z]+$/.test(elem.value);
  doHinting(elem,nameIsValid) ;
return nameIsValid ;
}

const validateEmail = (elem) => {
  const emailIsValid = /^\w+@\w+.com$/.test(elem.value);
  doHinting(elem,emailIsValid) ;
return emailIsValid ;
}

const validateActivities = (elem) => { 
 const actValid = elem.innerText !== 'Total: $0' ; 
 doHinting(elem, actValid) ;
 return actValid ; 
}

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

// The actual execution of task 8
const form = document.querySelector("form");

form.addEventListener('submit', e => {
  var nameInput = document.querySelector("#name") ;
  var valName = validateName(nameInput) ;

  var emailInput = document.querySelector("#email") ;
  var valEmail = validateEmail(emailInput) ;

  var actInput = document.querySelector(".activities-cost") ;
  var valActivities = validateActivities( actInput ) ;
  
  if (getSelectedPayment(payCol) === "credit-card") {
   var valCreditCard = validateCreditCard() ;
   if (!valCreditCard) {
     e.preventDefault(); // this is fired when one of the cc details is wrongly formatted
   } else { 
     e.target.parentNode.removeAttribute("class") ;
   }
  } 

  if (!valName || !valEmail || !valActivities) {
   e.preventDefault(); // this is fired when validation did not pass
  }
}) 

 // Accessibility part 1
activityCheckboxes.addEventListener('focusin', (e) => {   
  // since blur evets dont bubble we loop over all children to remove the focus 
  for (i=0; i < checkInputs.length; i++) {
    checkInputs[i].removeAttribute('class') ;
  }
  e.target.parentElement.classList.add("focus") ;  //  focus is added on the "active parent"  
}) 

activityCheckboxes.addEventListener('blur', (e) => {   
  e.target.parentElement.removeAttribute("focus") ;
}) 


// Exceed relevant 

// 2.1 i use the keyup on the name input  
nameInput = document.querySelector("#name") ;
nameInput.addEventListener('keyup', e => {
  var valName = validateName(nameInput) ; 
})


/* 
1)
Prevent users from registering for conflicting activities
Ideally, we want to prevent users from selecting activities that occur at the same time.

When a user selects an activity, loop over all of the activities, check if any have the same day and time as
 the activity that was just checked/unchecked, and as long as the matching activity is not the activity that was just 
 checked/unchecked, disable/enable the conflicting activity’s checkbox input and add/remove the ‘.disabled’ className
  to activity’s parent label element.

2) Real-time error message
Providing form validation error indications at the moment they occur better serves your user.
Program at least one of the required fields to listen for user interaction like a keyup. When then user interaction occurs, 
run the validation check for that input. If you created helper functions to validate the required form inputs and sections, 
you can call those helper functions inside of a field’s event listener.
Detail this specific feature in your README.md file.
Conditional error message
Providing additional information for certain types of errors can be very helpful to your user. For example, if the email address field is empty, it would be enough to inform the user that they should add an email address. But if they’ve already added an email address, but formatted it incorrectly, that message wouldn’t be helpful.

3)
For at least one required form section, provide one error message if the field fails on one of its requirements, and a separate message if it fails on one of its other requirements.
Detail this specific feature in your README.md file.
*/

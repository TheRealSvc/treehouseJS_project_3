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

/** 
 *  Data getter function 
 *  Reads data from html content. Specifically redas th eoptions data inside a selector
 *  @param  selector an collection of option elements under the selector 
 */
function getOptions(selector) {
  var label= [] ;
  var value = [] ;
  var dataTheme = [] ;
  for(i=0; i < selector.length; i++) {      
   label.push(selector[i].label) ;
   value.push(selector[i].value)  ;
   dataTheme.push(selector[i].getAttribute('data-theme')) ; // only relevant for data-theme 
   } 
   return [Value = value , Label = label , DataTheme=dataTheme] ;
}
//out = getOptions(elCol) ;
//console.log(out)

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


// 8 ## Form validation
// some helper functions first
function getSelectedPayment(payCol) {
  for (i=0; i < payCol.length ; i++) {
    if (payCol[i].getAttribute('selected') === 'selected') {
      var payMethodSelected = payCol[i].value ;
      break ; }  
  }
  return payMethodSelected ; 
}  

/*
# some stuff from the warmup
const form = document.querySelector("form");
const nameElement = document.querySelector("#name");
const email = document.querySelector("#email");
const nameValidator = () => { } 
form.addEventListener('submit', e => {
  e.preventDefault(); // this is fired when validation did not pass

*/


const validateName = (str) => {
  const nameIsValid = /^[a-z]+$/.test(str);
  nameIsValid ? console.log('korrekt') : console.log("falsch") ;
return nameIsValid ;
}


const validateEmail = (str) => {
  const emailIsValid = /^\w+@\w+.com$/.test(str);
  emailIsValid ? console.log('korrekt') : console.log("falsch") ;
return emailIsValid ;
}


const validateActivities = (str) => {
 return str=='Total: $0' ? false : true ; 
}


const validateCreditCard = () => {
  zipEl = document.querySelector("#zip") ;
  ccNumEl = document.querySelector("#cc-num") ; 
  ccCvv = document.querySelector("#cvv") ;
  return /^\d{3}$/.test(ccCvv.value) && /^\d{5}$/.test(zipEl.value) && /^\d{13-16}$/.test(ccNumEl.value)   ;   
}


//const submitButton = document.querySelector("button[type=submit]") ;
//submitButton.addEventListener('click' , () => {

const form = document.querySelector("form");

form.addEventListener('submit', e => {
var valName = validateName(document.querySelector("#name").value) ;
var valEmail = validateEmail(document.querySelector("#email").value) ;
var valActivities = validateActivities(  document.querySelector(".activities-cost").innerText ) ;

if (getSelectedPayment(payCol) === "credit-card") {
  var valCreditCard = validateCreditCard() ;
  if (!valCreditCard) {
    alert("Something is wrong with the credit card entries !") ;
  }
} 

if (!valName) {
  console.log("gspkerlb") ;
  alert("The Name wasnt spelled correctly !")
  e.preventDefault(); // this is fired when validation did not pass
}

if (!valEmail) {
  console.log("gspkerlb") ;
  alert("The Email isnt a valid adress !")
  e.preventDefault(); // this is fired when validation did not pass
}

if (!valActivities) {
  console.log("gspkerlb") ;
  alert("Please select at least one activity !")
  e.preventDefault(); // this is fired when validation did not pass
}

}) 



/*
## Form validation
Users shouldn’t be able to submit a form without the required information, or with invalid information. 
To prevent that from happening, avoid using plugins, libraries, snippets or the built-in HTML5 validation, and create your own custom form validation.

Note: Form submission behavior will differ depending on whether you’re running the project with a local server, or just viewing the files in the browser. 
It is recommended that you view the files in the browser instead of serving them locally. This helps facilitate development and testing, and this is how the project will be reviewed.

Program the form element to listen for the submit event. When the form submission is detected, each required form field or section should be validated,
 or checked to ensure that they have been filled out correctly. If any of the following required fields is not valid, the form’s submission should be prevented.

1)  The "Name" field cannot be blank or empty.

2) The "Email Address" field must contain a validly formatted email address. The email address does not need to be a real email address, just formatted like one.
 For example: dave@teamtreehouse.com. A few characters for the username, followed by "@", followed by a few more characters and a ".com" for the domain name. 
 You don’t have to account for other top-level domains, like .org, .net, etc.

3) The "Register for Activities" section must have at least one activity selected.

4) If and only if credit card is the selected payment method:
  The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces. The value does not need to be a real credit card number.
  The "Zip code" field must contain a 5 digit number.
  The "CVV" field must contain a 3 digit number.
  Project Warm Up: For some experience with the techniques you’ll use in this section, complete this short exercise - Form Input Validation.

Note:
Avoid using snippets, libraries or plugins.
Only validate the three credit card fields if "credit card" is the selected payment option.
Only call `preventDefault` on the `event` object if one or more of the required fields is invalid.
Pro Tip:A recommended approach is to create helper functions for each of the required fields to be validated. 
For example, for the "Name" field, a function could check the "Name" field’s value. If it equals an empty string or only blank spaces,
 the function could log out a helpful statement and return false. Otherwise it would return true. And then in the `submit` event listener, 
 you could call that helper function and check what it returns: if it returns false, you would prevent the form from submitting. 
Otherwise, you would avoid preventing form submission, and allow the `submit` handler to either submit or move onto checking the next required field.

*/

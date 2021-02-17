// 3 have name focused as default after reloading 
document.getElementsByName("user-name")[0].focus() ;


/* 4
"Job Role" section
The "Job Role" section has an <input type="text"> field where users can enter a custom job role. 
If the user selects "Other" in the "Job Role" drop down menu, they can enter info into the "Other job
role" text field. 
But this field should be hidden by default and only displayed once users select "Other" 
in the drop down menu, and be hidden if the user selects any other option.
Hide the "text field" with the id of "other-job-role" so it is not displayed when the form first loads.
Program the "Job Role" <select> element to listen for user changes. When a change is detected, 
display/hide the "text field" based on the user’s selection in the drop down menu.
*/

const otherJob = document.getElementById("other-job-role")
otherJob.setAttribute("type","hidden") ;

const jobDes = document.querySelector("select[id=title]")
jobDes.addEventListener('change', (e) => { if(e.target.value == "other") {
    otherJob.setAttribute("type","defaultValue")  
    } else {  otherJob.setAttribute("type","hidden"); }
})

/*
"other-job-role"

<label for="title">Job Role</label>
<select id="title" name="user-title">
  <option hidden>Select Job Role</option>
  <option value="full-stack js developer">Full Stack JavaScript Developer</option>
  <option value="front-end developer">Front End Developer</option>
  <option value="back-end developer">Back End Developer</option>
  <option value="designer">Designer</option>          
  <option value="student">Student</option>
  <option value="other">Other</option>  
</select> */
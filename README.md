
# This is project 3 of the full stack developer training

## The Task 
All the tasks are in depth explained here:
https://teamtreehouse.com/projects/interactive-form#instructions


# Some notes on each task section where i think it is helpful

## 4 job description field
Here an eventListener listens to changes in the select field. Based on the selected option ("other") , the job description field is displayed or hidden ("all the others")


## 5 T-shirt 
Basically on a change of the theme event, in a loop over all the colors, the matching colors will be set to block (displayed) or none (hidden).
The selected color is the first one that is a match by default. 
Question/Remark here: i struggled a bit. The setAttribute("selected","selected") seems weird. I guess this can be improved. Ideas welcome :-).


## 6 Activity Boxes
Main idea is, that on change a loop runs over all the checkboxes. When a box is checked two things happen:
1) The Total amount is updated 
2) (exceed) A check is performed if the new selection is identical in date-and-time with an existing checked item.If so, the checked item (of the former) is set to false and disabled properties are added or removed. The css controls what is displayed when disabled is set.    


## 7 Payment Info
Pattern similar to T-Shirt info. Same question regarding "selected".


## 8 form validation
Every validation has its own function based on regex. Two more helper function doHinting and getSelecetdPayment are in place. getSelectedPayment only return the selected payment method while doHinting only updated the hints.The main eventListener just calls all the helper functions. preventDefault is called when any of the checks didnt pass.
 In this section i deviated from setting the "valid / not-valid" className to the fieldset of the activity. In my opinion it looks better at the label. The out commented lines would be used to put the valid className on the fieldset. 

## 9 Accessibility 
In order to incease the visibility while tabbing through, a focusin event is detected on the level of the form. First all focus is removed from the checkboxes seperately, then the focus set for the parent of the current event.target.   


## Real-time Error message
The name input field was selecetd to listen on keyup events to check for errors in realtime.
The validateName function could be used out of the box as the callback function for this purpose. The eventListener can be found at the bottom of the code.


## Conditional error message
The name input field error message is now splitted in two different versions. 
If a number accpus the messgae is "Name cannot contain numbers". In all other cases a more detailed message is provided: "Name must contain no numbers and at least one letter". This is also displayed in case the field is empty, since it explains what is expected.


---
title : Submission
sidebar_position: 5
---
# Submission

## Introduction

The submission page would have an input field to put the project and a submit button to submit the project to the web so that the validator can validate the projects.

## Submitting process

For the submission process we created a file in which it would act as a template to hold the variables from the inputted and also add logic to it so that each project will be saved independently.

After creating the template on a different file, we create another file in which it would have the submission page, cause the other file is just for the template and logic.
Now, create a function to hold the data so that it could be saved.
The snippet below show some of the code of for the function. It is not complete but just fill the rest of the requirements like the template that is created.

 ```
 function SubmissionPage(props) {
    const classes = useStyles();
    const [data, setData]=useState();
    const [print, setPrint]=useState(false);
    const [projectname,setProjectName] = useState("");
```

Then, create a function to get the uploaded data. After creating the function, we move on to the submission page.
In the submission page we create a text field to put the written data like project name and such.
```
<TextField 
id="username" 
variant="outlined" 
className="name-text" 
label='Project name' 
placeholder='Project name' 
fullWidth 
required
onChange={(e) => setProjectName(e.target.value)}
/>
```
Then proceed to create the code above for each of the types in the template.

After creating those textfield its time to create an input tag for the file.
The code below is one of the applications for the input.
```
<input type="file" name="file" onChange={props.getfile}/>
```
// Default Jobs
const defaultJobs = [
  {title:"Frontend Developer", location:"Hyderabad", type:"Full Time"},
  {title:"Backend Developer", location:"Bangalore", type:"Full Time"},
  {title:"Data Analyst", location:"Remote", type:"Full Time"}
];


// ADMIN LOGIN
function checkAdmin(){
  let pass = document.getElementById("adminPass").value;
  if(pass === "admin123"){ // Quick hackathon password
    document.getElementById("adminPanel").style.display="block";
    document.getElementById("loginForm").style.display="none";
  } else {
    alert("Wrong Password");
  }
}


// ADD JOB
function addJob(){

let title = document.getElementById("jobTitle").value;
let location = document.getElementById("jobLocation").value;
let type = document.getElementById("jobType").value;
let job = {title, location, type};
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
jobs.push(job);
localStorage.setItem("jobs", JSON.stringify(jobs));
alert("Job Added Successfully!");
document.getElementById("jobTitle").value="";
document.getElementById("jobLocation").value="";
document.getElementById("jobType").value="";

}


// SHOW JOBS
window.onload=function(){

let storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];

let allJobs = [...defaultJobs,...storedJobs];

let container = document.querySelector(".job-container");

let jobCount = document.getElementById("jobCount");

if(jobCount){
jobCount.innerText = allJobs.length + " Jobs Available";
}

if(container){

allJobs.forEach(function(job){

let div = document.createElement("div");

div.classList.add("job-card");

div.innerHTML = `
<h3>${job.title}</h3>
<p>${job.location} | ${job.type}</p>
<a href="apply.html?job=${job.title}">Apply Now</a>
`;

container.appendChild(div);

});

}

// SEARCH FUNCTION
const searchInput = document.getElementById("jobSearch");

if(searchInput){

searchInput.addEventListener("keyup", function(){

let filter = searchInput.value.toLowerCase();
let jobs = document.querySelectorAll(".job-card");

jobs.forEach(function(job){

let text = job.innerText.toLowerCase();

if(text.includes(filter)){
job.style.display="block";
}else{
job.style.display="none";
}

});

});

}

}


// SAVE APPLICATION
function submitApplication(event){

event.preventDefault();

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let phone = document.getElementById("phone").value;
let position = document.getElementById("position").value;
let resume = document.getElementById("resume").files[0];

let application = {name,email,phone,position,resumeName: resume ? resume.name : "No resume uploaded"};

let applications = JSON.parse(localStorage.getItem("applications")) || [];

applications.push(application);

localStorage.setItem("applications",JSON.stringify(applications));

alert("✅ Application Submitted Successfully!");

document.querySelector(".apply-form").reset();

}
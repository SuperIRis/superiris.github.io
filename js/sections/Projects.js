"use strict";import EventfulClass from"../lib/EventfulClass.js";import{getProjects}from"../lib/Utils.js";class Projects extends EventfulClass{init(t){this.list=[],this.language=t,this.projects=getProjects(t).then(t=>{this.projects=t,this.orderDisplayByImportance(),this.setProjects()}),document.getElementById("projects-list").addEventListener("click",this.onGoToProject.bind(this))}orderDisplayByImportance(){let e=0;for(let t=0;t<this.projects.length;t++)4<(e+=this.projects[t].importance)?(e=0,this.list.push(this.getProjectByImportance(1,t)),t--):(4===e&&(e=0),this.list.push(this.projects[t]))}getProjectByImportance(r,s){for(let t=s,e=this.projects.length;t<e;t++)if(r===this.projects[t].importance)return this.projects.splice(t,1)[0]}setProjects(){this.originalProject=document.querySelector(".project:first-child"),this.originalProject.remove();var e=document.getElementById("projects-list");e.innerHTML="",e.remove();for(let t=0;t<this.list.length;t++)e.append(this.createProject(this.list[t]));document.getElementById("main-container").prepend(e)}createProject(t){var e=this.originalProject.cloneNode(!0);return e.querySelector("h1").innerHTML=t.client,e.querySelector("h2").innerHTML=t.name,e.querySelector("h3").innerHTML=t.tech,e.querySelector(".extra-info").innerHTML=t.participation,e.setAttribute("data-project",t.stringID),e.querySelector("s2")?.classList.remove("s2"),e.querySelector("s1")?.classList.remove("s1"),e.classList.add("s"+t.importance),t.images.thumb&&(e.style.backgroundImage="url(images/projects/"+t.images.thumb+")"),e}onGoToProject(t){t.preventDefault();t=t.target.closest(".project");t&&this.trigger("openProject",t.getAttribute("data-project"))}destroy(){}}const projectsSingleton=new Projects;export default projectsSingleton;
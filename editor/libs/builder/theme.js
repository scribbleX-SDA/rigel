function removejscssfile(filename, filetype) {
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist from
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
    var allsuspects = document.getElementsByTagName(targetelement)
    for(var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        if(allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1) allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}


document.getElementById("switch").addEventListener("change", ()=>{
	var switch_theme = document.getElementById("switch");
	if(switch_theme.getAttribute("curr_theme") == "light"){
		document.getElementById("switch").setAttribute("curr_theme", "dark");
        removejscssfile("css/editor.css", "css");
        var temp = document.createElement("link");
        temp.rel = "stylesheet";
        temp.href = "css/editor-dark.css";
        document.head.appendChild(temp);
        document.getElementById("logo").style.filter = "invert(15%) sepia(100%) saturate(4140%) hue-rotate(262deg) brightness(88%) contrast(118%)";
        document.querySelectorAll(".material-symbols-outlined").forEach((icon)=>{
            icon.style.color = "#6610f2";
        });
	}else{
        document.getElementById("switch").setAttribute("curr_theme", "light");
        removejscssfile("css/editor-dark.css", "css");
        var temp = document.createElement("link");
        temp.rel = "stylesheet";
        temp.href = "css/editor.css";
        document.head.appendChild(temp);
        document.getElementById("logo").style.filter = "invert(0)";
        document.querySelectorAll(".material-symbols-outlined").forEach((icon)=>{
            icon.style.color = "#000";
        });
    }
});

// document.getElementById("themeSlider").addEventListener("change", ()=>{
//     var switchTheme = document.getElementById("themeSlider");
//     if(switchTheme.getAttribute("currentTheme") == "light"){
//         switchTheme.setAttribute("currentTheme", "dark");
//         removejscssfile("css/editor.css", "css");
//         var temp = document.createElement("link");
//         temp.rel = "stylesheet";
//         temp.href = "css/editor-dark.css";
//         document.head.appendChild(temp);
//     }else{
//         switchTheme.setAttribute("currentTheme", "light");
//         removejscssfile("css/editor-dark.css", "css");
//         var temp = document.createElement("link");
//         temp.rel = "stylesheet";
//         temp.href = "css/editor.css";
//         document.head.appendChild(temp);
//     }
// });
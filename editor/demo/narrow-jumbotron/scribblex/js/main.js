var navelems = document.querySelectorAll(".navele");
var downarrs = document.querySelectorAll(".down-arrow");
var subheads = document.querySelectorAll(".subhead");
var currentMousePos = { x: -1, y: -1 };
var curr_elem = null;

navelems.forEach((e)=>{
    
    e.addEventListener("mouseover", ()=>{
        if(e.getAttribute("sub")){
            var subheads = document.getElementsByClassName("subhead");
            for(const subhead of subheads)
                subhead.style.display = "none";
            e.style.fill = "white";
            var elem_id = e.getAttribute("sub");
            if(curr_elem == null){
                curr_elem = elem_id;
                $("#"+elem_id).fadeIn(150);
                document.getElementById(elem_id).style.display = "flex";
                //console.log(document.getElementById(curr_elem).style.display);
                readMouse();
            }else{
                curr_elem = elem_id;
                document.getElementById(elem_id).style.display = "flex";
            }
        }else{
            var subheaders = document.getElementsByClassName("subhead");
            for(const subheader of subheaders){
                if(subheader.style.display != "none"){
                    subheader.style.display = "none";
                }
            }
        }
    });
});

navelems.forEach((e)=>{
    e.addEventListener("mouseout", ()=>{
        e.style.fill = "#969696";
    });
});


function readMouse(){
    let x = (event)=>{
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;

        if(currentMousePos.y > 201){
            subheads.forEach((subhead)=>{
                if(subhead.style.display != "none"){
                    $(subhead).fadeOut(150);
                }
            });
            curr_elem = null;

            document.removeEventListener("mousemove", x);
        }
    }
    document.addEventListener("mousemove", x);
}


var nav2eles = document.querySelectorAll(".nav2ele");
nav2eles.forEach((nav2ele)=>{
    nav2ele.addEventListener("click", ()=>{
        nav2eles.forEach((elem)=>{
            if(elem.classList.contains("active")){
                elem.classList.remove("active");
            }
        });
        nav2ele.classList.add("active");
        var subid = nav2ele.getAttribute("val");
        var cont_vis = document.querySelectorAll(".visible");
        cont_vis.forEach((e)=>{
            e.classList.remove("visible");
        });
        document.getElementById(subid).classList.add("visible");
    });
});


document.getElementById("menu").addEventListener("click", ()=>{
    $("#containAll").fadeOut(500);
    $("#menuContainer").fadeIn(1000);
});

document.getElementById("close").addEventListener("click", ()=>{
    $("#menuContainer").fadeOut(500);
    $("#containAll").fadeIn(500);
});
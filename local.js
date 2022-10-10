if(localStorage.getItem("loginStatus")){
    var status = localStorage.getItem("loginStatus")
    if(!JSON.parse(status)){
        location.replace("./login.html")
    }
}
else{
    location.replace("./login.html")
}
$("#right-part > a").click(()=>{
    var status = localStorage.getItem("loginStatus") ? (localStorage.getItem("loginStatus")):0
    if(JSON.parse(status)){
        localStorage.setItem("loginStatus",false)
    }
})
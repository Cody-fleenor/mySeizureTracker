/*dark mode*/
document.getElementById('toggleSwitch').addEventListener('click', toggleMode);
function toggleMode(cssFile, cssLinkIndex) {
     var checkBox = document.getElementById("toggleSwitch")
     var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
     var newlink = document.createElement("link");
     
     if (checkBox.checked == true){
     newlink.setAttribute("rel","stylesheet");
     newlink.setAttribute("type","text/css");
     newlink.setAttribute("href","./styles/white-theme.css");
     document.getElementsByTagName("head").item(0).replaceChild(newlink,oldlink);
     } else {
     newlink.setAttribute("rel","stylesheet");
     newlink.setAttribute("type","text/css");
     newlink.setAttribute("href","./styles/bootstrap.css");
     document.getElementsByTagName("head").item(0).replaceChild(newlink,oldlink);
     }
   }
   
   function printLog(){
    console.log(seizureLog)
 }

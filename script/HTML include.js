function includeHTML(active, lang) {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML(active, lang);
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
    translate()
    if (active == "home"){
        document.body.innerHTML = document.body.innerHTML.replace('header_home', 'active').replace(/actual_file/g, 'home')
    } else if (active == "creations"){
        document.body.innerHTML = document.body.innerHTML.replace('header_creations', 'active').replace(/actual_file/g, 'creations')
    } else if (active == "news"){
        document.body.innerHTML = document.body.innerHTML.replace('header_news', 'active').replace(/actual_file/g, 'news')
    }

    if (lang == "en"){
        document.body.innerHTML = document.body.innerHTML.replace('lang_en', 'active')
    } else if (lang == "fr"){
        document.body.innerHTML = document.body.innerHTML.replace('lang_fr', 'active')
    } else if (lang == "de"){
        document.body.innerHTML = document.body.innerHTML.replace('lang_de', 'active')
    }
}
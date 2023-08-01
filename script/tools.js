function includeHTML(cb) {
    var z, i, elm, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elm = z[i];
        file = elm.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {elm.innerHTML = this.responseText;}
                    if (this.status === 404) {elm.innerHTML = "Page not found.";}
                    elm.removeAttribute("w3-include-html");
                    includeHTML(cb);
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
    if (cb) cb();
}

function addClassAll(str, replace) {
    document.getElementsByClassName(str)[Symbol.iterator]().next().value.classList.add(replace)
}

function replaceAll(str, replace) {
    document.body.innerHTML = document.body.innerHTML.replace(/str/g, replace)
}

function translate(lang) {
    fetch('../assets/lang/' + lang + '.json')
        .then(response => response.json())
        .then(translations => {
            applyTranslations(translations);
        })
        .catch(err => console.error(err));
}

function applyTranslations(translations) {
    for (const key in translations) {
        if (translations.hasOwnProperty(key)) {
            const elements = getElementByKey(document, key);
            for (let i = 0; i < elements.length; i++) {
                elements[i].innerHTML += translations[key];
            }
        }
    }
}

function getElementByKey(element, key) {
    let keys = key.split(".")
    if (keys.length === 1) {
        return element.getElementsByClassName(keys[0])
    }

    let elements = [];
    const elem = element.getElementsByClassName(keys[0]);
    for (let i = 0; i < elem.length; i++) {
        elements = Array.prototype.concat.call(...elements , ...getElementByKey(elem[i], keys.slice(1).join(".")) )
    }
    return elements
}
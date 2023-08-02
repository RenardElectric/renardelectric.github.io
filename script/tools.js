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
                    console.log(this.responseText);
                    if (this.status === 200) {elm.insertAdjacentHTML("afterend", this.responseText);}
                    if (this.status === 404) {elm.insertAdjacentHTML("afterend", "<div>Page not found.</div>");}
                    elm.remove();
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
    document.getElementsByClassName(str)[Symbol.iterator]().next().value.classList.add(replace);
}

function replaceAll(str, replace) {
    document.body.innerHTML = document.body.innerHTML.replace(new RegExp("actual_file", 'g'), replace);
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
                elements[i].insertAdjacentHTML("beforeend", translations[key]);
            }
        }
    }
}

function getElementByKey(element, key) {
    let keys = key.split(".");
    if (keys.length === 1) {
        return element.getElementsByClassName(keys[0]);
    }

    let elements = [];
    const elem = element.getElementsByClassName(keys[0]);
    for (let i = 0; i < elem.length; i++) {
        elements = Array.prototype.concat.call(...elements , ...getElementByKey(elem[i], keys.slice(1).join(".")));
    }
    return elements;
}

function getLang() {
    let userLanguages = navigator.languages;
    userLang = "en";
    for (let i = 0; i < userLanguages.length; i++) {
        if (userLanguages[i].split("-")[0] in ["en", "fr", "de"]) {
            var userLang = userLanguages[i].split("-")[0];
            break;
        }
    }
    return userLang;
}

function addMetaDatas() {
    addMeta("theme-color", "rgb(75, 75, 75)");
    addMeta("color-scheme", "dark");
    addMeta("viewport", "width=device-width, initial-scale=1");
    addMeta("author", "RenardElectric");
    addMeta("application-name", "RenardElectric's Website");
}

function addMeta(name, content) {
    var meta = document.createElement('meta');
    meta.name = name;
    meta.content = content;
    document.getElementsByTagName('head')[0].appendChild(meta);
}
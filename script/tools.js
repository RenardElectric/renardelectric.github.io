function includeHTML(cb) {
    var z, i, elm, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elm = z[i];
        file = elm.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = (function(elmCopy, fileCopy) {
                return function() {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            let parser = new DOMParser();
                            const doc = parser.parseFromString(this.responseText, 'text/html');
                            document.head.insertAdjacentHTML("beforeend", doc.head.innerHTML);
                            elmCopy.insertAdjacentHTML("afterend", doc.body.innerHTML);
                            if (fileCopy === "../assets/components/home_comp.html") {
                                setHome();
                            } else if (fileCopy === "../assets/components/creations_comp.html") {
                                setCreations();
                            } else if (fileCopy === "../assets/components/news_comp.html") {
                                setNews();
                            }
                        } else if (this.status === 404) {
                            elmCopy.insertAdjacentHTML("afterend", "<div>Page not found.</div>");
                        }
                        elmCopy.remove();
                        includeHTML(cb);
                    }
                };
            })(elm, file)
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
    if (cb) cb();
}

function setHome() {
    fetch('../assets/content/manifest.json')
        .then(response => response.json())
        .then(contents => {
            const newestContent = getNewestContents(contents);
            for (let i = 0; i < newestContent.length; i++) {

                if (i === 0) {
                    document.getElementsByClassName("content")[0].insertAdjacentHTML("beforeend",
                        `<span class="section latest_updates"></span>`
                    );
                }

                placeContent(newestContent[i][0], newestContent[i][1], newestContent[i][2])
            }

            const creationsKeys = Object.keys(contents["creations"]);
            const newsKeys = Object.keys(contents["news"]);

            for (let i = 0; i < Math.min(2, creationsKeys.length); i++) {
                if (i === 0) {
                    document.getElementsByClassName("content")[0].insertAdjacentHTML("beforeend",
                        `<span class="section new_creations"></span>`
                    );
                }
                placeContent(creationsKeys[i], contents["creations"][creationsKeys[i]], "creations")
            }

            for (let i = 0; i < Math.min(2, newsKeys.length); i++) {
                if (i === 0) {
                    document.getElementsByClassName("content")[0].insertAdjacentHTML("beforeend",
                        `<span class="section latest_news"></span>`
                    );
                }
                placeContent(newsKeys[i], contents["news"][newsKeys[i]], "news")
            }

            if (creationsKeys.length + newsKeys.length === 0){
                document.getElementsByClassName("content")[0].insertAdjacentHTML("beforeend",
                    `<span class="section nothing_here"></span>`
                );
            }

        })
        .catch(err => console.error(err));
}

function setCreations() {
    fetch('../assets/content/manifest.json')
        .then(response => response.json())
        .then(contents => {
            let i = 0;
            for (const key in contents["creations"]) {
                i++;
                if (i === 1) {
                    document.getElementsByClassName("content")[0].insertAdjacentHTML("beforeend",
                        `<span class="section new_creations"></span>`
                    );
                } else if (i === 3) {
                    document.getElementsByClassName("content")[0].insertAdjacentHTML("beforeend",
                        `<span class="section other_creations"></span>`
                    );
                }
                placeContent(key, contents["creations"][key], "creations")
            }

            if (Object.keys(contents["creations"]).length === 0){
                document.getElementsByClassName("content")[0].insertAdjacentHTML("beforeend",
                    `<span class="section nothing_here"></span>`
                );
            }

        })
        .catch(err => console.error(err));
}

function setNews() {
    fetch('../assets/content/manifest.json')
        .then(response => response.json())
        .then(contents => {
            let i = 0;
            for (const key in contents["news"]) {
                i++;
                if (i === 1) {
                    document.getElementsByClassName("content")[0].insertAdjacentHTML("beforeend",
                        `<span class="section latest_news"></span>`
                    );
                } else if (i === 3) {
                    document.getElementsByClassName("content")[0].insertAdjacentHTML("beforeend",
                        `<span class="section other_news"></span>`
                    );
                }
                placeContent(key, contents["news"][key], "news")
            }

            if (Object.keys(contents["news"]).length === 0){
                document.getElementsByClassName("content")[0].insertAdjacentHTML("beforeend",
                    `<span class="section nothing_here"></span>`
                );
            }

        })
        .catch(err => console.error(err));
}

function placeContent(name, content, type) {
    let infos = "creation";
    if (content.hasOwnProperty("fixed_infos") && content.fixed_infos) {
        infos = "creation_fixed";
    }

    let left_header = "";
    if (content.hasOwnProperty("has_left_header") && content.has_left_header) {
        left_header = '<span class="header_left"></span>';
    }

    let right_header = "";
    if (content.hasOwnProperty("has_right_header") && content.has_right_header) {
        right_header = '<span class="header_right"></span>';
    }

    document.getElementsByClassName("content")[0].insertAdjacentHTML("beforeend", `
        <a href="${type}/${name}" class="${infos} ${name}">
            ${left_header}
            ${right_header}
            <img class="picture" alt="${name} picture" src="../assets/content/${type}/${name}/picture.png">
            <span class="infos">
                <span class="name"></span>
                <span class="short_desc"></span>
            </span>
        </a>
    `);
}

function getNewestContents(contents) {
    let newest = [];
    const creationsKeys = Object.keys(contents["creations"]);
    const newsKeys = Object.keys(contents["news"]);

    for (let i = 0; i < Math.min(2, newsKeys.length); i++) {
        newest.push([creationsKeys[i], contents["creations"][creationsKeys[i]], "creations"])
    }

    let news;
    let creation;
    for (let i = 0; i < Math.min(2, newsKeys.length); i++) {
        news = contents["news"][newsKeys[i]];
        if (news.hasOwnProperty("date")) {
            for (let j = i; j < newest.length; j++) {
                creation = newest[j][1];
                if (creation.hasOwnProperty("date")) {
                    if (news.date <= creation.date) {
                        continue;
                    }
                }
                newest.splice(j, 0, [newsKeys[i], news, "news"]);
                newest.pop();
                break;
            }
        }
    }
    return newest;
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
        const elements = getElementByKey(document, key);
        for (let i = 0; i < elements.length; i++) {
            elements[i].insertAdjacentHTML("beforeend", translations[key]);
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
        let e = getElementByKey(elem[i], keys.slice(1).join("."))
        if (e.length !== 0) {
            elements = Array.prototype.concat.call(...elements , ...e);
        }
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
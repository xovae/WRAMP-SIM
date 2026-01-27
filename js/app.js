window.levelSelect = () =>
{
    let pathName = window.location.pathname;

    //Account for the edge case of the main page not having a path name
    let levelID = (pathName == "/") ? "sandbox" : pathName.substring(1);
    let level = (levelID == "sandbox") ? document.querySelector('a[href="/"') : document.querySelector('a[href="/' + levelID + '"]')

    //Highlight the link as active, and set aria-active to the current link
    level.classList.add('active');
    level.setAttribute('aria-current', 'page');
}

window.levelCheck = () =>
{
    //Get all <a> tags that link to another level
    const levelElements = document.querySelectorAll('a.nav-link');

    for (let i = 0; i < levelElements.length; i++)
    {
        href = levelElements[i].pathname.substring(1);
        if (localStorage.getItem(href) != null)
        {
            //Show the checkmark
            checkmarkID = href + 'Checkmark';
            let checkmark = document.getElementById(checkmarkID);
            checkmark.style.opacity = 1;

            //Change to white for the currently selected level
            if (levelElements[i].classList.contains('active')) checkmark.style.color = 'white';
        }
    }
}

window.codeSaved = true;

window.saveCode = async () =>
{
    code = document.getElementById('wsimCode').innerHTML;
    code = code.replaceAll('<br>', '\n');
    code = code.replaceAll('&emsp;', '\t')
    saveFile(code, 'code.s');
}

window.saveFile = async (content, name) =>
{
    const file = new Blob([content], { type: 'text/plain' });

    const link = document.createElement('a');
    link.download = name;
    link.href = URL.createObjectURL(file);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    codeSaved = true;
}

window.addEventListener('beforeunload', function (e) {
    if (codeSaved == false)
    {
        triggerPopover('Save your Blockly workspace or WRAMP code first!');
        e.preventDefault();
    }
});

window.checkCodeSaved = () =>
{
    return codeSaved;
}

window.quacker = () =>
{
    let audio = document.getElementById('duckQuack');
    audio.play();
}

window.objectiveCheck = (id) =>
{
    const checkmark = document.getElementById(id);
    if (!checkmark) return;

    if (!checkmark.classList.contains('visible'))
    {
        checkmark.classList.add('visible');
        document.getElementById('duckQuack')?.play();
    }
}

window.objectiveUncheck = (id) =>
{
    const checkmark = document.getElementById(id);
    if (!checkmark) return;

    if (checkmark.classList.contains('visible'))
    {
        checkmark.classList.remove('visible');
        document.getElementById('kcauQkcud')?.play();
    }
}

window.objectiveUncheckAll = () =>
{
    const checkmarks = document.getElementsByClassName('inputCheckmark');

    for (let i = 0; i < checkmarks.length; i++) {
        id = checkmarks[i].id;
        objectiveUncheck(id);
    }
}

window.levelCompleted = () =>
{
    id = window.location.pathname.substring(1);
    localStorage.setItem(id, true);
    levelCheck();
}

var popover;

window.triggerPopover = (error) =>
{
    var popoverElement = document.getElementById('compileButton');
    popoverElement.setAttribute('data-bs-content', error);
    popover = new bootstrap.Popover(popoverElement);
    popover.show();
}

window.clearPopovers = () =>
{
    document.querySelectorAll('.popover').forEach(popoverElement => {
        popoverElement.remove();
    });
}

window.initPopper = () =>
{
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}

const htmlElement = document.documentElement;

window.switchTheme = () =>
{
    const theme = htmlElement.getAttribute('data-bs-theme');

    //Flip theme to opposite
    if (theme == 'light' || theme == 'null')
    {
        setTheme('dark');
    }
    else
    {
        setTheme('light');
    }
}

window.setTheme = (themeType) =>
{
    const imgElement = document.getElementById('themeSwitcher');
    const imgName = 'img/' + themeType + '.svg';

    htmlElement.setAttribute('data-bs-theme', themeType);
    localStorage.setItem('theme', themeType);
    switchBlocklyTheme(themeType);
    imgElement.src = imgName;
}

window.initTheme = () =>
{
    const theme = htmlElement.getAttribute('data-bs-theme');
    const imgElement = document.getElementById('themeSwitcher');
    const imgName = 'img/' + theme + '.svg';
    if (theme != 'null')
    {
        imgElement.src = imgName;
    }
    else
    {
        imgElement.src = 'img/light.svg';
    }

}

window.changeFormat = (id) =>
{
    const decimalRegexPattern = /^-?(6[0-5]{2}[0-3][0-5]|[1-5][0-9]{4}|[1-9][0-9]{0,3}|0)$/;
    const hexRegexPattern = /^0x[0-9a-fA-F]{1,4}$/;
    const binaryRegexPattern = /^[0-1]{16}$/;

    let element = document.getElementById(id);
    let value = element.innerText;

    //0: Decimal, 1: Hex, 2: Binary
    if (decimalRegexPattern.test(value)) format = 0;
    if (hexRegexPattern.test(value)) format = 1;
    if (binaryRegexPattern.test(value)) format = 2;
    format = (format + 1) % 3;

    switch(format)
    {
        case 0:
            element.innerText = parseInt(value, 2);
            break;
        case 1:
            element.innerText = '0x' + parseInt(value).toString(16);
            break;
        case 2:
            element.innerText = parseInt(value).toString(2).padStart(16, '0');
            break;
    }
}

window.visualiseInstruction = (type) =>
{

}
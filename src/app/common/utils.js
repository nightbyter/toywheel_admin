var utils = {
    getLang: function () {
        var mapLang = {
            "en": true,
            "de": true
        };
        var currentLang = (window.navigator.userLanguage || window.navigator.language).split("-")[0];
        return mapLang[currentLang] ? currentLang : "en";
    }
};
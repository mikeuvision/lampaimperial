(function () {
    let themes = {
        "Imperial Orchestra": {
            background: "#0b0b0d",       // глубокий тёмный фон
            text: "#f5f1e6",             // светлый текст (слоновая кость)
            accent: "#d4af37",           // золотой акцент
            fontFamily: "serif",         // шрифт с засечками
            fontSize: "18px"
        },
        "Dark Blue": {
            background: "#0a0f24",
            text: "#ffffff",
            accent: "#1e90ff",
            fontFamily: "sans-serif",
            fontSize: "18px"
        },
        "Light Cream": {
            background: "#f8f5e9",
            text: "#333333",
            accent: "#e67e22",
            fontFamily: "serif",
            fontSize: "18px"
        }
    };

    function applyTheme(theme) {
        if (!theme) return;
        let css = `
            body {
                background-color: ${theme.background} !important;
                color: ${theme.text} !important;
                font-family: ${theme.fontFamily} !important;
                font-size: ${theme.fontSize} !important;
            }
            .card, .selector {
                background-color: ${theme.background} !important;
                color: ${theme.text} !important;
                border: 1px solid ${theme.accent}55 !important;
            }
            .accent, .active {
                color: ${theme.accent} !important;
            }
            .menu__item--active {
                background-color: ${theme.accent}22 !important;
                border-left: 3px solid ${theme.accent} !important;
            }
        `;

        let styleTag = document.getElementById("theme-customizer-style");
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = "theme-customizer-style";
            document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = css;
    }

    function showThemeMenu() {
        let keys = Object.keys(themes);
        Lampa.Select.show({
            title: "Выберите тему оформления",
            items: keys.map(name => ({ title: name, theme: themes[name] })),
            onSelect: (a) => {
                Lampa.Storage.set("theme_customizer.current", a.title);
                applyTheme(a.theme);
            },
            onBack: () => {
                Lampa.Controller.toggle("content");
            }
        });
    }

    function init() {
        // Кнопка в меню «Приложения»
        Lampa.Api.addPlugin({
            title: "Theme Customizer",
            description: "Расширенные темы оформления",
            onSelect: showThemeMenu
        });

        // Автоприменение последней выбранной темы
        let saved = Lampa.Storage.get("theme_customizer.current", false);
        if (saved && themes[saved]) {
            applyTheme(themes[saved]);
        }
    }

    init();
})();

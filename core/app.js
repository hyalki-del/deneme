const AppEngine = {
    config: null,

    async init() {
        try {
            const response = await fetch('./config.json?t=' + new Date().getTime());
            if (!response.ok) throw new Error("config.json okunamadı");
            
            this.config = await response.json();
            this.applyTheme(this.config.themeLayout || 'apple-pro');
            this.injectGroupData();

            return this.config;
        } catch (err) {
            console.warn("AppEngine varsayılan modda çalışıyor:", err);
            this.applyTheme('apple-pro');
        }
    },

    applyTheme(themeKey) {
        const body = document.body;
        body.classList.remove('theme-apple-pro', 'theme-marvel-hero', 'theme-cyber-fusion');
        body.classList.add(`theme-${themeKey}`);
    },

    injectGroupData() {
        if (!this.config) return;
        if (this.config.bandName) {
            document.title = `${this.config.bandName} - Band Engine`;
            document.querySelectorAll('.band-name-text').forEach(el => {
                el.textContent = this.config.bandName;
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AppEngine.init();
});

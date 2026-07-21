const AppEngine = {
    config: null,

    async init() {
        try {
            // Cache-Busting: İstek sonuna zaman damgası ekleyerek tarayıcı önbelleğini kırıyoruz
            const response = await fetch('./config.json?t=' + new Date().getTime());
            
            if (!response.ok) {
                throw new Error(`HTTP hatası! Durum: ${response.status}`);
            }
            
            this.config = await response.json();
            
            // Temayı uygula
            this.applyTheme(this.config.themeLayout || 'apple-pro');
            
            // DOM elemanlarına veriyi bas
            this.injectGroupData();

            return this.config;
        } catch (err) {
            console.error("[AppEngine Error] config.json yüklenemedi:", err);
            // Varsayılan koruyucu tema
            this.applyTheme('apple-pro');
            return null;
        }
    },

    applyTheme(themeKey) {
        const body = document.body;
        body.classList.remove('theme-apple-pro', 'theme-marvel-hero', 'theme-cyber-fusion');
        body.classList.add(`theme-${themeKey}`);
    },

    injectGroupData() {
        if (!this.config) return;

        // Grup Adını Güncelle
        if (this.config.bandName) {
            document.title = `${this.config.bandName} - Band Engine`;
            document.querySelectorAll('.band-name-text').forEach(el => {
                el.textContent = this.config.bandName;
            });
        }
    }
};

// DOM Yüklendiğinde Otomatik Başlat
document.addEventListener('DOMContentLoaded', () => {
    AppEngine.init();
});

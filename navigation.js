document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const insertNavigation = () => {
        const header = document.querySelector('header');
        if (!header) return;

        // navContent変数: ナビゲーションとフッターのHTML構造
        const navContent = `
            <nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" aria-label="Menu Toggle" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu-list" class="nav-list">
                        <li><a href="index.html">ホーム</a></li>
                        <li><a href="train-news.html">Train-News (鉄道)</a></li>  <-- ★リンク1★
                        <li><a href="mission.html">活動理念</a></li>
                        <li><a href="#">沿革</a></li>
                        <li><a href="operator-info.html">運営者情報</a></li>
                        
                        <li class="dropdown">
                            <a href="#">ご利用案内 <span class="dropdown-arrow">▼</span></a>
                            <ul class="dropdown-menu">
                                <li><a href="train-news.html">Train-News (鉄道)</a></li> <-- ★リンク2★
                                <li><a href="general-news.html">お知らせ全般</a></li>       <-- ★リンク3★
                                <li><a href="#">写真記録</a></li>
                                <li><a href="contact.html">お問い合わせ</a></li>
                                <li><a href="#">よくある質問</a></li>
                                <li><a href="#">SNS/外部リンク</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        `;
        header.innerHTML += navContent;
    };

    const insertFooter = () => {
        const footerElement = document.createElement('div');
        footerElement.innerHTML = `
            <div class="footer-links">
                <a href="index.html">ホーム</a> |
                <a href="mission.html">活動理念</a> |
                <a href="#">沿革</a> |
                <a href="operator-info.html">運営者情報</a> |
                <a href="train-news.html">Train-News</a> |
                <a href="general-news.html">お知らせ</a> | <-- ★リンク4★
                <a href="contact.html">お問い合わせ</a>
            </div>
            <footer>
                運営：篠ノ井乗務区
                <p>&copy; 2025 篠ノ井乗務区 All Rights Reserved.</p>
                <p class="copyright-note">本サイトに掲載の文章・画像・データの無断転載を禁じます。</p>
            </footer>
        `;
        document.body.appendChild(footerElement);
    };

    const highlightActiveLink = () => {
        document.querySelectorAll('a').forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    };

    // プリローダーの非表示処理は load_news.js に委譲します
    const startPreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // プログレスバー風のテキスト更新
            let progress = 0;
            const interval = setInterval(() => {
                progress += 20;
                const loadingText = document.getElementById('loading-text');
                if (loadingText) loadingText.textContent = `読み込み中... ${Math.min(progress, 90)}%`; // 90%で止めておく
                
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 200);
        }
    };
    
    // 5. 実行
    insertNavigation();
    insertFooter();
    highlightActiveLink(); 
    startPreloader(); // プリローダーを動かし始める
});
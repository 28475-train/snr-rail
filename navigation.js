document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const insertNavigation = () => {
        // ヘッダー要素を確実に取得
        const header = document.querySelector('header');
        
        // ヘッダーが見つからなかった場合は処理を中断し、エラーをコンソールに出力
        if (!header) {
            console.error("Error: Header element (<header>) not found. Cannot insert navigation.");
            return;
        }

        const navContent = `
            <nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" aria-label="Menu Toggle" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu-list" class="nav-list">
                        <li><a href="index.html">ホーム</a></li>
                        <li><a href="train-news.html">Train-News (鉄道)</a></li>
                        <li><a href="mission.html">活動理念</a></li>
                        <li><a href="#">沿革</a></li>
                        <li><a href="operator-info.html">運営者情報</a></li>
                        
                        <li class="dropdown">
                            <a href="#">ご利用案内 <span class="dropdown-arrow">▼</span></a>
                            <ul class="dropdown-menu">
                                <li><a href="train-news.html">Train-News (鉄道)</a></li>
                                <li><a href="general-news.html">お知らせ全般</a></li>
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
        
        // headerのinnerHTMLに、既存のコンテンツ（<h1>）を残しつつナビゲーションを追加
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
                <a href="general-news.html">お知らせ</a> |
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

    // プリローダーを即座に非表示にする処理
    const startPreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none'; 
        }
    };
    
    // 5. 実行
    insertNavigation(); // ナビゲーションをヘッダーに挿入
    insertFooter();
    highlightActiveLink(); 
    startPreloader(); 
});
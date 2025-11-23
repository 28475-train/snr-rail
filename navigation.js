// navigation.js (一部抜粋 - navContent変数内を修正)

const navContent = `
    <nav role="navigation">
        <div id="menuToggle">
            <input type="checkbox" aria-label="Menu Toggle" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu-list" class="nav-list">
                <li><a href="index.html">ホーム</a></li>
                <li><a href="train-news.html">Train-News (鉄道)</a></li>  <-- ★ここを修正★
                <li><a href="mission.html">活動理念</a></li>
                <li><a href="#">沿革</a></li>
                <li><a href="operator-info.html">運営者情報</a></li>
                
                <li class="dropdown">
                    <a href="#">ご利用案内 <span class="dropdown-arrow">▼</span></a>
                    <ul class="dropdown-menu">
                        <li><a href="train-news.html">Train-News (鉄道)</a></li> <-- ★ここを修正★
                        <li><a href="general-news.html">お知らせ全般</a></li>     <-- ★ここを追加★
                        <li><a href="#">写真記録</a></li>
                        <li><a href="contact.html">お問い合わせ</a></li>
                        <li><a href="#">よくある質問</a></li>
                        <li><a href="#">SNS/外部リンク</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
    <div class="footer-links">
        <a href="index.html">ホーム</a> |
        <a href="mission.html">活動理念</a> |
        <a href="#">沿革</a> |
        <a href="operator-info.html">運営者情報</a> |
        <a href="train-news.html">Train-News</a> |
        <a href="general-news.html">お知らせ</a> | <-- ★ここを修正★
        <a href="contact.html">お問い合わせ</a>
    </div>
    <footer>
        運営：篠ノ井乗務区
        <p>&copy; 2025 篠ノ井乗務区 All Rights Reserved.</p>
        <p class="copyright-note">本サイトに掲載の文章・画像・データの無断転載を禁じます。</p>
    </footer>
`;
// ... 後略
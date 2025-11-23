// navigation.js (最新のレスポンシブ対応、活動理念ページ対応版)

// ----------------------------------------------------
// 1. ナビゲーションとフッターのHTML構造を定義
// ----------------------------------------------------

// ナビゲーションのHTML構造
const navContent = `
    <nav class="global-nav">
        <button class="menu-toggle" aria-expanded="false" aria-controls="menu-list">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
        
        <ul id="menu-list" class="nav-list">
            <li><a href="index.html">ホーム</a></li>
            <li><a href="train-news.html">Train-News</a></li>
            <li><a href="mission.html">活動理念</a></li> 
            <li><a href="#">沿革</a></li>
            <li><a href="#">運営者情報</a></li>
            
            <li class="dropdown">
                <a href="#" class="dropdown-toggle">ご利用案内</a> 
                <ul class="dropdown-menu">
                    <li><a href="#">ご利用規約</a></li>
                    <li><a href="#">免責事項</a></li>
                    <li><a href="#">プライバシーポリシー</a></li>
                </ul>
            </li>

            <li><a href="#">お知らせ</a></li>
            <li><a href="#">写真記録</a></li>
            <li><a href="#">問い合わせ</a></li>
            
            <li class="dropdown">
                <a href="#" class="dropdown-toggle">その他</a> 
                <ul class="dropdown-menu">
                    <li><a href="#">よくある質問</a></li>
                    <li><a href="#">SNS/外部リンク</a></li>
                    <li><a href="#">サイトマップ</a></li>
                </ul>
            </li>
        </ul>
    </nav>
`;

// フッターのHTML構造 (ロゴ画像リンクを含む)
const footerContent = `
    <footer>
        <p>運営：篠ノ井乗務区</p>
        <p>&copy; 2025 篠ノ井乗務区 All Rights Reserved. 本サイトに掲載の文章・画像・データの無断転載を禁じます。</p>
        
        <p class="official-badge">
            <a href="https://sites.google.com/view/shinonoi-snr-official/top" target="_blank">
                <img src="image_dbd00c.jpg" alt="SHINORAIL OFFICIAL SITE 公式外部サイト" class="footer-badge-img">
            </a>
        </p>
    </footer>
`;


// ----------------------------------------------------
// 2. 挿入機能とイベントリスナーの追加
// ----------------------------------------------------

function insertNavigation() {
    const header = document.querySelector('header');
    if (header) {
        const h1 = header.querySelector('h1');
        if (h1) {
            h1.insertAdjacentHTML('afterend', navContent);
            setupMenuToggle(); // ハンバーガーメニューのイベントを設定
        }
    }
}

function setupMenuToggle() {
    const toggleButton = document.querySelector('.menu-toggle');
    const menuList = document.getElementById('menu-list');

    if (toggleButton && menuList) {
        // メニュー開閉 (ハンバーガー)
        toggleButton.addEventListener('click', () => {
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
            toggleButton.setAttribute('aria-expanded', !isExpanded);
            menuList.classList.toggle('is-open'); // メニューを開閉するクラスをトグル
        });
    }
}

function insertFooter() {
    const body = document.querySelector('body');
    if (body) {
        // body内の最後の要素としてフッターを挿入
        body.insertAdjacentHTML('beforeend', footerContent);
    }
}

// ----------------------------------------------------
// 3. プリローダー（ローディングアニメーション）制御機能
// ----------------------------------------------------
function startPreloader() {
    const loadingText = document.getElementById('loading-text');
    const preloader = document.getElementById('preloader');
    
    let percentage = 0;
    
    // 90%まではスムーズに進めるタイマー
    const interval = setInterval(() => {
        if (percentage < 90) { 
            percentage += 3;
            if (loadingText) {
                loadingText.textContent = `読み込み中... ${percentage}%`;
            }
        } else {
            clearInterval(interval); 
        }
    }, 100); 

    // すべてのコンテンツとリソースが読み込まれたとき (load) に実行
    window.addEventListener('load', () => {
        // 90%から100%まで急に進めるタイマー
        const finalInterval = setInterval(() => {
            if (percentage < 100) {
                percentage += 1;
                if (loadingText) {
                    loadingText.textContent = `読み込み中... ${percentage}%`;
                }
            } else {
                clearInterval(finalInterval);
                
                // 100%に達したら、プリローダーを非表示にする
                if (preloader) {
                    preloader.classList.add('hidden');
                }
            }
        }, 50); 
    });
}


// ----------------------------------------------------
// 4. 検索機能
// ----------------------------------------------------
window.searchSite = function() { // HTMLから呼び出すため、windowオブジェクトに設定
    const input = document.getElementById('search-input');
    const resultsDiv = document.getElementById('search-results');
    const query = input.value.toLowerCase().trim();

    if (query.length < 2) {
        resultsDiv.innerHTML = '<p>検索キーワードは2文字以上で入力してください。</p>';
        return;
    }

    // 検索インデックスファイル（search_index.json）を読み込む
    fetch('search_index.json')
        .then(response => response.json())
        .then(data => {
            let resultsHtml = '';
            const matchingResults = data.filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.keywords.toLowerCase().includes(query)
            );

            if (matchingResults.length > 0) {
                resultsHtml += `<h3>検索結果 (${matchingResults.length}件)</h3><ul>`;
                matchingResults.forEach(item => {
                    resultsHtml += `<li><a href="${item.url}">${item.title}</a></li>`;
                });
                resultsHtml += '</ul>';
            } else {
                resultsHtml = '<p>一致するページは見つかりませんでした。</p>';
            }
            resultsDiv.innerHTML = resultsHtml;
        })
        .catch(error => {
            console.error('検索インデックスの読み込みに失敗しました:', error);
            resultsDiv.innerHTML = '<p>検索中にエラーが発生しました。</p>';
        });
}

// ----------------------------------------------------
// 5. 実行
// ----------------------------------------------------
insertNavigation();
insertFooter();
startPreloader();
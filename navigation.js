// navigation.js (ナビゲーション、フッター、プリローダー、検索ロジックを統合)

// ----------------------------------------------------
// 1. ナビゲーションとフッターのHTML構造を定義
// ----------------------------------------------------

// ナビゲーションのHTML構造
const navContent = `
    <nav class="global-nav">
        <a href="index.html">ホーム</a>
        <a href="train-news.html">Train-News</a> 
        <a href="#">活動理念</a>
        <a href="#">沿革</a>
        <a href="#">運営者情報</a>
        <a href="#">ご利用案内</a> 
        <a href="#">お知らせ</a> 
        <a href="#">写真記録</a>
        <a href="#">問い合わせ</a>
        <a href="#">その他</a> 
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
// 2. 挿入機能
// ----------------------------------------------------

function insertNavigation() {
    const header = document.querySelector('header');
    if (header) {
        const h1 = header.querySelector('h1');
        if (h1) {
            h1.insertAdjacentHTML('afterend', navContent);
        }
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
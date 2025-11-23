document.addEventListener('DOMContentLoaded', () => {
    // 現在のページURLからファイル名を取得
    const currentPage = window.location.pathname.split('/').pop();

    let newsListElement;
    let filterType;
    let titleElement; // プリローダーの進捗テキスト要素

    // どのページのリスト要素を取得し、どのタイプの記事をフィルタリングするかを設定
    if (currentPage === 'train-news.html') {
        newsListElement = document.getElementById('train-news-list');
        filterType = 'rail'; // 電車関連
    } else if (currentPage === 'general-news.html') {
        newsListElement = document.getElementById('general-news-list');
        filterType = 'general'; // その他
    } else {
        // お知らせページ以外では処理しない
        return;
    }

    if (!newsListElement) {
        // 要素がHTML内に見つからない場合、コンソールにエラーを出して処理を停止
        console.error(`Error: News list element not found for ${currentPage}.`);
        return;
    }

    // JSONファイルを読み込む関数
    const loadNews = async () => {
        try {
            // news_data.jsonを非同期でフェッチ
            const response = await fetch('news_data.json');
            
            if (!response.ok) {
                // ファイルが見つからない、またはサーバーエラーの場合
                throw new Error(`お知らせデータの読み込みに失敗 (HTTP Status: ${response.status})。ファイルパスを確認してください。`);
            }
            
            // JSONのパースを試みる
            const newsData = await response.json();
            
            // 1. データを日付で降順ソート
            newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

            // 2. ページタイプに基づいてデータをフィルタリング
            const filteredNews = newsData.filter(item => item.type === filterType);

            newsListElement.innerHTML = ''; // "読み込み中"メッセージをクリア

            if (filteredNews.length === 0) {
                newsListElement.innerHTML = `<p style="text-align:center;">現在、該当するお知らせはありません。</p>`;
                return;
            }

            // 3. フィルタリングされたデータを基にHTMLを生成
            filteredNews.forEach(item => {
                const article = document.createElement('article');
                article.className = `news-article ${item.isImportant ? 'important' : ''}`;
                article.id = item.id; 

                article.innerHTML = `
                    <span class="news-category">【${item.category}】</span>
                    <h2>${item.title}</h2>
                    <span class="news-date">公開日: ${item.date}</span>
                    <div class="news-content">
                        ${item.content}
                    </div>
                    <hr>
                `;
                newsListElement.appendChild(article);
            });

        } catch (error) {
            console.error("お知らせデータの処理中にエラーが発生しました:", error);
            // 読み込み失敗時にエラーメッセージを表示
            newsListElement.innerHTML = `<p style="color:red; text-align:center;">
                データの読み込みまたは表示中にエラーが発生しました。<br>
                詳細: ${error.message || 'JSONファイルに構文エラーがある可能性があります。'}
            </p>`;
        }
    };

    // loadNewsを実行し、読み込み完了後にプリローダーを非表示にする
    loadNews().then(() => {
        // 読み込みが成功しても失敗しても、プリローダーの非表示処理は実行する
        const preloader = document.getElementById('preloader');
        const loadingText = document.getElementById('loading-text');

        if (loadingText) loadingText.textContent = '読み込み完了... 100%';
        
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
            }
        }, 500); 
    });
});
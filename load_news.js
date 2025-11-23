document.addEventListener('DOMContentLoaded', () => {
    // 現在のページURLからファイル名を取得
    const currentPage = window.location.pathname.split('/').pop();

    let newsListElement;
    let filterType;

    // 現在のページに応じて、挿入する要素とフィルターするタイプを設定
    if (currentPage === 'train-news.html') {
        newsListElement = document.getElementById('train-news-list');
        filterType = 'rail'; // 電車関連
    } else if (currentPage === 'general-news.html') {
        newsListElement = document.getElementById('general-news-list');
        filterType = 'general'; // その他
    } else {
        // index.htmlなど、お知らせページ以外では実行しない
        return;
    }

    if (!newsListElement) return; // 要素がない場合は終了

    const loadNews = async () => {
        try {
            const response = await fetch('news_data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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
                article.id = item.id; // ページ内リンク用にIDを設定

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
            console.error("Failed to load news data:", error);
            newsListElement.innerHTML = `<p style="color:red; text-align:center;">
                お知らせデータの読み込みに失敗しました。
            </p>`;
        }
    };

    loadNews();
});
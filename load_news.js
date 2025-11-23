document.addEventListener('DOMContentLoaded', () => {
    // お知らせを挿入する要素
    const newsListElement = document.getElementById('news-list');

    // JSONファイルを読み込む関数
    const loadNews = async () => {
        try {
            // news_data.jsonを非同期でフェッチ
            const response = await fetch('news_data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newsData = await response.json();

            // データを基にHTMLを生成
            newsListElement.innerHTML = ''; // "読み込み中"メッセージをクリア

            newsData.forEach(item => {
                const article = document.createElement('article');
                // isImportantがtrueなら、importantクラスを追加
                article.className = `news-article ${item.isImportant ? 'important' : ''}`;
                article.id = item.id; // ページ内リンク用にIDを設定

                // 記事のHTML構造
                article.innerHTML = `
                    <span class="news-category">【${item.category}】</span>
                    <h2>${item.title}</h2>
                    <span class="news-date">公開日: ${item.date}</span>
                    <div class="news-content">
                        <p>${item.content}</p>
                    </div>
                    <hr>
                `;
                newsListElement.appendChild(article);
            });

        } catch (error) {
            console.error("Failed to load news data:", error);
            newsListElement.innerHTML = `<p style="color:red; text-align:center;">
                お知らせデータの読み込みに失敗しました。時間をおいて再度お試しください。
            </p>`;
        }
    };

    loadNews();
});
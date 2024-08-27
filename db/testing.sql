\c nc_news_test

SELECT articles.article_id,
    articles.title,
    articles.topic,
    articles.author,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT(comments.article_id) AS comment_count FROM articles
LEFT JOIN
    comments
USING (article_id) WHERE articles.votes >= 0 GROUP BY articles.article_id ORDER BY articles.created_at DESC;
document.addEventListener('DOMContentLoaded', function() {
    let page = 1;
    let isLoading = false;
    loadMorePosts();
    window.addEventListener('scroll', function() { 
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            if (!isLoading) {
                loadMorePosts();
            }
        }
    });
        
    function loadMorePosts() {
        isLoading = true;
        document.getElementById('loading-indicator').style.display = 'block';
        setTimeout(function() {
            const feedContainer = document.getElementById('feed-container');
            for (let i = 0; i < 5; i++) {
                const postId = (page - 1) * 5 + i + 1;
                const postData = {
                    id: postId,
                    title: `Post #${postId} - trending`,
                    subreddit: getRandomSubreddit(),
                    author: `user${Math.floor(Math.random() * 1000)}`,
                    timePosted: `${Math.floor(Math.random() * 12) + 1} hours ago`,
                    upvotes: Math.floor(Math.random() * 10000),
                    comments: Math.floor(Math.random() * 500),
                    imageUrl: Math.random() < 0.9
                        ? `https://picsum.photos/600/400?random=${postId}` 
                        : null
                };
                const postElement = createPost(postData);
                feedContainer.appendChild(postElement);
            }
            page++;
            isLoading = false;
        }, 1000);
    }
    function createPost(postData) {
        const post = document.createElement('div');
        post.className = 'post';
        const imageHtml = postData.imageUrl 
            ? `<img src="${postData.imageUrl}" alt="Post afbeelding" class="post-image">` 
            : '';
        
        post.innerHTML = `
                <div class="post-metadata">
                    <span>r/${postData.subreddit}</span>
                    <span>Posted by u/${postData.author} • ${postData.timePosted}</span>
                </div>
            </div>
            <h3 class="post-title">${postData.title}</h3>
            <div class="post-content">
                <p> #${postData.id}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                ${imageHtml}
            </div>
            <div class="post-meta">
                <span>👍 ${postData.upvotes} upvotes</span>
                <span>💬 ${postData.comments} comments</span>
            </div>
        `;
        
        return post;
    }
    function getRandomSubreddit() {
        const subreddits = ['funny', 'news', 'gaming', 'pics', 'science', 'askreddit', 'mediacollege'];
        return subreddits[Math.floor(Math.random() * subreddits.length)];
    }
});

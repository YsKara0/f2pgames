document.addEventListener('DOMContentLoaded', () => {
    const gameAPI = new GameAPI();
    const gamesContainer = document.querySelector('.games-container');
    const loadingElement = document.querySelector('.loading');
    const platformFilter = document.getElementById('platformFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    
    let allGames = [];
    
    // Initialize the app
    init();
    
    async function init() {
        // Try with fetch first
        try {
            allGames = await gameAPI.fetchGames();
            setupApp();
        } catch (error) {
            console.log('Fetch failed, trying JSONP:', error);
            
            // Fallback to JSONP if fetch fails (CORS issues)
            gameAPI.fetchGamesWithJsonp((data) => {
                allGames = data;
                setupApp();
            });
        }
    }
    
    function setupApp() {
        if (allGames.length === 0) {
            loadingElement.textContent = 'Failed to load games. Please try again later.';
            return;
        }
        
        loadingElement.style.display = 'none';
        populateFilters();
        renderGames(allGames);
        
        // Set up event listeners for filters
        platformFilter.addEventListener('change', filterGames);
        categoryFilter.addEventListener('change', filterGames);
    }
    
    function populateFilters() {
        // Extract unique genres/categories
        const genres = [...new Set(allGames.map(game => game.genre))];
        
        // Populate category filter
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            categoryFilter.appendChild(option);
        });
    }
    
    function filterGames() {
        const platform = platformFilter.value;
        const category = categoryFilter.value;
        
        let filteredGames = [...allGames];
        
        if (platform !== 'all') {
            filteredGames = filteredGames.filter(game => game.platform.includes(platform));
        }
        
        if (category !== 'all') {
            filteredGames = filteredGames.filter(game => game.genre === category);
        }
        
        renderGames(filteredGames);
    }
    
    function renderGames(games) {
        gamesContainer.innerHTML = '';
        
        if (games.length === 0) {
            gamesContainer.innerHTML = '<p class="no-games">No games match your filters</p>';
            return;
        }
        
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            
            gameCard.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}" class="game-image">
                <div class="game-details">
                    <h3 class="game-title">${game.title}</h3>
                    <p class="game-description">${game.short_description}</p>
                    <div class="game-meta">
                        <span class="game-platform">${game.platform}</span>
                        <span class="game-genre">${game.genre}</span>
                    </div>
                </div>
            `;
            
            gameCard.addEventListener('click', () => {
                window.open(game.game_url, '_blank');
            });
            
            gamesContainer.appendChild(gameCard);
        });
    }
});
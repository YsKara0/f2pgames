class GameAPI {
    constructor() {
        this.apiUrl = 'https://www.freetogame.com/api/games';
    }

    async fetchGames() {
        // Try multiple methods to fetch the games data
        const methods = [
            this.directFetch.bind(this),
            this.fetchWithCorsAnywhere.bind(this),
            this.fetchWithAllOrigins.bind(this),
            this.fetchWithJsonp.bind(this),
            this.fetchWithApiSample.bind(this)
        ];

        for (const method of methods) {
            try {
                const games = await method();
                if (games && games.length > 0) {
                    console.log(`Success with method: ${method.name}`);
                    return games;
                }
            } catch (error) {
                console.log(`Method failed: ${error.message}`);
                // Continue to next method
            }
        }

        // If all methods fail, return an empty array
        console.error('All API fetch methods failed');
        return [];
    }

    // Method 1: Try direct fetch (might work with a local server)
    async directFetch() {
        try {
            const response = await fetch(this.apiUrl, { mode: 'cors' });
            if (!response.ok) throw new Error(`Direct API fetch failed: ${response.status}`);
            return await response.json();
        } catch (error) {
            throw new Error(`Direct fetch error: ${error.message}`);
        }
    }

    // Method 2: Try with cors-anywhere proxy
    async fetchWithCorsAnywhere() {
        try {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const response = await fetch(proxyUrl + this.apiUrl);
            if (!response.ok) throw new Error(`CORS Anywhere fetch failed: ${response.status}`);
            return await response.json();
        } catch (error) {
            throw new Error(`CORS Anywhere error: ${error.message}`);
        }
    }

    // Method 3: Try with allorigins.win as CORS proxy
    async fetchWithAllOrigins() {
        try {
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const response = await fetch(proxyUrl + encodeURIComponent(this.apiUrl));
            if (!response.ok) throw new Error(`AllOrigins fetch failed: ${response.status}`);
            return await response.json();
        } catch (error) {
            throw new Error(`AllOrigins error: ${error.message}`);
        }
    }

    // Method 4: Try with JSONP (for older APIs that support it)
    async fetchWithJsonp() {
        return new Promise((resolve, reject) => {
            try {
                const callbackName = 'jsonpCallback_' + Math.round(Math.random() * 1000000);
                window[callbackName] = function(data) {
                    delete window[callbackName];
                    document.body.removeChild(script);
                    resolve(data);
                };

                const script = document.createElement('script');
                script.src = `${this.apiUrl}?callback=${callbackName}`;
                script.onerror = () => {
                    delete window[callbackName];
                    document.body.removeChild(script);
                    reject(new Error('JSONP request failed'));
                };
                document.body.appendChild(script);
                
                // Set timeout for JSONP
                setTimeout(() => {
                    if (window[callbackName]) {
                        delete window[callbackName];
                        document.body.removeChild(script);
                        reject(new Error('JSONP request timed out'));
                    }
                }, 10000);
            } catch (error) {
                reject(new Error(`JSONP error: ${error.message}`));
            }
        });
    }

    // Method 5: Use a sample response for demonstration
    async fetchWithApiSample() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("Using sample data fallback");
        // Return the sample games
        return this.getSampleGames();
    }

    // Sample data in case all API methods fail
    getSampleGames() {
        return [
            {
                "id": 1,
                "title": "Dauntless",
                "thumbnail": "https://www.freetogame.com/g/1/thumbnail.jpg",
                "short_description": "A free-to-play, co-op action RPG with gameplay similar to Monster Hunter.",
                "game_url": "https://www.freetogame.com/open/dauntless",
                "genre": "MMORPG",
                "platform": "PC (Windows)",
                "publisher": "Phoenix Labs",
                "developer": "Phoenix Labs",
                "release_date": "2019-05-21"
            },
            {
                "id": 2,
                "title": "World of Tanks",
                "thumbnail": "https://www.freetogame.com/g/2/thumbnail.jpg",
                "short_description": "A team-based free-to-play MMO action game dedicated to armored warfare.",
                "game_url": "https://www.freetogame.com/open/world-of-tanks",
                "genre": "Shooter",
                "platform": "PC (Windows)",
                "publisher": "Wargaming",
                "developer": "Wargaming",
                "release_date": "2011-04-12"
            },
            {
                "id": 3,
                "title": "Warframe",
                "thumbnail": "https://www.freetogame.com/g/3/thumbnail.jpg",
                "short_description": "A cooperative free-to-play third person online action shooter set in an evolving sci-fi world.",
                "game_url": "https://www.freetogame.com/open/warframe",
                "genre": "Shooter",
                "platform": "PC (Windows)",
                "publisher": "Digital Extremes",
                "developer": "Digital Extremes",
                "release_date": "2013-03-25"
            },
            {
                "id": 4,
                "title": "CRSED: F.O.A.D.",
                "thumbnail": "https://www.freetogame.com/g/4/thumbnail.jpg",
                "short_description": "Take the battle royale genre and add superpowers and you have CRSED: F.O.A.D. (Aka Cuisine Royale: Second Edition)",
                "game_url": "https://www.freetogame.com/open/crsed",
                "genre": "Shooter",
                "platform": "PC (Windows)",
                "publisher": "Gaijin Entertainment",
                "developer": "Darkflow Software",
                "release_date": "2019-12-12"
            },
            {
                "id": 5,
                "title": "Crossout",
                "thumbnail": "https://www.freetogame.com/g/5/thumbnail.jpg",
                "short_description": "A post-apocalyptic MMO vehicle combat game! ",
                "game_url": "https://www.freetogame.com/open/crossout",
                "genre": "Shooter",
                "platform": "PC (Windows)",
                "publisher": "Targem",
                "developer": "Gaijin",
                "release_date": "2017-05-30"
            },
            {
                "id": 6,
                "title": "Apex Legends",
                "thumbnail": "https://www.freetogame.com/g/23/thumbnail.jpg",
                "short_description": "A free-to-play battle royale game where legendary characters battle for glory and fortune!",
                "game_url": "https://www.freetogame.com/open/apex-legends",
                "genre": "Shooter",
                "platform": "PC (Windows)",
                "publisher": "Electronic Arts",
                "developer": "Respawn Entertainment",
                "release_date": "2019-02-04"
            },
            {
                "id": 7,
                "title": "Fortnite",
                "thumbnail": "https://www.freetogame.com/g/57/thumbnail.jpg",
                "short_description": "A free-to-play battle royale game with building mechanics and fast-paced combat.",
                "game_url": "https://www.freetogame.com/open/fortnite",
                "genre": "Shooter",
                "platform": "PC (Windows)",
                "publisher": "Epic Games",
                "developer": "Epic Games",
                "release_date": "2017-07-25"
            },
            {
                "id": 8,
                "title": "Guild Wars 2",
                "thumbnail": "https://www.freetogame.com/g/11/thumbnail.jpg",
                "short_description": "A free-to-play MMORPG with dynamic events and customizable combat.",
                "game_url": "https://www.freetogame.com/open/guild-wars-2",
                "genre": "MMORPG",
                "platform": "PC (Windows)",
                "publisher": "ArenaNet",
                "developer": "ArenaNet",
                "release_date": "2012-08-28"
            }
        ];
    }
}
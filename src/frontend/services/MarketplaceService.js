
class MarketplaceService 
{
    marketplace;

    constructor(marketplace) {
        this.marketplace = marketplace;
    }

    async getItems(nft) {
        // Load all unsold items
        const itemCount = await this.marketplace.itemCount();
        let items = [];
        for (let i = 1; i <= itemCount; i++) {
            const item = await this.marketplace.items(i);
            if (!item.sold) {
                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenId);
                // use uri to fetch the nft metadata stored on ipfs 
                const response = await fetch(uri);
                const metadata = await response.json();
                // get total price of item (item price + fee)
                const totalPrice = await this.marketplace.getTotalPrice(item.itemId);
                // Add item to items array
                items.push({
                    totalPrice,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                });
            }
        }

        return items;
    }

    async getPurchases(nft, account) {
        // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
        const filter = this.marketplace.filters.Bought(null, null, null, null, null, account);
        const marketplaceResults = await this.marketplace.queryFilter(filter);

        // Fetch metadata of each nft and add that to listedItem object.
        const results = marketplaceResults.map(async i => {
            // fetch arguments from each result
            i = i.args;
            // get uri url from nft contract
            const uri = await nft.tokenURI(i.tokenId);
            // use uri to fetch the nft metadata stored on ipfs 
            const response = await fetch(uri);
            const metadata = await response.json();
            // get total price of item (item price + fee)
            const totalPrice = await this.marketplace.getTotalPrice(i.itemId);
            // define listed item object
            let purchasedItem = {
                totalPrice,
                price: i.price,
                itemId: i.itemId,
                name: metadata.name,
                description: metadata.description,
                image: metadata.image
            };
            return purchasedItem;
        });
        
        return await Promise.all(results);
    }
}

export default MarketplaceService;

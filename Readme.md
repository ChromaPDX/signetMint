# SignetMint

Our current strategy (AIUI), aka "MongoCoin", is to move money into Chromas bank account from a bank api, store that balance as a number in the mongo DB, and then move that money out to another bank souce via api. This puts Chroma at liability. I want to propose an alternative approach which I call "SignetMint". SignetMint is a (proposed) service which handles the settlement of funds between users. Each user is given a multi-coin wallet and NFTs are moved from one user to another to represent transferal of ownership. Chroma mints new Signets, creating new NFTs to represent new product, as well as exchanging old NFTs into new NFTs. We use NFTs to represent both product AND rewards.

- user wallets are compatible with ChromaSignets as well as 1 or more cryptocurrencies.
- Both Product and Rewards are represented as NFTs.
- Users claim ownership by transfering the NFT which represents some product. 
- "Rewards" programs are trading bots which buy back their own NFTs
- The SignetMint can trade 1 NFT into many new NFTs

### how this relates to the Rewards Feature

When a customer claims ownership, the NFT is tranferred to their wallet. They can now exchange this NFT with a Rewards program bot by making a trade of said NFT for BTC.  

### how this relates to "track and trace"

When a businss owner creates a product, the NFT is minted and traded to their wallet. They either sell or trade these NFTs with other business owners as the product moves through the production pipeline. If product needs to be subdivided, the signet mint will trade them 1 Signet for many.
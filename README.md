# Rell NFT marketplace

## Video how app working:
https://www.dropbox.com/s/szgvnhf4a6ds3pd/rellDemo.mov?dl=0

## How to start
1. Install npm packages via yarn/npm
2. Use `.rell` code from "rell/src/main.rell" with Rell node
3. Connect Client to node using params in "src/constants" NODE_CONNECTION.URL and NODE_CONNECTION.RID
4. "yarn start" to start client app

## Functionality
### User
1. User registration
2. User name must be unique
3. User has coins balance
4. User able to register other users with a fixed fee and share some coins with them if the balance OK
5. Users are able to buy tokens if the balance is OK
6. Token price will transfer to the owner's balance
6. User able to login/logout

### Tokens
1. Create a token with a fixed fee
2. See a list of your own tokens
3. See list market of tokens (exclude own tokens)
4. Token should have a unique name and src (image)
5. Tokens can be bought

## Known issues
1. User balance and tokens list not updating after operation without page reload
2. Some components should be created like Tabs
3. Make sense to add 1 more layer to work with SessionStorage and use facade instead of realization
4. Error handling
5. Toasts that tx was successful

I'm staying that issues with respect to deadlines (it's 22 hr apprx)
Rell looks really laconic and powerful but without excess. I get 4-6 hours for docs and videos.
Everything is clear enough and predictable.
About env - I install Eclipse with Rell extension without any complexities.
I tried to run local Node but did not find instructions about .xml config and decided to not sit with the local set-up long time and use the web version that was started without any settings

P.S. When I leave Web IDE for night - Chrome tab going down in a morning

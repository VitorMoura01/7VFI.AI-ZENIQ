import { gql } from "@apollo/client";

const uniswapService = {
  getQuery: (addresses: string[]) => {

    console.log(addresses)
    const query = gql`
      {
        token(id: "0x5b52bfb8062ce664d74bbcd4cd6dc7df53fd7233") {
          name
          whitelistPools(orderBy: liquidity, orderDirection: desc) {
            id
            token0 {
              id
              symbol
              decimals
              txCount
              volume
              totalSupply
              tokenDayData(orderBy: date, orderDirection: desc, first: 1) {
                low
                high
                open
                close
                date
              }
            }
            token1 {
              id
              symbol
              decimals
              txCount
              volume
              totalSupply
              tokenDayData(orderBy: date, orderDirection: desc, first: 1) {
                low
                high
                open
                close
                date
              }
            }
            liquidity
            feeTier
            token0Price
            token1Price
            sqrtPrice
            liquidity
            totalValueLockedToken0
            totalValueLockedToken1
          }
        }
      }
    `;

    return query
  },
};

export default uniswapService;

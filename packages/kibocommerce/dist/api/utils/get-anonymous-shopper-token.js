import { getAnonymousShopperTokenQuery } from '../queries/get-anonymous-shopper-token-query';
async function getAnonymousShopperToken({ config  }) {
    const { data  } = await config.fetch(getAnonymousShopperTokenQuery);
    return data === null || data === void 0 ? void 0 : data.getAnonymousShopperToken;
}
export default getAnonymousShopperToken;

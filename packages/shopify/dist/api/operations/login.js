import { customerAccessTokenCreateMutation, setCustomerToken, throwUserErrors } from '../../utils';
export default function loginOperation({ commerce  }) {
    async function login({ query =customerAccessTokenCreateMutation , variables , config  }) {
        config = commerce.getConfig(config);
        const { data: { customerAccessTokenCreate  } ,  } = await config.fetch(query, {
            variables
        });
        throwUserErrors(customerAccessTokenCreate === null || customerAccessTokenCreate === void 0 ? void 0 : customerAccessTokenCreate.customerUserErrors);
        const customerAccessToken = customerAccessTokenCreate === null || customerAccessTokenCreate === void 0 ? void 0 : customerAccessTokenCreate.customerAccessToken;
        const accessToken = customerAccessToken === null || customerAccessToken === void 0 ? void 0 : customerAccessToken.accessToken;
        if (accessToken) {
            setCustomerToken(accessToken);
        }
        return {
            result: customerAccessToken === null || customerAccessToken === void 0 ? void 0 : customerAccessToken.accessToken
        };
    }
    return login;
};

import { useMemo } from 'react';
import useCart from '@vercel/commerce/cart/use-cart';
export default useCart;
export const handler = {
    fetchOptions: {
        method: 'GET',
        url: '/api/cart'
    },
    async fetcher ({ options , fetch  }) {
        return await fetch({
            ...options
        });
    },
    useHook: ({ useData  })=>{
        return (input)=>{
            const response = useData({
                swrOptions: {
                    revalidateOnFocus: false,
                    ...input === null || input === void 0 ? void 0 : input.swrOptions
                }
            });
            return useMemo(()=>{
                return Object.create(response, {
                    isEmpty: {
                        get () {
                            var ref;
                            return (((ref = response.data) === null || ref === void 0 ? void 0 : ref.lineItems.length) ?? 0) <= 0;
                        },
                        enumerable: true
                    }
                });
            }, [
                response
            ]);
        };
    }
};

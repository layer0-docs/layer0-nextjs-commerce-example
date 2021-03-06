import { useMemo } from 'react';
import useWishlist from '@vercel/commerce/wishlist/use-wishlist';
import useCustomer from '../customer/use-customer';
export default useWishlist;
export const handler = {
    fetchOptions: {
        url: '/api/wishlist',
        method: 'GET'
    },
    fetcher ({ input: { customerId , includeProducts  } , options , fetch  }) {
        if (!customerId) return null;
        // Use a dummy base as we only care about the relative path
        const url = new URL(options.url, 'http://a');
        if (includeProducts) url.searchParams.set('products', '1');
        if (customerId) url.searchParams.set('customerId', customerId);
        return fetch({
            url: url.pathname + url.search,
            method: options.method
        });
    },
    useHook: ({ useData  })=>{
        return (input)=>{
            const { data: customer  } = useCustomer();
            const response = useData({
                input: [
                    [
                        'customerId',
                        customer === null || customer === void 0 ? void 0 : customer.id
                    ],
                    [
                        'includeProducts',
                        input === null || input === void 0 ? void 0 : input.includeProducts
                    ], 
                ],
                swrOptions: {
                    revalidateOnFocus: false,
                    ...input === null || input === void 0 ? void 0 : input.swrOptions
                }
            });
            return useMemo(()=>{
                return Object.create(response, {
                    isEmpty: {
                        get () {
                            var ref, ref1;
                            return (((ref = response.data) === null || ref === void 0 ? void 0 : (ref1 = ref.items) === null || ref1 === void 0 ? void 0 : ref1.length) || 0) <= 0;
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

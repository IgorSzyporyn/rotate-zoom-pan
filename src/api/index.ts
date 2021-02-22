export const URL = 'http://content.cylindo.com/api/v2'

type GetProductImageUrlProps = {
    customerId: string;
    productId: string;
    frame: number
}

export const getProductImageUrl = ({customerId, productId, frame}: GetProductImageUrlProps) => {
    const url = `${URL}/${customerId}/products/${productId}/frames/${frame}`

    return url
}
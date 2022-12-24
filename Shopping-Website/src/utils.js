export const getItemCount = (cartItems) => {
    return cartItems.reduce((count, cartItem) => cartItem.quantity + count, 0)
}

export const getSubTotal = (cartItem) => {
    return cartItem.reduce((sum, {product, quantity}) => product.price * quantity + sum, 0);
}
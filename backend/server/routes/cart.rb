App.route('api/cart') do |r|
    @user = DB[:users].where(token: @token).first
    raise "Invalid Login Token.." unless @user

    r.on Integer do |id|
        cart_item = UserCart[id]
        raise "Invalid Cart item" unless cart_item

        r.put do
            subtotal, total, overall_discount = cart_item.update_cart @data
            {
                count: cart_item.count || 0,
                overall_discount: overall_discount ? overall_discount.discount : 0,
                price_range: overall_discount ? overall_discount.price_range : 0,
                subtotal_price: subtotal,  
                overall_total: total,  
                success: true
            }
        end

        r.delete do
            count = cart_item.count

            #*Delete cart item
            total, overall_discount = cart_item.delete_cart_item
            {   
                count: count,
                overall_discount: overall_discount ? overall_discount.discount : 0,
                price_range: overall_discount ? overall_discount.price_range : 0,
                overall_total: total,
                success: true
            }
        end
    end

    r.post do
        UserCart.add_to_cart @data, @user 
        {
            success: true
        }
    end

    r.get do
        ret, count, overall_total, overall_discount = UserCart.get_all_cart_details @user
        {
            values: ret,
            overall_total: overall_total,
            overall_discount: overall_discount ? overall_discount.discount : 0,
            price_range: overall_discount ? overall_discount.price_range : 0,
            cart_count: count,
            success: true
        }
    end
end
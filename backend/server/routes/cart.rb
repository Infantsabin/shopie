App.route('api/cart') do |r|
    @user = DB[:users].where(token: @token).first
    puts "=== #{__LINE__} --- #{__FILE__} ==="
    p @token
    raise "Invalid Login Token.." unless @user

    r.on Integer do |id|
        cart_item = UserCart[id]
        raise "Invalid Cart item" unless cart_item

        r.put do
            cart_item.update_cart @data
            {
                count: cart_item.count || 0,
                success: true
            }
        end

        r.delete do
            count = cart_item.count

            #*Delete cart item
            cart_item.delete
            {   
                count: count,
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
        ret, count = UserCart.get_all_cart_details @user
        {
            values: ret,
            cart_count: count,
            success: true
        }
    end
end
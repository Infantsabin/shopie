App.route('api/cart') do |r|
    @user = DB[:users].where(token: @token).first
    raise "Invalid Login Token.." unless @user

    r.post do
        UserCart.add_to_cart @data, @user 
        {
            success: true
        }
    end

    r.get do
        # ret = Product.get_all_products

        {
            # values: ret,
            success: true
        }
    end
end
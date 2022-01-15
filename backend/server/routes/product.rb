App.route('api/product') do |r|
    # user = DB[:users].where(token: @token).first
    # raise "Invalid Login Token.." unless user
    r.get do
        ret = Product.get_all_products

        {
            values: ret,
            success: true
        }
    end
end
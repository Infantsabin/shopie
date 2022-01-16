App.route('api/product') do |r|
    r.get do
        ret = Product.get_all_products

        {
            values: ret,
            success: true
        }
    end
end
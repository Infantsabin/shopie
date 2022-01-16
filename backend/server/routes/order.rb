App.route('api/order') do |r|
     @user = DB[:users].where(token: @token).first
    raise "Invalid Login Token.." unless @user

    r.on Integer do |id|
        order = Order[id]
        raise "Invalid Order" unless order

        r.put do
            order.update(total_price: @data[:total], status: 'c') 
            {
                success: true
            }
        end
    end
end
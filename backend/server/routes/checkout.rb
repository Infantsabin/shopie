App.route('api/check-out') do |r|
    @user = DB[:users].where(token: @token).first
    raise "Invalid Login Token.." unless @user

    r.on Integer do |id|
        order = Order[id]
        raise "Invalid Order" unless order

        r.put do 
            #order status update into shipping
            order.update(status: 's')

            #clear cart
            UserCart.where(order_id: order[:id]).delete

            {
                 success: true
            }
        end

        r.post 'shipping-address' do
            @data[:order_id] = order[:id]
            @data.delete(:token)
            ret = ShippingAddress.create_shipping_address @data

            {
                values: ret,
                success: true
            }
        end

        r.post 'payment-detail' do
            @data[:order_id] = order[:id]
            @data.delete(:token)
            ret = PaymentDetail.create_payment_detail @data

            {
                values: ret,
                success: true
            }
        end

        r.get do
            ret = order.get_order_details

            {
                values: ret,
                success: true
            }
        end
    end
end
# frozen_string_literal: true
class UserCart < Sequel::Model
    plugin :paranoid
	
	def self.add_to_cart data, cur_user
        order = Order.where(user_id: cur_user[:id], status: 'p').first
        order = Order.create(user_id: cur_user[:id]) unless order

        exist_product = UserCart.where(order_id: order[:id], product_id: data[:product_id]).first
        unless exist_product
            UserCart.create(
                user_id: cur_user[:id],
                product_id: data[:product_id],
                order_id: order[:id]
            )
        else
            exist_product.update(count: exist_product[:count] + 1)
        end
	end
end
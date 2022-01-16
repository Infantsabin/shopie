# frozen_string_literal: true
class UserCart < Sequel::Model
    plugin :paranoid

    many_to_one		:product,
                    :key	=> :product_id,
                    :class	=> :Product

    many_to_one		:user,
                    :key	=> :user_id,
                    :class	=> :User
	
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

    def update_cart data
        self.update(count: self.count + data[:count].to_i) unless self.count == 0
	end

    def self.get_all_cart_details cur_user
        ds = self.not_deleted.where(user_id: cur_user[:id])

        result = ds.collect do |cart_item|
            {
                id: cart_item.id,
                product_id: cart_item.product_id,
                order_id: cart_item.order_id,
                count: cart_item.count,
                name: cart_item.product.name,
                price: cart_item.product.price,
                discount: cart_item.product.discount,
                code: cart_item.product.code,
                image_url: cart_item.product.image_url,
                user_name: cart_item.user.name,
                created_at: cart_item.created_at,
                updated_at: cart_item.updated_at,
            }
        end
        cart_count = ds.sum(:count) || 0
        return result, cart_count
	end
end
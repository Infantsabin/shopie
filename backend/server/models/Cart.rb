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

        subtotal = self.count.to_f * (self.product.price.to_f - (self.product.price.to_f * self.product.discount.to_f/100)).to_f
        
        total = UserCart.where(user_id: self.user_id).eager_graph(:product).map {|h| (h[:count].to_f * (h[:price].to_f - (h[:price].to_f * h[:discount].to_f/100))).to_f}.sum

        overall_discount = OverallDiscount.where{price_range <= total}.order(:price_range).last

        return subtotal.ceil(2), total.ceil(2), overall_discount
	end

    def delete_cart_item
        user_id = self.user_id
        self.delete

        total = UserCart.where(user_id: user_id).eager_graph(:product).map {|h| (h[:count].to_f * (h[:price].to_f - (h[:price].to_f * h[:discount].to_f/100))).to_f}.sum

        overall_discount = OverallDiscount.where{price_range <= total}.order(:price_range).last

        return total.ceil(2), overall_discount
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
                discount_price: (cart_item.product.price.to_f - (cart_item.product.price.to_f * cart_item.product.discount.to_f/100)).to_f,
                subtotal_price: cart_item.count.to_f * (cart_item.product.price.to_f - (cart_item.product.price.to_f * cart_item.product.discount.to_f/100)).to_f,
                updated_at: cart_item.updated_at,
            }
        end

        cart_count = ds.sum(:count) || 0
        overall_total = result.sum {|h| h[:subtotal_price] }.to_f || 0
        overall_discount = OverallDiscount.where{price_range <= overall_total}.order(:price_range).last

        return result, cart_count, overall_total.ceil(2), overall_discount
	end
end
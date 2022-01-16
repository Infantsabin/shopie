# frozen_string_literal: true
class ShippingAddress < Sequel::Model
    plugin :paranoid
    
	def self.create_shipping_address data
        exist_shipping_address = self.where(order_id: data[:order_id]).first
        
        unless exist_shipping_address
            exist_shipping_address = self.create(data)
        else
            exist_shipping_address.update(
                first_name: data[:first_name],
                last_name: data[:last_name],
                address_lin1: data[:address_lin1],
                address_lin2: data[:address_lin2],
                city: data[:city],
                state: data[:state],
                post_code: data[:post_code],
                country: data[:country]
            )
        end
        return exist_shipping_address.values
	end
end
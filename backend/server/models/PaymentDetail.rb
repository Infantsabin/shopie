# frozen_string_literal: true
class PaymentDetail < Sequel::Model
    plugin :paranoid

	def self.create_payment_detail data
        exist_payment_detail = self.where(order_id: data[:order_id]).first
        
        unless exist_payment_detail
            exist_payment_detail = self.create(data)
        else
            exist_payment_detail.update(
                card_name: data[:card_name],
                card_number: data[:card_number],
                expiry_date: data[:expiry_date],
                cvv: data[:cvv]
            )
        end
        return exist_payment_detail.values
	end
end
# frozen_string_literal: true
class Order < Sequel::Model
    plugin :paranoid

    many_to_one  :user,
                  :key	=> :user_id,
                  :class	=> :User         

    one_to_one  :shipping_address,
                  :key	=> :order_id,
                  :class	=> :ShippingAddress         

    one_to_one  :payment_detail,
                  :key	=> :order_id,
                  :class	=> :PaymentDetail         
                  
    def get_order_details
        {
            id: self.id,
            payment_detail: {
                card_name: self.payment_detail.card_name, 
                card_number: self.payment_detail.card_number, 
                expiry_date: self.payment_detail.expiry_date, 
                cvv: self.payment_detail.cvv, 
            },
            shipping_address: {
                name: self.shipping_address.first_name, 
                city: self.shipping_address.city, 
                state: self.shipping_address.state, 
                post_code: self.shipping_address.post_code, 
                country: self.shipping_address.country, 
            }
        }
    end
end
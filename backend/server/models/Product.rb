# frozen_string_literal: true
class Product < Sequel::Model
    plugin :paranoid
	def validate
		super
		validates_unique(:name, :message=>'already exists'){ |ds| ds.where(:deleted_at => nil) }
	end

	def self.create_product data
		Product.create(data)
	end

	def self.get_all_products
        ds = self.not_deleted.collect do |product|
            {
                id: product.id,
                name: product.name,
                price: product.price,
                discount: product.discount,
                code: product.code,
                image_url: product.image_url,
                created_at: product.created_at,
                updated_at: product.updated_at,
            }
        end
        return ds
	end
end
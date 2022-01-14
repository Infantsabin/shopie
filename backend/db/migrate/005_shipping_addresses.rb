Sequel.migration do
	change do
		create_table(:shipping_addresses) do
			primary_key :id
            foreign_key :order_id,       :orders, :key => :id, :on_delete	=> :cascade
			String   :first_name,        null: false
			String   :last_name,         null: false
			String   :address_lin1,      null: false
			String   :address_lin2,      default: nil
			String   :city,              null: false
			String   :state,             null: false
			String   :post_code,         null: false
			String   :country,           null: false
			String   :price,	         null: false
			String   :code,              null: false, unique: true
			DateTime :created_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :updated_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :deleted_at,        default: nil
		end
	end
end
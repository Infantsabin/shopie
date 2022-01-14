Sequel.migration do
	change do
		create_table(:payment_details) do
			primary_key :id
            foreign_key :order_id,       :orders, :key => :id, :on_delete	=> :cascade
			String   :card_name,         null: false
			String   :card_number,       null: false
			String   :expiry_date,       null: false
			String   :cvv,               null: false
			DateTime :created_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :updated_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :deleted_at,        default: nil
		end
	end
end
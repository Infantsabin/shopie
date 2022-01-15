Sequel.migration do
	change do
		create_table(:overall_discounts) do
			primary_key :id
            foreign_key :order_id,       :orders, :key => :id, :on_delete	=> :cascade
			String   :price_range,       null: false, unique: true
			String   :discount,      	 default: nil
			DateTime :created_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :updated_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :deleted_at,        default: nil
		end
	end
end
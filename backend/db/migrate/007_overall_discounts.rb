Sequel.migration do
	change do
		create_table(:overall_discounts) do
			primary_key :id
			Integer  :price_range,       null: false, unique: true
			String   :discount,      	 default: nil
			DateTime :created_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :updated_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :deleted_at,        default: nil
		end
	end
end
Sequel.migration do
	change do
		create_table(:products) do
			primary_key :id
			String   :name,              null: false, unique: true
			String   :price,	         null: false
			String   :discount,	         default: nil
			String   :code,              null: false, unique: true
			String   :image_url,         null: false
			DateTime :created_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :updated_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :deleted_at,        default: nil
		end
	end
end
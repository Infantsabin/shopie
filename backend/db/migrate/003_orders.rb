Sequel.migration do
	change do
		create_table(:orders) do
			primary_key :id
            foreign_key :user_id,        :users, :key => :id, :on_delete	=> :cascade
			String   :total_price,	     default: nil
            String   :status,	         default: 'p'
			DateTime :created_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :updated_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :deleted_at,        default: nil
		end
	end
end
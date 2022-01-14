Sequel.migration do
	change do
		create_table(:user_carts) do
			primary_key :id
            foreign_key :user_id,        :users, :key => :id, :on_delete	=> :cascade
            foreign_key :product_id,     :products, :key => :id, :on_delete	=> :cascade
            foreign_key :order_id,     :orders, :key => :id, :on_delete	=> :cascade
			Integer  :count,	         default: 0
			DateTime :created_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :updated_at,        default: Sequel::CURRENT_TIMESTAMP
			DateTime :deleted_at,        default: nil
		end
	end
end
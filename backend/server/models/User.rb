# frozen_string_literal: true

class User < Sequel::Model
	plugin :secure_password

	def validate
		super
		validates_unique(:email, :message=>'already exists'){ |ds| ds.where(:deleted_at => nil) }
	end

	def self.first_fifty
		self.where{ id < 51 }
	end

	def self.first_user
		user = self.first
		{
			name: user.name,
			email: user.email
		}
	end
end
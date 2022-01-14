# frozen_string_literal: true
require_relative '../helper/basic_helper'

class User < Sequel::Model
	plugin :secure_password

	def validate
		super
		validates_unique(:email, :message=>'already exists'){ |ds| ds.where(:deleted_at => nil) }
	end

	def self.verify data
		user = User.where(email: data[:email]).first
		raise "Invalid User" unless user

		decrypted_password = Helper.decrypt_password(user.password_digest)
		raise "Incorrect Password" unless decrypted_password == data[:password_digest]

		login_token = Helper.secure_token
		user.update(token: login_token)

		return user.values
	end

	def self.create_user data
		data[:password_digest] = Helper.secure_password data[:password_digest]
		User.create(data)
	end

	def self.details login_token
		raise "Invalid Login token..." unless login_token

		user = self.where(token: login_token).first
		raise "User Logged in another device.." unless user
		{
			name: user.first_name + " " + user.last_name,
			email: user.email
		}
	end

	def self.first_user data
		user = self.first
		{
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email
		}
	end
end
# frozen_string_literal: true
require_relative '../server/system/boot'

Faker::Config.random = nil


password_digest = BCrypt::Password.create('password')

DB[:users].insert({first_name: 'Test',last_name: 'Test',email: 'test@email.com',password_digest: password_digest, token: Faker::Alphanumeric.alphanumeric(number: 10, min_alpha: 3)})

# users_arr = []
# users_arr.push(
# 	name: Faker::Name.name,
# 	email: Faker::Internet.email,
# 	password_digest: password_digest
# )

# DB[:users].multi_insert(users_arr)


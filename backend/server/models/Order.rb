# frozen_string_literal: true
class Order < Sequel::Model
    plugin :paranoid

    many_to_one  :user,
                  :key	=> :user_id,
                  :class	=> :User
end
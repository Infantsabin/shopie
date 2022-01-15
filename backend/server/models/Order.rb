# frozen_string_literal: true
class Order < Sequel::Model
    plugin :paranoid
end
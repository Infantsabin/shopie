# frozen_string_literal: true
require_relative '../server/system/boot'

Faker::Config.random = nil

@password_digest = BCrypt::Password.create('password')

#User Seed
def users_seed
    users_arr =[{
        first_name: 'Test', 
        last_name: 'User', 
        role:'c',
        email: 'test@email.com',
        password_digest: @password_digest, 
        token: Faker::Alphanumeric.alphanumeric(number: 10, min_alpha: 3)
        },
        {
            first_name: 'Admin', 
            last_name: 'User', 
            role:'a',
            email: 'admin@email.com',
            password_digest: @password_digest, 
            token: Faker::Alphanumeric.alphanumeric(number: 10, min_alpha: 3)
        }]

    DB[:users].multi_insert(users_arr)
end

#Products seed
def products_seed
    products_arr = []
    5.times do |i|
        product_name = Faker::Name.name  
        products_arr.push(
            name: product_name,
            price: rand(1..1000),
            discount: rand(1..30),
            code: product_name.downcase.split(' ').join('_') + '_'+ rand(1..1000).to_s,
            image_url: 'https://www.dcode.fr/tools/image-randomness/images/random-dcode.png'
        )
    end
    DB[:products].multi_insert(products_arr)
end

#Products seed
def overall_discount_seed
    discount_arr = [{
        price_range: 200,
        discount: '10'
    },{
        price_range: 500,
        discount: '50'
    },{
        price_range: 1000,
        discount: '120'
    },{
        price_range: 1500,
        discount: '180'
    },{
        price_range: 2000,
        discount: '250'
    }
    ]
    
    DB[:overall_discounts].multi_insert(discount_arr)
end



#seeds call
users_seed
products_seed
overall_discount_seed

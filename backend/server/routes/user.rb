App.route('api/auth') do |r|
    r.on 'user' do
        r.post 'create' do
            User.create_user @data

            {
                success: true
            }
        end

        r.post 'verify' do
           ret =  User.verify @data

            {
                values: ret,
                success: true
            }
        end

        r.get do
            ret = User.details @token

            {
                values: ret,
                success: true
            }
        end
    end
end
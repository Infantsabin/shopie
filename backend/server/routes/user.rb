App.route('api') do |r|
    r.on 'user' do
        r.on Integer do |id|
            r.get do
                p User.where(password_digest: @data[:password_digest]).first
            end
        end
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
            ret = User.first_user @data

            {
                values: ret,
                success: true
            }
        end
    end
end
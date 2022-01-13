# frozen_string_literal: true
App.route('api') do |r|

	r.root do
		"this is from route <code>/api</code>. <br> Try <a href='/api/user'>/api/user</a>"
	end

	r.on 'user' do
		r.get do
			ret = User.first_user

			{
				values: ret,
				success: true
			}
		end
	end

end
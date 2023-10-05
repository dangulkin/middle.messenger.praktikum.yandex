export const tmpl = `
		<div class='sidebar'>
			{{{goBack}}}
		</div>
		<div class='profile-wrapper'>
			<div class='profile-data'>
				<div class='profile-header'>
					<div class='user-photo'>
						<div class='user-photo-hover'>
							Выберите<br>файл
							<input type='file' name='avatar' hidden/>
						</div>
					</div>
					<p class='user-name'>Ivan</p>
				</div>
				<div class='user-data'>
					{{{email}}}
					{{{login}}}
					{{{firstName}}}
					{{{lastName}}}
					{{{displayName}}}
					{{{phone}}}
				</div>
				<div class='password-settings'>
					{{{oldPassword}}}
					{{{newPassword}}}
					{{{repeatNewPassword}}}
				</div>
				<div class='profile-settings'>
					<div class='change-data'>{{{manageAccountLink}}}</div>
					<div class='change-password'>{{{changePasswordLink}}}</div>
					<div class='logout'>{{{logoutLink}}}</div>
				</div>
			</div>
		</div>
`
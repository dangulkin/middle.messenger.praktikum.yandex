export const tmpl = `
		<div class='sidebar'>
			{{{goBack}}}
		</div>
		<div class='profile-wrapper'>
			<div class='profile-data'>
				<div class='profile-header'>
					<div class='userpic'>
						{{{avatar}}}
						<div class='userpic-hover'>
							{{{changeAvatar}}}
						</div>
					</div>
					<p class='user-name'>{{first_name}}</p>
				</div>
				<form class='form'>
					<div class='user-data'>
						{{{email}}}
						{{{login}}}
						{{{firstName}}}
						{{{secondName}}}
						{{{displayName}}}
						{{{phone}}}
					</div>
				</form>
				<div class='profile-settings'>
					<div class='change-data'>{{{settingsLink}}}</div>
					<div class='change-password'>{{{changePasswordLink}}}</div>
					<div class='logout'>{{{logoutLink}}}</div>
				</div>
			</div>
		</div>
`

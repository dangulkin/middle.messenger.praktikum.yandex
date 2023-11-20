export const tmpl = `
		<div class='sidebar'>
			{{{goBack}}}
		</div>
		<div class='profile-wrapper'>
			<div class='profile-data'>
				<div class='profile-header'>
					<div class='userpic'>
						{{{avatar}}}
					</div>
				</div>
				<form class='form'>
					<div class='user-data'>
						{{{currentPassword}}}
						{{{newPassword}}}
						{{{repeatNewPassword}}}
					</div>
					{{{saveButton}}}
				</form>
			</div>
		</div>
`

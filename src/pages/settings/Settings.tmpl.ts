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
					{{{saveButton}}}
				</form>
			</div>
		</div>
`

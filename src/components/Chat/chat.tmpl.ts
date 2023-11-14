import './chat.css';
export default `
	<div class='chat-header'>
		
		<div class='user-profile'>

			<div class='profile-image'>
				{{{avatar}}}
			</div>

			<h3 class='chat-name'>
				{{title}}
			</h3>

		</div>

		{{{ menu }}}

	</div>

	{{{ feed }}}
`

import './chat.css';
import { RESOURCES } from '../../utils/Transport/constants';
export default `
	<div class='chat-header'>
		
		<div class='user-profile'>

			<div class='profile-image'>
			{{#if chat.avatar}}<img src='${RESOURCES}{{chat.avatar}}'/>{{/if}}
			</div>

			<h3 class='chat-name'>
				{{chat.title}}
			</h3>

		</div>

		{{{ menu }}}
		{{{ tooltip }}}
	</div>

	{{{ feed }}}
`

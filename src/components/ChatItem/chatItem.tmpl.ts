import "./chatItem.css";
import { RESOURCES } from "../../utils/Transport/constants";
export default `
	<div class='profile-image'>
		{{#if avatar}}<img src='${RESOURCES}{{avatar}}'/>{{/if}}
	</div>
	<div class='chat-details'>
			<h3>{{title}}</h3>
			<p>{{last_message.content}}</p>
	</div>
	<div class='message-info'>
			<p>{{ time }}</p>
			{{#if unread_count}}
				<div class='unread-count'><p>{{ unread_count }}</p></div>
			{{/if}}
	</div>
`;

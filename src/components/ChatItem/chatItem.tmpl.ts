import './chatItem.css';
export default `
	<div class='profile-image'>
	</div>
	<div class='chat-details'>
			<h3>{{title}}</h3>
			<p>{{last_message.content}}</p>
	</div>
	<div class='message-info'>
			<p>{{ time }}</p>
			<div class='unread-count'><p>{{ unread_count }}</p></div>
	</div>
`

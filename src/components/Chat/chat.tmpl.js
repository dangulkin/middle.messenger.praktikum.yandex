import './chat.css';
export default `
<div class='chat'>
	<div class='profile-image'>
	</div>
	<div class='chat-details'>
			<h3>{{chatname}}</h3>
			<p>{{text}}</p>
	</div>
	<div class='message-info'>
			<p>10:30 AM</p>
			<div class='unread-count'><p>{{unread}}</p></div>
	</div>
</div>
`

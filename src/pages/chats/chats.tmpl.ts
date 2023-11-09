export default `
<div class='chatlist'>
	{{{profileLink}}}
	<div class='chats-search-bar'>
		{{{search}}}
	</div>

<!-- Chat list items -->
		{{{chatlist}}}
<!-- End of chat list items -->
</div> 

<div class='chat-window'>
<!-- Message window content -->
	<div class='chat-header'>
		
		<div class='user-profile'>
			<div class='profile-image'></div>
			<h3 class='chat-name'>Вадим</h3>
		</div>

		<button class='chat-menu'></button>

	</div>

	{{{ feed }}}
	
	<div class='message-input-block'>
			
		<div class='message-attach-media'></div>
				<div class='message-input-bar'>
						{{{messageInput}}}
				</div>
				{{{ sendButton }}}
		</div>
	</div>
</div>
`

export default `
<div class='chatlist'>
	{{{profileLink}}}
	<div class='chatlist-header'>
		{{{search}}}
		{{{createChat}}}
	</div>
		{{{chatlist}}}
</div> 

<div class='chat-window'>
	{{{ chat }}}	
	<div class='message-input-block'>
		<div class='message-attach-media'></div>
				<div class='message-input-bar'>
						{{{messageInput}}}
				</div>
				{{{ sendButton }}}
		</div>
	</div>
</div>

{{{ popup }}}
`

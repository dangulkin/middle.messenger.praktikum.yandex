export default `
<div class='chat-window-wrapper'>
<div class='chatlist'>
	{{{profileLink}}}
	<div class='chats-search-bar'>
		<input type='text' name='chat-search' value='Search'></input>
	</div>

<!-- Chat list items -->
	{{#each chats}}
		{{> chat }}
	{{/each}}
<!-- End of chat list items -->
</div> 

<div class='chat-window'>
<!-- Message window content -->
		<div class='chat-header'>
			<div class='user-profile'>
				<div class='profile-image'>
				</div>
				<h3 class='chat-name'>Вадим</h3>
			</div>
				<button class='chat-menu'></button>
		</div>
	<div class='messages-container'>
		<div class='chat-date'><p>19 июня</p></div>
		<div class='message'>
				<div class='message-text'>
						<p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
						<br><br>
						Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>
						<div class='message-time'>
							<p>10:32 AM</p>
						</div>
				</div>
		</div>
		<div class='message byme'>
			<div class='message-text'>
					<p>Круто!</p>
					<div class='message-status'></div>
					<div class='message-time'>
						<p>10:32 AM</p>
					</div>
			</div>
		</div>
	</div>
	<div class='message--input-block'>
			<div class='message--attach-media'></div>
			<div class='message--input-bar'>
					<input type='text' name='message' value='Message'>
			</div>
			<div class='message--send-button'></div>
		</div>
</div>
</div>
`

export default `<a {{#if to}} href='{{to}}'{{/if}}
									{{#if class}}class={{class}}{{/if}}
								>
								{{text}}
								{{#if icon}}<img class='icon'/>{{/if}}
								</a>`;

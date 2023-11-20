export default `
<button {{#if class}} class={{ class }} {{/if}}>
{{#if icon}}
	<div class='icon'></div>
{{/if}}
{{label}}
</button>
`

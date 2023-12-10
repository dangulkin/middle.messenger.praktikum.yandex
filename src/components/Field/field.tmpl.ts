export default `
	{{label.text}}
	{{{input}}}
	{{#if error}}
		<small class='error'>{{error}}</small>
	{{/if}}
`

import Handlebars from 'handlebars';
import link from '../../components/Link/link.tmpl.js';

export const Link = (props) => {
	return Handlebars.compile(link)(props)
}

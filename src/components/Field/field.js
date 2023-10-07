import Handlebars from 'handlebars';
import fld from '../../components/Field/field.tmpl';

export const Field = (props) => {
	return Handlebars.compile(fld)(props)
}

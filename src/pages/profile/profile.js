import './profile.css';
import Handlebars from 'handlebars';
import {tmpl} from './profile.tmpl';
import { Field } from '../../components/Field/field';
import {Link} from '../../components/Link/link';

export const Profile = () => {
	return Handlebars.compile(tmpl)({
		goBack: Link({
			to: '/',
			text: ''
		}),
		email: Field({
			labelName: 'email',
			labelContent: 'Email',
			inputName: 'email',
			inputType: 'email',
			inputValue: 'random@email.com',
			autocomplete: 'email',
			inputStatus: 'disabled'
									}),
		login: Field({
			labelName: 'login',
			labelContent: 'Login',
			inputType: 'text',
			inputName: 'login',
			inputValue: 'ivanivanov',
			autocomplete: 'username',
			inputStatus: 'disabled'
									}),
		firstName: Field({
			labelName: 'first_name',
			labelContent: 'First name',
			inputType: 'text',
			inputName: 'first_name',
			inputValue: 'Ivan',
			autocomplete: 'given-name',
			inputStatus: 'disabled'
									}),						
		secondName: Field({
			labelName: 'second_name',
			labelContent: 'Last name',
			inputType: 'text',
			inputName: 'second_name',
			inputValue: 'Ivanov',
			autocomplete: 'family-name',
			inputStatus: 'disabled'
									}),						
		displayName: Field({
			labelName: 'display_name',
			labelContent: 'Display name',
			inputType: 'text',
			inputName: 'display_name',
			inputValue: 'Vanya',
			autocomplete: 'nickname',
			inputStatus: 'disabled'
									}),						
		phone: Field({
			labelName: 'phone',
			labelContent: 'Phone number',
			inputType: 'tel',
			inputName: 'phone',
			inputValue: '71234567890',
			autocomplete: 'tel',
			inputStatus: 'disabled'
									}),
		oldPassword: Field({
			labelName: 'old_password',
			labelContent: 'Old password',
			inputType: 'password',
			inputName: 'old_password',
			inputValue: 'random_pass',
			autocomplete: 'current-password',
			inputStatus: 'disabled'
									}),						
		newPassword: Field({
			labelName: 'new_password',
			labelContent: 'New password',
			inputType: 'password',
			inputName: 'new_password',
			inputValue: 'random_pass',
			autocomplete: 'new-password',
			inputStatus: 'disabled'
									}),						
		repeatNewPassword: Field({
			labelName: 'repeat_password',
			labelContent: 'Repeat new password',
			inputType: 'password',
			inputName: 'repeat_password',
			inputValue: 'random_pass',
			autocomplete: 'new-password',
			inputStatus: 'disabled'
									}),						
		manageAccountLink: Link({
			to: 'page404',
			text: 'Manage details'
									}),						
		changePasswordLink: Link({
			to: 'page500',
			text: 'Change password'
									}),						
		logoutLink: Link({
			to: '/',
			text: 'Log out'
									})						
	});
}

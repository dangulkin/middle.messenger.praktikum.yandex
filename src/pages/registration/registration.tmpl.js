export const tmpl = `
<div class='registration'>
	<form>
			<div class='inputs-container'>
			<h2>Sign Up</h2>
						<label class='input-group'>E-mail
							<input type='text' name='email' value='username@yandex.ru' required>
						</label>
						<label class='input-group'>Login
							<input type='text' name='login' value='Login' required>
						</label>
						<label class='input-group'>First name
							<input type='text' name='first_name' value='Dan' required>
						</label>
						<label class='input-group'>Second name
							<input type='text' name='second_name' value='Gulkin' required>
						</label>
						<label class='input-group'>Phone
							<input type='text' name='phone' value='+7 123 456 78 90' required>
						</label>
						<label class='input-group>Password
							<input type='password' name='password' value='Password' required>
						</label>
						<label class='input-group'>Repeat password
							<input type='password' name='password_repeat' value='Password' required>
							<p>Passwords don’t match</p>
						</label>				
			</div>
			<div class='button-container'>
				<!-- <button type='submit' class='btn-signup'>Sign Up</button> -->
				{{{signUpLink}}}
				{{{loginLink}}}
			</div>
	</form>
</div
`

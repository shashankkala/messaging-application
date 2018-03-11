# messaging-application

<a href="#guide">Click here</a> to know how to set up and run the application on your system.

<h2>About the application</h2>
This is a messaging application and it has the below list of features :

<h3>Home Page</h3>
The home page has 2 options. A user can either <b>signup</b> or a returning user can <b>login</b> into the application to access the user
specific dashboard.

<h3>Signup Page</h3>
The signup page is a simple form consisting of 3 fields : username, password and confirm password.
If the <b>password and confirm password fields do not match</b> then a toast message will be shown to the user accordingly.
If a user tries to create a new user with the <b>username which is already present</b> in the database then the signup will not go through
and an appropriate error message will be shown.
<br><br>
If the above validations are passed then a <b>new user will be registered in the database</b> and the password will be stored in the
database as a hash which means that the <b>password will be encrypted</b>. The user will get the message that the registration was
successful and will be redirected to the home page.

<h3>Login Page</h3>
The login page is a form that has 2 fields : Username and Password.
When the form is submitted, then first of all the username will be validated against the existing users in the database. If the entered 
<b>username does not exist</b> in the db then error message will be thrown. If the entered username actually exists, then the password
will be validated by decrypting the password stored in the db and checking the value against the entered password. If the <b>password
does not match</b> then error message will be shown.

If the password entered was correct, then the <b>user will be redirected to the dashboard.</b>

<h3>Dashboard Page</h3>
The dashboard of a user consists of a fixed navigation bar at the top with options to signout or to jump to dashboard. On the left side
of the page will be options to view the <b>inbox</b>, <b>sent items</b> and to <b>compose</b> a new message.
<br><br>
<b>The inbox will be shown by default</b> on the dashboard page. The inbox page shows the messages received by the user with the 
timestamp and gives the option to search the inbox.

<h3>Compose Page</h3>
This page has a form that has 2 fields : Recipient Username and Message content.
When a user starts typing the recipient username, <b>it will give suggestions to autocomplete if the database has a user starting with
the string entered.</b> For <b>example</b> : If the database has a username 'admin', then upon entering 'a' in the recipient field, the
suggestion of admin will be shown.
<br>
Upon submitting the form, if the value entered in the recipient field is <b>not an existing user</b>, then an error will be thrown.
If the above validations are met, then a message will be sent to the user which was entered in the recipient field.

<h3>Inbox Page</h3>
This page is same as the dashboard.

<h3>Sent Page</h3>
On this page all the messages sent by the user will be shown with the timestamp. An option of searching the sent messages is also
provided.
<br><br>

<h2 id="guide">Setup guide</h2>
<h3>Pre-requisites</h3>
<ul>
  <li>You need to have <b>Node.js</b> and <b>MongoDB</b> installed in your local system. If you already don't have them in your system,
    then you can go to the following links : 
    <ul>
      <li><a href="https://www.mongodb.com/">MongoDB website</a></li>
      <li><a href="https://nodejs.org/en/">MongoDB website</a></li>
    </ul>
  </li>
  <li>You should have a database named <b>mailer</b> in your mongoDB database. This is beacuse in my server.js, I am connecting to the 
    database mailer.
  </li>
  <li>You should have the following collections in the database mailer : <b>users</b> and <b>messages</b>. You can refer the 
    <b>db_setup.txt</b> file for creating above collections.
  </li>
</ul>

<h3>Steps for running the application in your local system</h3>
<ul>
  <li>Clone the repository in your local system.</li>
  <li>Open cmd and navigate to the project folder.</li>
  <li>Run the following command in cmd to install the required node modules : <b>npm install</b></li>
  <li>Before running the node server you have to make sure that your mongoDB sercvice is running. Having trouble in starting mongoDB? 
    <a href="https://www.youtube.com/watch?v=pWbMrx5rVBE">Refer this</a>
  </li>
  <li>Now run the following command in cmd to start your server : <b>node server.js</b></li>
  <li>Server will start running at Port 3030.</li>
  <li>Open your web browser and go to the following url : <b>localhost:3030</b></li>
  <li>Now you can explore the application.
</ul>

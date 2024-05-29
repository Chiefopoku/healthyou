from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Emma'  # Set your secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///healthyou.db'  # Correct format for SQLite URI

db = SQLAlchemy(app)

# Define User and Reminder models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    birthday = db.Column(db.String(150), nullable=False)
    sex = db.Column(db.String(50), nullable=False)

class Reminder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(150), nullable=False)
    interval = db.Column(db.String(150), nullable=False)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/account')
def account_page():
    return render_template('account.html')

@app.route('/features')
def features_page():
    return render_template('features.html')

@app.route('/about')
def about_page():
    return render_template('about.html')

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    birthday = data.get('birthday')
    sex = data.get('sex')

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': 'User already exists'}), 400

    # Save the user
    hashed_password = generate_password_hash(password)
    user = User(name=name, email=email, password=hashed_password, birthday=birthday, sex=sex)
    db.session.add(user)
    db.session.commit()
    return jsonify({'success': True, 'user': user}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the user
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        return jsonify({'success': True, 'user': user}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

@app.route('/api/reminders', methods=['GET', 'POST'])
def handle_reminders():
    if request.method == 'POST':
        data = request.get_json()
        reminder = Reminder(type=data.get('type'), interval=data.get('interval'))
        db.session.add(reminder)
        db.session.commit()
        return jsonify({'success': True, 'reminder': reminder}), 201

    elif request.method == 'GET':
        reminders = Reminder.query.all()
        return jsonify({'success': True, 'reminders': [r.as_dict() for r in reminders]}), 200

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login_page'))

# Add a method to the Reminder model to convert it to a dictionary
def reminder_as_dict(self):
    return {c.name: getattr(self, c.name) for c in self.__table__.columns}

Reminder.as_dict = reminder_as_dict

if __name__ == '__main__':
    db.create_all()  # Create database tables
    app.run(debug=True)

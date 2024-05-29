from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Emma'
app.config['SQLALCHEMY_DATABASE_URI'] = '/healthyou.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    birthday = db.Column(db.String(50))
    sex = db.Column(db.String(10))

class Reminder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False)
    interval = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

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
    new_user = User(name=name, email=email, password=hashed_password, birthday=birthday, sex=sex)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'success': True, 'user': {'name': new_user.name, 'email': new_user.email}}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        session['user_id'] = user.id
        return jsonify({'success': True, 'user': {'name': user.name, 'email': user.email}}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

@app.route('/api/reminders', methods=['GET', 'POST'])
def handle_reminders():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401

    if request.method == 'POST':
        data = request.get_json()
        reminder_type = data.get('type')
        interval = data.get('interval')

        new_reminder = Reminder(type=reminder_type, interval=interval, user_id=user_id)
        db.session.add(new_reminder)
        db.session.commit()
        return jsonify({'success': True, 'reminder': {'type': new_reminder.type, 'interval': new_reminder.interval}}), 201

    elif request.method == 'GET':
        reminders = Reminder.query.filter_by(user_id=user_id).all()
        return jsonify({'success': True, 'reminders': [{'type': r.type, 'interval': r.interval} for r in reminders]}), 200

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('login_page'))

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

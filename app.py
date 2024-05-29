from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# In-memory storage for demo purposes
users = []
reminders = []

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
    if any(user['email'] == email for user in users):
        return jsonify({'success': False, 'message': 'User already exists'}), 400

    # Save the user
    user = {
        'name': name,
        'email': email,
        'password': password,  # Note: Store hashed passwords in a real app
        'birthday': birthday,
        'sex': sex
    }
    users.append(user)
    return jsonify({'success': True, 'user': user}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the user
    user = next((user for user in users if user['email'] == email and user['password'] == password), None)
    if user:
        return jsonify({'success': True, 'user': user}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

@app.route('/api/reminders', methods=['GET', 'POST'])
def reminders():
    if request.method == 'POST':
        data = request.get_json()
        reminder = {
            'type': data.get('type'),
            'interval': data.get('interval')
        }
        reminders.append(reminder)
        return jsonify({'success': True, 'reminder': reminder}), 201

    elif request.method == 'GET':
        return jsonify({'success': True, 'reminders': reminders}), 200

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/api/reminders', methods=['GET', 'POST'])
def reminders():
    if request.method == 'POST':
        data = request.get_json()
        reminder = {
            'type': data.get('type'),
            'interval': data.get('interval')
        }
        reminders.append(reminder)
        return jsonify({'success': True, 'reminder': reminder}), 201

    elif request.method == 'GET':
        return jsonify({'success': True, 'reminders': reminders}), 200

from flask import Flask, render_template, redirect, url_for, request
import os

app = Flask(__name__)

# Security headers for HTTPS
@app.after_request
def set_security_headers(response):
    # Force HTTPS on Heroku
    if request.headers.get('X-Forwarded-Proto') == 'http':
        url = request.url.replace('http://', 'https://', 1)
        return redirect(url, code=301)
    
    # Security headers
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    return response

# Define the page order for navigation
PAGES = [
    {'id': 'home', 'name': 'Home', 'route': '/', 'abbr': 'HOME'},
    {'id': 'problem', 'name': "What's the Problem", 'route': '/problem', 'abbr': 'PROBLEM'},
    {'id': 'timeline', 'name': 'Timeline & Where', 'route': '/timeline', 'abbr': 'TIMELINE'},
    {'id': 'affected', 'name': 'Who Does It Affect', 'route': '/affected', 'abbr': 'AFFECTED'},
    {'id': 'reactors', 'name': 'Reactor Types', 'route': '/reactors', 'abbr': 'REACTORS'},
    {'id': 'solution', 'name': 'Solution & What You Can Do', 'route': '/solution', 'abbr': 'SOLUTION'},
    {'id': 'author', 'name': 'Author Info', 'route': '/author', 'abbr': 'AUTHOR'},
    {'id': 'works-cited', 'name': 'Works Cited', 'route': '/works-cited', 'abbr': 'SOURCES'}
]

def get_navigation_context(current_page_id):
    """Get navigation context for the current page"""
    current_index = next((i for i, p in enumerate(PAGES) if p['id'] == current_page_id), 0)
    prev_page = PAGES[current_index - 1] if current_index > 0 else None
    next_page = PAGES[current_index + 1] if current_index < len(PAGES) - 1 else None
    
    return {
        'pages': PAGES,
        'current_page': PAGES[current_index],
        'prev_page': prev_page,
        'next_page': next_page,
        'page_number': current_index + 1,
        'total_pages': len(PAGES)
    }

@app.route('/')
def home():
    context = get_navigation_context('home')
    return render_template('home.html', **context)

@app.route('/problem')
def problem():
    context = get_navigation_context('problem')
    return render_template('problem.html', **context)

@app.route('/timeline')
def timeline():
    context = get_navigation_context('timeline')
    return render_template('timeline.html', **context)

@app.route('/affected')
def affected():
    context = get_navigation_context('affected')
    return render_template('affected.html', **context)

@app.route('/reactors')
def reactors():
    context = get_navigation_context('reactors')
    return render_template('reactors.html', **context)

@app.route('/solution')
def solution():
    context = get_navigation_context('solution')
    return render_template('solution.html', **context)

@app.route('/author')
def author():
    context = get_navigation_context('author')
    return render_template('author.html', **context)

@app.route('/works-cited')
def works_cited():
    context = get_navigation_context('works-cited')
    return render_template('works_cited.html', **context)

if __name__ == '__main__':
    # Use PORT from environment (Heroku) or default to 5067 for local development
    port = int(os.environ.get('PORT', 5067))
    # Debug mode off for production
    debug = os.environ.get('FLASK_ENV') != 'production'
    app.run(debug=debug, host='0.0.0.0', port=port)


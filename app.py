import os.path
import uuid
from mimetypes import MimeTypes

import mako
import ast
import autocompile

import flask
from flask import Flask, render_template, request, send_from_directory
from flask_socketio import SocketIO, join_room, leave_room

app = Flask(__name__)
app.secret_key = "somesecretkey"
socketio = SocketIO(app, manage_session=True, cookie='sid')


def get_uid():
    flask.session.permanent = True
    uid = flask.session["uid"] = flask.session.get("uid") or uuid.uuid4()
    return uid


def get_sid():
    return getattr(flask.request, 'sid', None)

@app.route("/static/<filename>")
def content(filename: str):
    if len(filename.split(".")[-1]) > 4:
        # i.e. not '.ts', '.js' or '.jpg'
        filename += ".js"
    r = send_from_directory("./templates/static/", filename,
                            max_age=0,
                            mimetype=MimeTypes().guess_type(filename)[0])
    return r


@app.route('/')
def hello_world():
    autocompile.recompile_typescripts()
    print('Sid, uid:', get_sid(), get_uid())
    return render_template('index.jinja2')


@app.route('/sample/<arg1>', methods=["POST"])
def sample(arg1: int):
    return {"qqqq": arg1, "req": flask.request.json}


@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json), get_sid(), get_uid())


@socketio.on('touch')
def handle_my_custom_event(*args, **kwargs):
    print('touch: ', args, kwargs, get_sid())


@socketio.event
def connect(*args, **kwargs):
    print('connect ', args, kwargs, get_sid())


@socketio.event
def disconnect(*args, **kwargs):
    print('disconnect ', args, kwargs, get_sid())


if __name__ == '__main__':
    socketio.run(
        app, "0.0.0.0", 9090,
        # allow_unsafe_werkzeug=True,
        debug=True, use_reloader=True
    )

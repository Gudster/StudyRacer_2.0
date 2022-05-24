from bottle import redirect, route, run, error, template, request, static_file, redirect
import psycopg2
from psycopg2 import Error
from random import choice
import json

userLoggedIn = False
signup = False
username = ""
logInName = ""

@route("/", method="POST")
def sign_up():

    global signup
    global userLoggedIn

    try:
        username = getattr(request.forms, "username")
        firstName = getattr(request.forms, "firstName")
        lastName = getattr(request.forms, "lastName")
        password = getattr(request.forms, "password")
        country = getattr(request.forms, "country")

        conn = psycopg2.connect(database = "am0986",
                                user = 'am0986',
                                password = 'j6uv3f3d',
                                host = 'pgserver.mau.se',
                                port = '5432')

        conn.autocommit = True
        cursor = conn.cursor()
        cursor.execute(f'''INSERT INTO user_info(username, f_name, l_name, p_word, country)
        VALUES ('{username}', '{firstName}', '{lastName}', '{password}', '{country}')''')

        conn.commit()

        print(f"\n{username}, {firstName}, {lastName}, {country} registrerad")

    except (Exception, Error) as error:
        print("\nRegistrering misslyckades")
        print("-"*30)
        print(error)
        print("-"*30)

    finally:
        if (conn):
            cursor.close()
            conn.close()
            userLoggedIn = True
            signup = True

            return template("index", userLoggedIn=userLoggedIn, signup=signup, username=username)

@route("/", method="POST")
def log_in():

    global userLoggedIn
    global username

    try:
        logInName = getattr(request.forms, "logInName")
        passwords = getattr(request.forms, "password2")

        conn = psycopg2.connect(database = "am0986",
                                user = 'am0986',
                                password = 'j6uv3f3d',
                                host = 'pgserver.mau.se',
                                port = '5432')

        cursor = conn.cursor()
        cursor.execute(f'''SELECT username FROM user_info WHERE username = '{logInName}' ''')
        usernameChecker = cursor.fetchone()[0]

        cursor1 = conn.cursor()
        cursor1.execute(f'''SELECT p_word FROM user_info WHERE p_word = '{passwords}' ''')
        passwordChecker = cursor1.fetchone()[0]

    except (Exception, Error) as error:
        print("Inloggning misslyckades")
        print("-"*30)
        print(error)
        print("-"*30)

    finally:
        if logInName == usernameChecker and passwords == passwordChecker:
            print("\nInloggad!")
            userLoggedIn = True

        else:
            userLoggedIn = False
            print("Felaktigt inlogg")

        if (conn):
            cursor.close()
            conn.close()

            return template("index", userLoggedIn=userLoggedIn, username=logInName)

@route("/")
def user_logged_in():

    global userLoggedIn

    if userLoggedIn == True:
        return template("index", userLoggedIn=True, signup=signup, username=username)

    else:
        return template ("index", userLoggedIn=False, signup=signup, username=username)

@route("/racepage/<text>/")
def race(text):

    if text == "beginner":
        myFile = open("article/beginner.json", "r")
        textToRace = myFile.read()
        TTR = json.loads(textToRace)
        myFile.close()

    elif text == "novice":
        myFile = open("articles/novice.json", "r")
        textToRace = myFile.read()
        TTR = json.loads(textToRace)
        myFile.close()

    elif text == "master":
        myFile = open("articles/master.json", "r")
        textToRace = myFile.read()
        TTR = json.loads(textToRace)
        myFile.close()

    else:    
        myFile = open(f"articles/{text}.json", "r")
        textToRace = myFile.read()
        TTR = json.loads(textToRace)
        myFile.close() 

    return template("racepage", textFile=TTR, userLoggedIn=userLoggedIn)

@route("/logout/")
def logout_html():

    global userLoggedIn
    userLoggedIn = False

    redirect("/")

@route("/profile/")
def user_profile():

    global username
    userLoggedIn = True 

    return template("profile", userLoggedIn=userLoggedIn, username=username)

@route("/racetext/save/", method="POST")
def save_racetext ():

    raceText = str(request.forms.get("userRaceText"))

    myFile=open("articles/usertext.json", "w")
    myFile.write(json.dumps(raceText))
    myFile.close()

    redirect("/racepage/usertext")

@route("/static/<filename>")
def static_files(filename):

    return static_file(filename, root="static")

@error()
def error(error):
    """
    Hanterar: Error 404 filen hittades inte.
    """

    return template("error")


run(host="127.0.0.1", port=8080, reloader=True, debug=True)

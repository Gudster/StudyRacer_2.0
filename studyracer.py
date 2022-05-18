import re
from bottle import redirect, route, run, error, template, request, static_file, redirect
import psycopg2
from psycopg2 import Error
from random import choice
import json


userLoggedIn = False
sign_up = False
userName = ""

@route("/", method="POST")
def sign_up():
    global sign_up
    global userLoggedIn
    global userName

    try:
        userName = getattr(request.forms, "userName")
        firstName = getattr(request.forms, "firstName")
        lastName = getattr(request.forms, "lastName")
        password = getattr(request.forms, "password")
        country = getattr(request.forms, "country")

        conn = psycopg2.connect(database="am0986",
                                user='am0986',
                                password='j6uv3f3d',
                                host='pgserver.mau.se',
                                port='5432')

        conn.autocommit = True
        cursor = conn.cursor()

        cursor.execute(f'''INSERT INTO user_info(username, f_name, l_name, p_word, country)
        VALUES ('{userName}', '{firstName}', '{lastName}', '{password}', '{country}')''')

        conn.commit()
        print(f"\n{userName}, {firstName}, {lastName}, {country} registrerad")
        

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
            sign_up = True
            return template("index", userLoggedIn=userLoggedIn, sign_up=sign_up, userName=userName)

@route("/login", method="GET, POST")
def log_in():
    global userName
    
    try:
        logInName = getattr(request.forms, "logInName")
        userPassword = getattr(request.forms, "password")
        #password2 = getattr(request.forms, "password2")

        conn = psycopg2.connect(database="am0986",
                                user='am0986',
                                password='j6uv3f3d',
                                host='pgserver.mau.se',
                                port='5432')

        
        cursor = conn.cursor()
        cursor.execute('''SELECT username, p_word FROM user_info WHERE username = %s AND p_word = %s ''', (logInName, userPassword))
        userNameChecker = cursor.fetchall()

       if userNameChecker == []:
            userLoggedIn = False
            return template
            print("\nInloggad!")
            global userLoggedIn
            userLoggedIn = True
        else:
            print("Felaktigt inlogg")
            userLoggedIn = False
            
    except (Exception, Error) as error:
        print("Inloggning misslyckades")
        print("-"*30)
        print(error)
        print("-"*30)

    finally:
        if (conn):
            cursor.close()
            conn.close()
            return template("index", userLoggedIn=userLoggedIn, userName=logInName)

@route("/")
def user_logged_in():
    global userLoggedIn

    if userLoggedIn == True: 
        return template("index", userLoggedIn=True, sign_up=sign_up, userName=userName)
    else:
        return template ("index", userLoggedIn=False, sign_up=sign_up, userName=userName)

@route("/racepage/<text>")
def race(text):

    if text == "beginner":
        my_file= open("article/beginner.json", "r")
        textToRace = my_file.read()
        TTR = json.loads(textToRace)
        my_file.close()
    
    elif text == "novice":
        my_file = open("articles/novice.json", "r")
        textToRace = my_file.read()
        TTR = json.loads(textToRace)
        my_file.close()
    
    elif text == "master":
        my_file = open("articles/master.json", "r")
        textToRace = my_file.read()
        TTR = json.loads(textToRace)
        my_file.close()
    
    else:    
        my_file = open(f"articles/{text}.json", "r")
        textToRace = my_file.read()
        TTR = json.loads(textToRace)
        my_file.close() 
        

    return template("racepage", textFile=TTR, userLoggedIn=userLoggedIn)

@route("/racepage2/")
def race2():
    
    return template("racepage2", userLoggedIn=userLoggedIn)

@route("/logout")
def logouthtml():
    global userLoggedIn

    userLoggedIn = False
    redirect("/")
    
@route("/profile")
def user_profile(): 
    global userName
    userLoggedIn = True 

    return template("profile", userLoggedIn=userLoggedIn, userName=userName)

''' @route("/racetext/")
def make_text_to_race ():
    
    return template("racetext") '''

@route("/racetext/save/", method="POST")
def save_racetext ():
    raceText = str(request.forms.get("userRaceText"))

    my_file=open("articles/usertext.json", "w")
    my_file.write(json.dumps(raceText))
    my_file.close()

    redirect("/racepage/usertext")

@route("/result/", method="POST", userLoggedIn=userLoggedIn)
def race_text_to_list():
    '''gör om texten till en lista och beräknar användarens resultat i accuracy%'''

    raceText = getattr(request.forms, "raceText")
    userInput = getattr(request.forms, "userRaceInput")
    raceTextAsList = raceText.split(" ")
    userInputAsList = userInput.split(" ")

    lastWord = raceTextAsList[-1]
    lastInput = userInputAsList[-1]


    matches = sum(a == b for a, b in zip(raceTextAsList, userInputAsList))
    lenRaceText=len(raceTextAsList)
    result = int(matches / lenRaceText * 100)

    print("antal rätt", matches)
    print("textens längd", lenRaceText)
    print("procent", result)

    
    print(lastWord, lastInput)

    return template("result", userResult=result, userMatches=matches, textLength=lenRaceText, userLoggedIn=userLoggedIn)

@error()
def error(error):
    """
    Hanterar: Error 404 filen hittades inte.
    """

    return template("error")

@route("/static/<filename>")
def static_files(filename):

    return static_file(filename, root="static")


run(host="127.0.0.1", port=8080, reloader=True, debug=True)

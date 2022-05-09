from bottle import redirect, route, run, error, template, request, static_file, redirect
import psycopg2
from psycopg2 import Error
from random import choice
import json

userLoggedIn = False
sign_up = False
userName = " "

@route("/", userLoggedIn=userLoggedIn)
def user_logged_in():

    return template("index", userLoggedIn=userLoggedIn)

@route("/racepage/<text>", userLoggedIn=userLoggedIn)
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

@route("/racepage2/", userLoggedin=userLoggedIn, sign_up=sign_up)
def race2():
    
    return template("racepage2", userLoggedIn=userLoggedIn)

@route("/", method="POST")
def sign_up():

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
        sign_up = True
        userLoggedIn = True

    except (Exception, Error) as error:
        print("\nRegistrering misslyckades")
        print("-"*30)
        print(error)
        print("-"*30)
            
    finally:
        if (conn):
            cursor.close()
            conn.close()

            return template("index", userLoggedIn=userLoggedIn, sign_up=sign_up)
'''
@route("/", method="POST")
def log_in():
    
    try:
        userName = getattr(request.forms, "userName")
        password = getattr(request.forms, "password")

        conn = psycopg2.connect(database="am0986",
                                user='am0986',
                                password='j6uv3f3d',
                                host='pgserver.mau.se',
                                port='5432')

        
        cursor = conn.cursor()
        cursor.execute(f''' '''SELECT name, password FROM admin WHERE username = '{userName}' and password = '{password}' ''''''
        userNameChecker = cursor.fetchone()[0]
        
        if userName == userNameChecker:
            print("\nInloggad!")
        else:
            print("Felaktigt inlogg")

        conn.commit()
            
    except (Exception, Error) as error:
        print("Inloggning misslyckades")
        print("-"*30)
        print(error)
        print("-"*30)

    finally:
        if (conn):
            cursor.close()
            conn.close()
            return template("index", userLoggedIn=True)'''



@route("/profile")
def user_profile(): 
    global userName 
    conn = psycopg2.connect(database="am0986",
                            user='am0986',
                            password='j6uv3f3d',
                            host='pgserver.mau.se',
                            port='5432')

    
    cursor = conn.cursor()
    cursor.execute(f'''SELECT spend_time, wpm, accuracy, race_date FROM race WHERE username = '{userName}' ''')

    return template("profile")

@route("/racetext/")
def make_text_to_race ():
    
    return template("racetext")

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
